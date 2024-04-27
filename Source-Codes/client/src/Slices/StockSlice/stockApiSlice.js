import { apiSlice } from "../ApiSlice/apiSlice";

export const stockApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRecommendedStocks: builder.query({
            query: () => ({
                url: '/getrecommendedstocks',
                method: 'GET'
            })
        }),
        getHistoryStock: builder.query({
            query: () => ({
                url: '/recentstocks',
                method: 'GET'
            })
        }),
       
        elevychat: builder.mutation({
            query: (data) => ({
                url: '/elevychat',
                method: 'POST',
                body: data, 
            })
        }),

        fetchChatHistory: builder.mutation({
            query: (data) => ({
              url: '/getChatHistory',
              method: 'POST',
              body: data,
            })
          })

    })
});

export const { 
    useGetRecommendedStocksQuery,
    useGetHistoryStockQuery,
    useElevychatMutation,
    useFetchChatHistoryMutation
} = stockApiSlice;
