import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { baseurl } from '../../constants';

const baseQuery = fetchBaseQuery({
    // baseUrl: '',
<<<<<<< HEAD
=======
    credentials: "include",
>>>>>>> AliMashoud
    baseUrl: baseurl,
})

export const apiSlice = createApi({
    baseQuery,
    // tagTypes: ['User'],
    endpoints: (builder) => ({}),
})