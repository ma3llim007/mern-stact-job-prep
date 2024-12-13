import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.github.com/" }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: (username) => `users/${username}`,
        }),
    }),
});

// Export the auto-generated hooks for usage in components
export const { useGetUserQuery } = apiSlice;
