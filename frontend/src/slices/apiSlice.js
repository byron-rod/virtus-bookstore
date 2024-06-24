import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

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
    getPedidos: builder.query({
      query: () => "/api/pedidos",
      providesTags: ["Pedido"],
    }),
    getPedidoById: builder.query({
      query: (id) => `/api/pedidos/${id}`,
      providesTags: ["Pedido"],
    }),
    getUsuarios: builder.query({
      query: () => "/api/usuarios",
      providesTags: ["Usuario"],
    }),
    getUsuarioById: builder.query({
      query: (id) => `/api/usuarios/${id}`,
      providesTags: ["Usuario"],
    }),
  }),
});
