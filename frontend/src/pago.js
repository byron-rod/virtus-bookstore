const myHeaders = new Headers();
myHeaders.append("X-PUBLIC-KEY", import.meta.env.VITE_RECURRENTE_PUBLIC_KEY);
myHeaders.append("X-SECRET-KEY", import.meta.env.VITE_RECURRENTE_PRIVATE_KEY);
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  items: cartItems.map((item) => ({
    name: item.titulo,
    currency: "GTQ",
    amount_in_cents: item.precio * 100,
    image_url: item.portada,
    quantity: 1,
  })),
  success_url: "https://localhost:5173/confirmacion",
  cancel_url: "https://localhost:5173/pago",
  user_id: datosParaEntrega.email,
  metadata: {},
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow",
};

const handleCheckout = async () => {
  try {
    const resp = await fetch(
      `https://app.recurrente.com/api/checkouts`,
      requestOptions
    );
    const data = await resp.json();
    console.log(data);

    if (data && data.checkout_url) {
      // Guarda el ID de la compra para referencia futura en el estado global
      dispatch(savePaymentId(data.id));

      // Redirigir al usuario a la pasarela de pago de Recurrente
      window.location.href = data.checkout_url;
    } else {
      console.error("Error al recibir el checkout_url de Recurrente", data);
    }
  } catch (error) {
    console.log(error);
  }
};
