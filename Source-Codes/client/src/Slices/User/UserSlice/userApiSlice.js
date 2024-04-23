import { apiSlice } from "../../ApiSlice/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
<<<<<<< HEAD
    endpoints: (builder) => ({
        signin: builder.mutation({
            query: (data) => ({
                // url: '/api/signin',
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
        updateUser: builder.mutation({
            query: (data) => ({
                url: '/updateprofile',
                method: 'PUT',
                body: data
            })
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/api/signout',
                method: 'POST'
            })
        })
    })
})
=======
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        // url: '/api/signin',
        url: "/signin",
        method: "POST",
        body: data,
      }),
    }),
    signUpTemp: builder.mutation({
      query: (data) => ({
        url: "/signup-temp",
        method: "POST",
        body: data,
      }),
    }),
    signUpFinal: builder.mutation({
      query: (data) => ({
        url: "/signup-final",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/updateprofile",
        method: "PATCH",
        body: data,
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),
    deleteUser: builder.mutation({
      query: (email) => ({
        url: "/deleteuser",
        method: "DELETE",
        body: { email },
      }),
    }),
  }),
});
>>>>>>> AliMashoud

export const {
  useSigninMutation,
  useSignoutMutation,
  useSignUpTempMutation,
  useSignUpFinalMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;
