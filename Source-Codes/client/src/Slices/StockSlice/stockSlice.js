import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recommendedStocks: null,
    historyStock: null
}

const stockSlice = createSlice({
    name: 'stockSlice',
    initialState,
    reducers: {
        setRecommendedStocks: (state, action) => {
            state.recommendedStocks = action.payload
        },
        removeRecommendedStocks: (state) => {
            state.recommendedStocks = null
        },
        setHistoryStock: (state, action) => {
            state.historyStock = action.payload
        },
        removeHistoryStock: (state) => {
            state.historyStock = null
        }
    }
})

export const { 
    setRecommendedStocks, 
    setHistoryStock,
    removeRecommendedStocks,
    removeHistoryStock
 } = stockSlice.actions
export default stockSlice.reducer