import { apiSlice } from "../ApiSlice/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (data) => ({
                url: '/signin',
                method: 'POST',
                body: data
            })
        }),
        signUp: builder.mutation({
            query: (data) => ({
                url: '/signup',
                method: 'POST',
                body: data
            })
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/signout',
                method: 'POST'
            })
        })
    })
})

export const {
    useSigninMutation,
    useSignoutMutation,
    useSignUpMutation
} = userApiSlice