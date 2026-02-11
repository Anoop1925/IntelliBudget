export type BudgetGranularity = "monthly" | "weekly";

export interface GenerateBudgetForecastRequestBody {
	months?: number;
	horizonMonths?: number;
	granularity?: BudgetGranularity;
	incomeOverride?: number;
	savingsTargetPercent?: number;
}

export interface BudgetCategoryRecommendation {
	name: string;
	recommendedAmount: number;
	min: number;
	max: number;
	confidence: number;
	reasoning?: string;
}

export interface BudgetForecastResponseData {
	horizonMonths: number;
	granularity: BudgetGranularity;
	totalBudgetPerPeriod: number;
	categories: BudgetCategoryRecommendation[];
	confidence: {
		overall: number;
		factors?: string[];
	};
	assumptions?: string[];
	risks?: string[];
}

export interface BudgetForecastResponse {
	success: boolean;
	data: BudgetForecastResponseData;
}


