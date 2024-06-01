import { apiSlice } from "../ApiSlice/apiSlice";

export const stockApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendedStocks: builder.mutation({
      query: (data) => ({
        url: "/generaterecommendations",
        method: "POST",
        body: data,
      }),
    }),
    getHistoryStock: builder.query({
      query: () => ({
        url: "/recentstocks",
        method: "GET",
      }),
    }),
    getAllStocks: builder.mutation({
      query: (data) => ({
        url: "/get-stocks",
        method: "POST",
        body: data,
      }),
    }),
    elevychat: builder.mutation({
      query: (data) => ({
        url: "/elevychat",
        method: "POST",
        body: data,
      }),
    }),
    fetchChatHistory: builder.mutation({
      query: (data) => ({
        url: "/getChatHistory",
        method: "POST",
        body: data,
      }),
    }),
    getCloseVal: builder.query({
      query: (data) => ({
        url: "/getclosevals",
        method: "POST",
        body: data,
      }),
    }),
    getFundVal: builder.query({
      query: (data) => ({
        url: "/getfundvals",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetRecommendedStocksMutation,
  useGetHistoryStockQuery,
  useGetAllStocksMutation,
  useElevychatMutation,
  useFetchChatHistoryMutation,
  useGetCloseValQuery,
  useGetFundValQuery,
} = stockApiSlice;
