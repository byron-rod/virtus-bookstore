import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BreadCrumbs from "../components/BreadCrumbs";
import { savePaymentId } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCrearPedidoMutation } from "../slices/pedidoApiSlice";
import { clearCartItems } from "../slices/cartSlice";
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
      const res = await createPedido({
        pedidoItems: cartItems,
        datosParaEntrega,
        totalPrecio: cartItems.reduce((acc, item) => acc + item.precio, 0),
        usuario: userInfo._id,
      }).unwrap();

      console.log("Pedido creado con éxito:", res); // Verifica el contenido de res

      if (res && res._id) {
        dispatch(clearCartItems());
        navigate(`/pedido/${res._id}`);
      } else {
        throw new Error("ID del pedido no válido");
      }
    } catch (error) {
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
                Nombre:
              </label>
              <p>{userInfo.nombre}</p>
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
                    <Link
                      to={`/libros/${item._id}`}
                      className="text-base font-semibold underline text-gray-900"
                    >
                      {item.titulo}
                    </Link>
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
