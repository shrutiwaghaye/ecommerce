import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
  }),
  tagTypes: ['Products', 'User'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (limit = 10) => `products?limit=${limit}`,
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = api;