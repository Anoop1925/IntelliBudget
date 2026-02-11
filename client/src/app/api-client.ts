import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL, // <-- FIXED here
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const auth = (getState() as RootState).auth;
    console.log("🔍 API Client - Auth state:", auth);
    
    if (auth?.accessToken) {
      headers.set("Authorization", `Bearer ${auth.accessToken}`);
      console.log("✅ API Client - Authorization header set:", `Bearer ${auth.accessToken.substring(0, 20)}...`);
    } else {
      console.log("❌ API Client - No access token found");
    }
    
    console.log("🔍 API Client - Final headers:", Object.fromEntries(headers.entries()));
    return headers;
  },
});

export const apiClient = createApi({
  reducerPath: "api", // Add API client reducer to root reducer
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true, // Refetch on mount or arg change
  tagTypes: [
    "transactions",
    "analytics",
    "billingSubscription",
    "spending-patterns",
    "reports",
  ], // Tag types for RTK Query
  endpoints: () => ({}), // Endpoints for RTK Query
});
