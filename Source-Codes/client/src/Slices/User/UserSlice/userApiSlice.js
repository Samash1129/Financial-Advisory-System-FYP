import { apiSlice } from "../../ApiSlice/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
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
    saveConversation: builder.mutation({
      query: (data) => ({
        url: "/save-conversation",
        method: "POST",
        body: data,
      }),
    }),
    checkPython: builder.query({
      query: () => '/check-python',
    })

  }),
});

export const {
  useSigninMutation,
  useSignoutMutation,
  useSignUpTempMutation,
  useSignUpFinalMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useSaveConversationMutation,
  useCheckPythonQuery 
} = userApiSlice;
