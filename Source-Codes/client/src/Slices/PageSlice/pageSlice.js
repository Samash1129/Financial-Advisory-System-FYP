import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previousPage: null,
};

const previousPageSlice = createSlice({
  name: 'previousPage',
  initialState,
  reducers: {
    setPreviousPage: (state, action) => {
      state.previousPage = action.payload;
    },
  },
});

export const { setPreviousPage } = previousPageSlice.actions;
export default previousPageSlice.reducer;
