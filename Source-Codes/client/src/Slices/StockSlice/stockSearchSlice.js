import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchedStock: ''
}

const stockSearchSlice = createSlice({
    name: 'stockSearch',
    initialState,
    reducers: {
        setStockSearchData: (state, action) => {
            const { searchedStock } = action.payload
           
            state.searchedStock = searchedStock || initialState.searchedStock;
            
        },
        // updateCurrentTicker: (state, action) => {
        //     const currentTicker = action.payload;
        //     state.currentTicker = currentTicker;
        //     console.log("Current Ticker:", state.currentTicker);
        // },
        // updateCurrentConvoID: (state, action) => {
        //     const convoID = action.payload;
        //     state.currentConvoID = convoID;
        //     console.log("Current Convo ID:", state.currentConvoID);
        // },
        removeStockSearchData: (state) => {
            
            state.searchedStock = '';
        }
    }
})

export const { setStockSearchData, removeStockSearchData } = stockSearchSlice.actions;
export default stockSearchSlice.reducer;