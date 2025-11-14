import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsAPI = createApi({
  reducerPath: 'productsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'products',
    }),
    getCategories: builder.query({
      query: () => 'products/categories',
    }),
  }),
});

export const { useGetAllProductsQuery, useGetCategoriesQuery } = productsAPI;
