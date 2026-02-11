import { apiClient } from "@/app/api-client";
import { GetAllReportResponse, UpdateReportSettingParams, GenerateReportResponse } from "./reportType";

export const reportApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    
    getAllReports: builder.query<GetAllReportResponse, {pageNumber: number, pageSize: number}>({
      query: (params) => {
        const { pageNumber = 1, pageSize = 20 } = params;
        return ({
          url: "/report/all",
          method: "GET",
          params: { pageNumber, pageSize },
        });
      },
      providesTags: ["reports"],
    }),

    generateReport: builder.mutation<GenerateReportResponse, { from: string; to: string }>({
      query: ({ from, to }) => ({
        url: "/report/generate",
        method: "GET",
        params: { from, to },
      }),
    }),

    updateReportSetting: builder.mutation<void, UpdateReportSettingParams>({
      query: (payload) => ({
        url: "/report/update-setting",
        method: "PUT",
        body: payload,
      }),
    }),

    sendReportNow: builder.mutation<{ status: string; message: string }, { from?: string; to?: string }>({
      query: ({ from, to }) => ({
        url: "/report/send-now",
        method: "POST",
        body: { from, to },
      }),
      invalidatesTags: ["reports"],
    }),
  }),
});

export const {
    useGetAllReportsQuery,
    useUpdateReportSettingMutation,
    useGenerateReportMutation,
    useSendReportNowMutation,
} = reportApi;
