import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    name: '',
    isPremium: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { email, name, isPremium } = action.payload
            state.email = email
            state.name = name
            state.isPremium = isPremium
        },
        removeCredentials: (state) => {
            state.email = ''
            state.name = ''
            state.isPremium = null
        }
    }
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer