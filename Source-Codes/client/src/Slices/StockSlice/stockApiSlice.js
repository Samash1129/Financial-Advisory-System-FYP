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
        })
    })
})

export const { 
    useGetRecommendedStocksQuery,
    useGetHistoryStockQuery
} = stockApiSlice;
