import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: false,
    name: '',
    email: '',
    preferences: {
        investmentGoals: '',
        riskTolerance: '',
        amountToInvest: 0,
        preferredIndustries: [],
        stockType: ''
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            const { token, name, email, preferences } = action.payload
            state.token = token;
            state.name = name;
            state.email = email;
            state.preferences = preferences || initialState.preferences;
            
            console.log("*** Redux Store ***")
            console.log("Token:", state.token);
            console.log("Name:", state.name);
            console.log("Email:", state.email);
            console.groupCollapsed("Preferences:");
            console.log("> investmentGoals:", state.preferences.investmentGoals);
            console.log("> riskTolerance:", state.preferences.riskTolerance);
            console.log("> amountToInvest:", state.preferences.amountToInvest);
            console.log("> preferredIndustries:", state.preferences.preferredIndustries);
            console.log("> stockType:", state.preferences.stockType);
            console.groupEnd();

        },
        removeUserData: (state) => {
            state.token = false;
            state.name = '';
            state.email = '';
            state.preferences = initialState.preferences;
        }
    }
})

export const { setUserData, removeUserData } = authSlice.actions;
export default authSlice.reducer;