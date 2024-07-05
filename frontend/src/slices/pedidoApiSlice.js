import { apiSlice } from "./apiSlice";
import { PEDIDOS_URL } from "../constants";

export const pedidoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    crearPedido: builder.mutation({
      query: (pedido) => ({
        url: PEDIDOS_URL,
        method: "POST",
        body: { ...pedido },
      }),
    }),
    getPedidoDetails: builder.query({
      query: (pedidoId) => `${PEDIDOS_URL}/${pedidoId}`,
    }),
    keepUnusedDataFor: 5,
  }),
});

export const { useCrearPedidoMutation, useGetPedidoDetailsQuery } = pedidoApi;
