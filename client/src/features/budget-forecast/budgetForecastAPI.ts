import { apiClient } from "@/app/api-client";
import { BudgetForecastResponse, GenerateBudgetForecastRequestBody } from "./types";

export const budgetForecastApi = apiClient.injectEndpoints({
	endpoints: (builder) => ({
		generateBudgetForecast: builder.mutation<BudgetForecastResponse, GenerateBudgetForecastRequestBody | void>({
			query: (body) => ({
				url: "/ai/budget-forecast/generate",
				method: "POST",
				body: body || {},
			}),
			invalidatesTags: ["transactions"],
		}),
		getLatestBudgetForecast: builder.query<BudgetForecastResponse, void>({
			query: () => ({ url: "/ai/budget-forecast/latest", method: "GET" }),
			providesTags: ["transactions"],
		}),
		getBudgetForecastHistory: builder.query<BudgetForecastResponse & { pagination?: any }, { page?: number; limit?: number }>({
			query: ({ page = 1, limit = 10 } = {}) => ({ url: "/ai/budget-forecast/history", method: "GET", params: { page, limit } }),
			providesTags: ["transactions"],
		}),
	}),
});

export const { useGenerateBudgetForecastMutation, useGetLatestBudgetForecastQuery, useGetBudgetForecastHistoryQuery } = budgetForecastApi;


