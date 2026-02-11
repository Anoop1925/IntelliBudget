import { apiClient } from "@/app/api-client";
import { 
  FinancialHealthResponse, 
  FinancialHealthHistoryResponse, 
  GenerateAssessmentRequest, 
  AssessmentHistoryParams,
  GenerateCustomAssessmentRequest
} from "./types";

export const financialHealthApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    generateAssessment: builder.mutation<FinancialHealthResponse, GenerateAssessmentRequest>({
      query: () => ({
        url: "/financial-health/generate",
        method: "POST",
      }),
      invalidatesTags: ["transactions"],
    }),
    
    generateCustomAssessment: builder.mutation<FinancialHealthResponse, GenerateCustomAssessmentRequest>({
      query: (data) => ({
        url: "/financial-health/generate-custom",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["transactions"],
    }),
    
    getLatestAssessment: builder.query<FinancialHealthResponse, void>({
      query: () => ({
        url: "/financial-health/latest",
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
    
    getAssessmentHistory: builder.query<FinancialHealthHistoryResponse, AssessmentHistoryParams>({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/financial-health/history",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["transactions"],
    }),
  }),
});

export const {
  useGenerateAssessmentMutation,
  useGenerateCustomAssessmentMutation,
  useGetLatestAssessmentQuery,
  useGetAssessmentHistoryQuery,
} = financialHealthApi;
