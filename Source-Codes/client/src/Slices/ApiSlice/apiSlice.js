import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { baseurl } from '../../constants';

const baseQuery = fetchBaseQuery({
    baseUrl: baseurl,
})

export const apiSlice = createApi({
    baseQuery,
    // tagTypes: ['User'],
    endpoints: (builder) => ({}),
})