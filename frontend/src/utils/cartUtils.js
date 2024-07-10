export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calulate items price
  state.itemsPrecio = addDecimals(
    state.cartItems.reduce((acc, item) => {
      console.log("Item price:", item.precio, "Item quantity:", item.cantidad);
      return acc + item.precio * item.cantidad;
    }, 0)
  );
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
