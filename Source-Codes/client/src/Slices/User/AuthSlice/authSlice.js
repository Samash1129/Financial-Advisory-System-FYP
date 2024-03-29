import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    name: '',
    isPremium: false,
    accessToken: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { email, name, isPremium, accessToken } = action.payload
            state.email = email 
            state.name = name
            state.isPremium = isPremium
            state.accessToken = accessToken
        },
        removeCredentials: (state) => {
            state.email = ''
            state.name = ''
            state.isPremium = null
            state.accessToken = ''
        }
    }
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer