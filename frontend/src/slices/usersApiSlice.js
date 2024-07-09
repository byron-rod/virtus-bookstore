import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    perfil: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getUsuarios: builder.query({
      query: () => `${USERS_URL}`,
      providesTags: ["Usuarios"],
      keepUnusedDataFor: 5,
    }),
    deleteUsuario: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getUsuarioDetails: builder.query({
      query: (userId) => `${USERS_URL}/${userId}`,
      keepUnusedDataFor: 5,
    }),
    updateUsuario: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Usuario"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  usePerfilMutation,
  useGetUsuariosQuery,
  useDeleteUsuarioMutation,
  useGetUsuarioDetailsQuery,
  useUpdateUsuarioMutation,
} = usersApiSlice;
