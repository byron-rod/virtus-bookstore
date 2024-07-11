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
    getMisPedidos: builder.query({
      query: () => ({
        url: `${PEDIDOS_URL}/mispedidos`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPedidos: builder.query({
      query: () => ({
        url: PEDIDOS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    pedidoEnviado: builder.mutation({
      query: (pedidoId) => ({
        url: `${PEDIDOS_URL}/${pedidoId}/enviar`,
        method: "PUT",
      }),
    }),
    updatePedidoToPaid: builder.mutation({
      query: ({ pedidoId, status }) => ({
        url: `${PEDIDOS_URL}/${pedidoId}/pagar`,
        method: "PUT",
        body: { status },
      }),
    }),
  }),
});

export const {
  useCrearPedidoMutation,
  useGetPedidoDetailsQuery,
  useGetMisPedidosQuery,
  useGetPedidosQuery,
  usePedidoEnviadoMutation,
  useUpdatePedidoToPaidMutation,
} = pedidoApi;
