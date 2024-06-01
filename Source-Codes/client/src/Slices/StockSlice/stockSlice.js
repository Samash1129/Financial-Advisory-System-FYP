import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    recommendedStocks: [],
    allStocks: []
}

const stockSlice = createSlice({
    name: 'stockSlice',
    initialState,
    reducers: {
        setRecommendedStocks: (state, action) => {
            state.recommendedStocks = action.payload;
            console.log("Recommended Stocks: ", state.recommendedStocks);
        },
        setAllStocks: (state, action) => {
            state.allStocks = action.payload;
            console.log("All Stocks: ", state.allStocks);
        },
        removeRecommendedStocks: (state) => {
            state.recommendedStocks = [];
        },
        removeAllStocks: (state) => {
            state.allStocks = [];
        }
    }
})

export const { 
    setRecommendedStocks, 
    setAllStocks, 
    removeRecommendedStocks, 
    removeAllStocks
 } = stockSlice.actions
export default stockSlice.reducer