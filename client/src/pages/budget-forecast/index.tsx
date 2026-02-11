import React, { useState } from "react";
import PageLayout from "@/components/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useGenerateBudgetForecastMutation, useGetLatestBudgetForecastQuery } from "@/features/budget-forecast/budgetForecastAPI";
import { BudgetForecastResponseData } from "@/features/budget-forecast/types";

const BudgetForecastPage = () => {
	const [months, setMonths] = useState(12);
	const [horizonMonths, setHorizonMonths] = useState(3);
	const [granularity, setGranularity] = useState<"monthly" | "weekly">("monthly");
	const [savingsTargetPercent, setSavingsTargetPercent] = useState<string>("");
	const [forecast, setForecast] = useState<BudgetForecastResponseData | null>(null);
	const [generateForecast, { isLoading }] = useGenerateBudgetForecastMutation();
	const { data: latestResponse, refetch } = useGetLatestBudgetForecastQuery();

	const onGenerate = async () => {
		const body: any = {
			months,
			horizonMonths,
			granularity,
		};
		if (savingsTargetPercent) body.savingsTargetPercent = Number(savingsTargetPercent);
		const res: any = await generateForecast(body).unwrap();
		setForecast(res.data);
		refetch();
	};

	React.useEffect(() => {
		if (latestResponse?.data?.result) {
			setForecast(latestResponse.data.result as BudgetForecastResponseData);
		}
	}, [latestResponse]);

	return (
		<PageLayout title="Budget Forecast" subtitle="AI-powered forecast and category recommendations">
			<Card className="mb-6">
				<CardHeader>
					<CardTitle>Parameters</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-5 gap-4">
					<div>
						<label className="text-sm text-gray-600">History Months</label>
						<Input type="number" value={months} min={6} max={12} onChange={(e) => setMonths(Number(e.target.value))} />
					</div>
					<div>
						<label className="text-sm text-gray-600">Horizon Months</label>
						<Input type="number" value={horizonMonths} min={1} max={6} onChange={(e) => setHorizonMonths(Number(e.target.value))} />
					</div>
					<div>
						<label className="text-sm text-gray-600">Granularity</label>
						<Select value={granularity} onValueChange={(v) => setGranularity(v as any)}>
							<SelectTrigger>
								<SelectValue placeholder="Select granularity" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="monthly">Monthly</SelectItem>
								<SelectItem value="weekly">Weekly</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div>
						<label className="text-sm text-gray-600">Savings Target % (optional)</label>
						<Input type="number" value={savingsTargetPercent} onChange={(e) => setSavingsTargetPercent(e.target.value)} />
					</div>
					<div className="md:col-span-5">
						<Button onClick={onGenerate} disabled={isLoading}>{isLoading ? "Generating..." : "Generate Forecast"}</Button>
					</div>
				</CardContent>
			</Card>

			{forecast && (
				<Card>
					<CardHeader>
						<CardTitle>Recommendation</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="text-sm text-gray-600">Overall Confidence</div>
							<div className="w-1/2">
								<Progress value={Math.round((forecast.confidence.overall || 0) * 100)} />
							</div>
							<div className="text-sm font-medium">{Math.round((forecast.confidence.overall || 0) * 100)}%</div>
						</div>
						<div className="text-sm text-gray-700">Total per {forecast.granularity}: ${forecast.totalBudgetPerPeriod}</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{forecast.categories.map((c) => (
								<Card key={c.name} className="border">
									<CardContent className="pt-4">
										<div className="font-medium capitalize">{c.name}</div>
										<div className="text-sm text-gray-600">Recommended: ${c.recommendedAmount}</div>
										<div className="text-xs text-gray-500">Band: ${c.min} - ${c.max}</div>
										<div className="text-xs text-gray-500">Confidence: {Math.round(c.confidence * 100)}%</div>
										{c.reasoning && <div className="text-xs text-gray-500 mt-2">{c.reasoning}</div>}
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</PageLayout>
	);
};

export default BudgetForecastPage;


