export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  state.itemsPrecio = addDecimals(
    state.cartItems.reduce((acc, item) => {
      const precio = parseFloat(item.precio);
      const cantidad = item.cantidad ? parseInt(item.cantidad, 10) : 1;
      return acc + precio * cantidad;
    }, 0)
  );
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
