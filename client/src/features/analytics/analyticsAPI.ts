import { apiClient } from "@/app/api-client";
import { ChartAnalyticsResponse, ExpensePieChartBreakdownResponse, FilterParams, SummaryAnalyticsResponse, SpendingPatternResponse, TransactionStatsResponse } from "./anayticsType";

export const analyticsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    summaryAnalytics: builder.query<SummaryAnalyticsResponse, FilterParams>({
      query: ({preset, from, to}) => ({
        url: "/analytics/summary",
        method: "GET",
        params: {preset, from, to}
      }),
      providesTags: ["analytics"],
    }),
    chartAnalytics: builder.query<ChartAnalyticsResponse, FilterParams>({
      query: ({preset, from, to}) => ({
        url: "/analytics/chart",
        method: "GET",
        params: {preset, from, to}
      }),
      providesTags: ["analytics"],
    }),
    expensePieChartBreakdown: builder.query<ExpensePieChartBreakdownResponse, FilterParams  >({
      query: ({preset, from, to}) => ({
        url: "/analytics/expense-breakdown",
        method: "GET",
        params: {preset, from, to}
      }),
      providesTags: ["analytics"],
    }),

// // Add new AI endpoints
// aiExpenseCategorization: builder.query<any, void>({
//   query: () => ({
//     url: "/ai-financial/categorization",
//     method: "GET",
//   }),
//   providesTags: ["ai-financial"],
// }),

// aiBudgetRecommendations: builder.query<any, void>({
//   query: () => ({
//     url: "/ai-financial/budget-recommendations",
//     method: "GET",
//   }),
//   providesTags: ["ai-financial"],
// }),

// aiExpenseForecasting: builder.query<any, void>({
//   query: () => ({
//     url: "/ai-financial/forecasting",
//     method: "GET",
//   }),
//   providesTags: ["ai-financial"],
// }),

    // Add spending pattern endpoints
    getUserSpendingPatterns: builder.query<SpendingPatternResponse, void>({
      query: () => ({
        url: "/spending-patterns",
        method: "GET",
      }),
      providesTags: ["spending-patterns"],
    }),
    analyzeSpendingPatterns: builder.mutation<SpendingPatternResponse, void>({
      query: () => ({
        url: "/spending-patterns/analyze",
        method: "POST",
      }),
      invalidatesTags: ["spending-patterns"],
    }),
    getTransactionStats: builder.query<TransactionStatsResponse, void>({
      query: () => ({
        url: "/spending-patterns/stats",
        method: "GET",
      }),
      providesTags: ["spending-patterns"],
    }),
  }),
});



export const {
  useSummaryAnalyticsQuery,
  useChartAnalyticsQuery,
  useExpensePieChartBreakdownQuery,
  useGetUserSpendingPatternsQuery,
  useAnalyzeSpendingPatternsMutation,
  useGetTransactionStatsQuery,
} = analyticsApi;