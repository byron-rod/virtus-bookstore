import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { savePaymentId } from "../slices/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, datosParaEntrega } = cart;

  console.log(cartItems, datosParaEntrega);

  const { userInfo } = useSelector((state) => state.auth);

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
    success_url: "https://www.google.com",
    cancel_url: "https://www.amazon.com",
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8 mt-12">
      <BreadCrumbs step1 step2 step3 step4 />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900 uppercase border-b-2">
          Confirmación de Pedido de {userInfo.nombre}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl lg:flex lg:justify-between">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 lg:mt-0 lg:w-1/2 lg:order-1 order-2 mb-4 md:mb-0">
          <h3 className="flex text-lg font-semibold text-primary mb-4 justify-center">
            Detalles del Usuario
          </h3>
          <div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                Email:
              </label>
              <p>{datosParaEntrega.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                Nombre:
              </label>
              <p>{datosParaEntrega.nombre}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                Apellido:
              </label>
              <p>{datosParaEntrega.apellido}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                Ciudad:
              </label>
              <p>{datosParaEntrega.ciudad}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                País:
              </label>
              <p>{datosParaEntrega.pais}</p>
            </div>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 lg:w-1/2 lg:order-2">
          <h3 className="flex text-lg font-semibold text-primary mb-4 justify-center">
            Resumen del Pedido
          </h3>
          <div>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center">
                  <img
                    className="h-20 w-25 rounded"
                    src={item.portada}
                    alt={item.titulo}
                  />
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-900">
                      {item.titulo}
                    </div>
                    <div className="text-sm text-gray-900">{item.formato}</div>
                  </div>
                </div>
                <div className="text-lg text-gray-900">GTQ {item.precio}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-lg text-primary font-extrabold">Total</div>
            <div className="text-lg text-primary font-extrabold">
              GTQ {cartItems.reduce((acc, item) => acc + item.precio, 0)}
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#db3e36] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4"
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
