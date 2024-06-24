export const BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
export const BOOKS_URL = `${BASE_URL}/api/books`;
export const USERS_URL = `${BASE_URL}/api/usuarios`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
export const PEDIDOS_URL = `${BASE_URL}/api/pedidos`;
