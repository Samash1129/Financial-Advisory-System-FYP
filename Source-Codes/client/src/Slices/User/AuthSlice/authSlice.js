import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    name: '',
    isPremium: false,
    token: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { email, name, isPremium, token } = action.payload
            state.email = email 
            state.name = name
            state.isPremium = isPremium
            state.token = token
        },
        removeCredentials: (state) => {
            state.email = ''
            state.name = ''
            state.isPremium = null
            state.token = ''
        }
    }
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer