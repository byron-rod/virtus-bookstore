import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { savePaymentId } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCrearPedidoMutation } from "../slices/pedidoApiSlice";
import { Link } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems, datosParaEntrega } = cart;

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!cart.datosParaEntrega.email) {
      navigate("/resumen");
    } else if (cartItems.length === 0) {
      navigate("/carrito");
    } else if (!userInfo) {
      navigate("/login");
    }
  }, [cart.datosParaEntrega.email, cartItems, navigate, userInfo]);

  const [createPedido, { isLoading, error }] = useCrearPedidoMutation();

  const handleCheckout = async () => {
    try {
      // Crear el pedido en tu backend
      const res = await createPedido({
        pedidoItems: cartItems,
        datosParaEntrega,
        totalPrecio: cart.itemsPrecio,
        usuario: userInfo._id,
      }).unwrap();

      console.log("Pedido creado con éxito:", res); // Verifica el contenido de res

      if (res && res._id) {
        // Preparar los datos para enviar a Recurrente
        const myHeaders = new Headers();
        myHeaders.append(
          "X-PUBLIC-KEY",
          import.meta.env.VITE_RECURRENTE_PUBLIC_KEY
        );
        myHeaders.append(
          "X-SECRET-KEY",
          import.meta.env.VITE_RECURRENTE_PRIVATE_KEY
        );
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          items: cartItems.map((item) => ({
            name: item.titulo,
            currency: "GTQ",
            amount_in_cents: item.precio * 100,
            image_url: item.portada,
            quantity: item.cantidad,
          })),
          success_url: `https://virtus-bookstore.onrender.com/pedido/${res._id}`,
          cancel_url: "https://virtus-bookstore.onrender.com/pago",
          user_id: datosParaEntrega.email,
          metadata: {},
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

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
      } else {
        throw new Error("ID del pedido no válido");
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      toast.error("Error al crear el pedido");
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
                Telefono:
              </label>
              <p>{datosParaEntrega.telefono}</p>
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
                Municipio:
              </label>
              <p>{datosParaEntrega.municipio}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                Departamento:
              </label>
              <p>{datosParaEntrega.departamento}</p>
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
                    <Link
                      to={`/libros/${item._id}`}
                      className="text-sm font-semibold underline text-gray-900"
                    >
                      {item.titulo}
                    </Link>
                  </div>
                </div>
                <div className="text-lg text-gray-900">
                  GTQ {item.precio * item.cantidad}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-lg text-primary font-extrabold">Total</div>
            <div className="text-lg text-primary font-extrabold">
              GTQ {cart.itemsPrecio}
            </div>
          </div>
          <div>
            {isLoading && <Loader />}
            {error && (
              <Message type="danger">
                {error.message || "An unexpected error occurred"}
              </Message>
            )}
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
