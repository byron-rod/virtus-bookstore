import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Book", "Pedido", "Usuario"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/api/books",
      providesTags: ["Book"],
    }),
    getBookById: builder.query({
      query: (id) => `/api/books/${id}`,
      providesTags: ["Book"],
    }),
  }),
});
