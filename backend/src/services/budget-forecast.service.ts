import TransactionModel, { TransactionTypeEnum } from "../models/transaction.model";
import { genAI } from "../config/google-ai.config";
import { GenerateBudgetForecastRequestBody, BudgetForecastResponseData } from "../@types/budget-forecast.type";
import BudgetForecastModel from "../models/budget-forecast.model";

type MonthlyCategoryTotals = Record<string, Record<string, number>>; // YYYY-MM -> { category: total }

function formatYearMonth(date: Date): string {
	return date.toISOString().slice(0, 7);
}

function getMonthRange(months: number): { start: Date; end: Date } {
	const end = new Date();
	const start = new Date();
	start.setMonth(start.getMonth() - (months - 1));
	start.setDate(1);
	start.setHours(0, 0, 0, 0);
	return { start, end };
}

function computeMonthlyCategoryTotals(transactions: any[]): MonthlyCategoryTotals {
	const totals: MonthlyCategoryTotals = {};
	for (const t of transactions) {
		const ym = formatYearMonth(new Date(t.date));
		if (!totals[ym]) totals[ym] = {};
		totals[ym][t.category] = (totals[ym][t.category] || 0) + t.amount;
	}
	return totals;
}

function sum(values: number[]): number { return values.reduce((a, b) => a + b, 0); }

function estimateMonthlyIncome(transactions: any[], incomeOverride?: number): number {
	if (typeof incomeOverride === "number" && incomeOverride > 0) return incomeOverride;
	const incomeTx = transactions.filter((t) => t.type === TransactionTypeEnum.INCOME);
	if (incomeTx.length === 0) return 0;
	// average of the last 3 months income if possible
	const byMonth: Record<string, number> = {};
	for (const t of incomeTx) {
		const ym = formatYearMonth(new Date(t.date));
		byMonth[ym] = (byMonth[ym] || 0) + t.amount;
	}
	const months = Object.values(byMonth).sort((a, b) => b - a).slice(0, 3);
	return months.length ? Math.round(sum(months) / months.length) : 0;
}

export class BudgetForecastService {
	async generate(userId: string, body: GenerateBudgetForecastRequestBody): Promise<BudgetForecastResponseData> {
		const months = Math.min(Math.max(body.months || 12, 6), 12);
		const horizonMonths = Math.min(Math.max(body.horizonMonths || 3, 1), 6);
		const granularity = body.granularity || "monthly";
		const savingsTargetPercent = Math.max(Math.min(body.savingsTargetPercent ?? 0, 90), 0);

		const { start, end } = getMonthRange(months);
		const transactions = await TransactionModel.find({
			userId,
			date: { $gte: start, $lte: end },
			status: "COMPLETED",
		}).lean();

		const monthlyCategoryTotals = computeMonthlyCategoryTotals(transactions);
		const estimatedMonthlyIncome = estimateMonthlyIncome(transactions, body.incomeOverride);

		// Build compact structured context for the model
		const context = {
			months,
			horizonMonths,
			granularity,
			estimatedMonthlyIncome,
			savingsTargetPercent,
			monthlyCategoryTotals,
		};

		// Gemini call: require JSON output matching our schema
		const schema = {
			type: "object",
			properties: {
				horizonMonths: { type: "number" },
				granularity: { type: "string", enum: ["monthly", "weekly"] },
				totalBudgetPerPeriod: { type: "number" },
				categories: {
					type: "array",
					items: {
						type: "object",
						properties: {
							name: { type: "string" },
							recommendedAmount: { type: "number" },
							min: { type: "number" },
							max: { type: "number" },
							confidence: { type: "number" },
							reasoning: { type: "string" },
						},
						required: ["name", "recommendedAmount", "min", "max", "confidence"],
					},
				},
				confidence: {
					type: "object",
					properties: { overall: { type: "number" }, factors: { type: "array", items: { type: "string" } } },
					required: ["overall"],
				},
				assumptions: { type: "array", items: { type: "string" } },
				risks: { type: "array", items: { type: "string" } },
			},
			required: ["horizonMonths", "granularity", "totalBudgetPerPeriod", "categories", "confidence"],
			additionalProperties: false,
		};

		const prompt = [
			{
				role: "user",
				parts: [
					{
						text:
							"You are a budgeting assistant. Predict next months budget considering seasonality, recurring expenses, and income. Do not exceed net income minus savings target. Return valid JSON only matching the provided schema.",
					},
					{ text: `Context:${JSON.stringify(context)}` },
				],
			},
		];

		let resultJson: BudgetForecastResponseData | null = null;
		try {
			const result = await genAI.models.generateContent({
				model: 'gemini-2.5-flash',
				contents: prompt,
				// @ts-ignore: generationConfig typing varies by SDK version
				generationConfig: { responseMimeType: "application/json", responseSchema: schema },
			});
			if ((result as any).text) {
				resultJson = JSON.parse((result as any).text as string);
			}
		} catch (e) {
			// fall back to heuristic if AI fails
		}

		if (!resultJson) {
			// Simple heuristic: average last 3 months per category
			const monthsSorted = Object.keys(monthlyCategoryTotals).sort();
			const last3 = monthsSorted.slice(-3);
			const categorySums: Record<string, number[]> = {};
			for (const ym of last3) {
				const cats = monthlyCategoryTotals[ym] || {};
				for (const [cat, amt] of Object.entries(cats)) {
					if (!categorySums[cat]) categorySums[cat] = [];
					categorySums[cat].push(amt as number);
				}
			}
			const categories = Object.entries(categorySums).map(([name, arr]) => {
				const avg = Math.round(sum(arr) / arr.length);
				return { name, recommendedAmount: avg, min: Math.round(avg * 0.9), max: Math.round(avg * 1.1), confidence: 0.5 };
			});
			let total = sum(categories.map((c) => c.recommendedAmount));
			const incomeAfterSavings = Math.max(0, Math.round(estimatedMonthlyIncome * (1 - savingsTargetPercent / 100)));
			if (total > incomeAfterSavings && total > 0) {
				const scale = incomeAfterSavings / total;
				for (const c of categories) {
					c.recommendedAmount = Math.round(c.recommendedAmount * scale);
					c.min = Math.round(c.min * scale);
					c.max = Math.round(c.max * scale);
				}
				total = incomeAfterSavings;
			}
			resultJson = {
				horizonMonths,
				granularity,
				totalBudgetPerPeriod: total,
				categories,
				confidence: { overall: 0.55 },
				assumptions: ["Heuristic average used due to AI failure or insufficient data"],
				risks: ["Seasonality may not be fully captured"],
			};
		}

		// Persist for history/latest retrieval
		await BudgetForecastModel.create({
			userId,
			params: { months, horizonMonths, granularity, incomeOverride: body.incomeOverride, savingsTargetPercent },
			result: resultJson,
		});

		return resultJson;
	}
  async getLatest(userId: string) {
    const latest = await BudgetForecastModel.findOne({ userId }).sort({ generatedAt: -1 }).limit(1);
    return latest;
  }
  async getHistory(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [items, totalCount] = await Promise.all([
      BudgetForecastModel.find({ userId }).sort({ generatedAt: -1 }).skip(skip).limit(limit),
      BudgetForecastModel.countDocuments({ userId }),
    ]);
    return { items, pagination: { page, limit, totalCount, totalPages: Math.ceil(totalCount / limit), skip } };
  }
}

export default new BudgetForecastService();


