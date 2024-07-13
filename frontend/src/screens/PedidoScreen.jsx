import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetPedidoDetailsQuery,
  usePedidoEnviadoMutation,
  useUpdatePedidoToPaidMutation,
} from "../slices/pedidoApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PedidoScreen = () => {
  const [loadingPago, setLoadingPago] = useState(true);
  const { id: pedidoId } = useParams();
  const dispatch = useDispatch();

  const [pedidoEnviado, { isLoading: loadingEnviado }] =
    usePedidoEnviadoMutation();

  const [updatePedido, { isLoading: loadingPagado }] =
    useUpdatePedidoToPaidMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const paymentId = useSelector((state) => state.cart.paymentId);

  const {
    data: pedido,
    refetch,
    error,
    isLoading,
  } = useGetPedidoDetailsQuery(pedidoId);

  useEffect(() => {
    if (pedido) {
      dispatch(clearCartItems());
    }
  }, [pedido, dispatch]);

  const deliverHandler = async () => {
    try {
      await pedidoEnviado(pedidoId);
      refetch();
      toast.success("Pedido marcado como enviado");
    } catch (error) {
      console.error("Error al marcar pedido como enviado:", error);
      toast.error("Error al marcar pedido como enviado");
    }
  };

  // Verificar el estado del pago y actualizar en el backend si es pagado
  useEffect(() => {
    const fetchEstadoPago = async (checkoutId) => {
      const myHeaders = new Headers();
      myHeaders.append(
        "X-PUBLIC-KEY",
        import.meta.env.VITE_RECURRENTE_PUBLIC_KEY
      );
      myHeaders.append(
        "X-SECRET-KEY",
        import.meta.env.VITE_RECURRENTE_PRIVATE_KEY
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://app.recurrente.com/api/checkouts/${checkoutId}`,
          requestOptions
        );
        const data = await response.json();

        // Verificar el estado del pago
        if (data.status === "paid" && !pedido.isPagado) {
          // Actualizar el estado de isPagado en el backend
          await updatePedido({ pedidoId: pedido._id, status: "paid" });
          // Refrescar los detalles del pedido para obtener los cambios
          refetch();
          toast.success("¡Pago confirmado! El pedido ha sido actualizado.");
        }
      } catch (error) {
        console.log("Error al obtener el estado del pago:", error);
      } finally {
        setLoadingPago(false);
      }
    };

    if (paymentId && pedido && !loadingPagado) {
      fetchEstadoPago(paymentId);
    } else {
      setLoadingPago(false);
    }
  }, [paymentId, pedido, loadingPagado, updatePedido, refetch]);

  // Verificar si error es un objeto y obtener el mensaje de error
  const errorMessage = typeof error === "object" ? error.message : error;

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message type="danger">{errorMessage}</Message>
  ) : (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8 mt-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900 uppercase border-b-2">
          Gracias {pedido.usuario.nombre} por tu compra!
        </h2>
        <h3 className="mt-6 text-center text-xl font-medium">
          Pedido # {pedido._id}
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl lg:flex lg:justify-between">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 lg:w-1/2 lg:order-1 order-2 mb-4 md:mb-0">
          <h3 className="flex text-lg font-semibold text-primary mb-4 justify-center">
            Detalles Para Entrega
          </h3>
          <div>
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700">
                Nombre:
              </label>
              <p>
                {pedido.datosParaEntrega.nombre}{" "}
                {pedido.datosParaEntrega.apellido}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700">
                Email:
              </label>
              <p>{pedido.datosParaEntrega.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700">
                Telefono:
              </label>
              <p>{pedido.datosParaEntrega.telefono}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700">
                Direccion:
              </label>
              <p>{pedido.datosParaEntrega.direccion}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700">
                Municipio:
              </label>
              <p>{pedido.datosParaEntrega.municipio}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-700">
                Departamento:
              </label>
              <p>{pedido.datosParaEntrega.departamento}</p>
            </div>
          </div>
          {pedido.isEntregado ? (
            <Message type="success">
              Pedido entregado {pedido.fechaDeEntrega}{" "}
            </Message>
          ) : (
            <Message type="info">
              En este momento estamos procesando tu orden, seras notificado
              cuando tu pedido sea enviado.
            </Message>
          )}
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 lg:w-1/2 lg:order-2">
          <h3 className="flex text-lg font-semibold text-primary mb-4 justify-center">
            Resumen del Pedido
          </h3>
          <div className="flex flex-col">
            {pedido.pedidoItems.map((item) => (
              <div
                key={item._id}
                className="flex border-b gap-2 justify-between border-gray-200 py-4"
              >
                <div className="flex basis-1/2">
                  <div>
                    <Link
                      to={`/libros/${item.libro}`}
                      className="text-base font-semibold underline text-gray-900"
                    >
                      {item.titulo}
                    </Link>
                  </div>
                </div>
                <div className="text-lg text-gray-900">
                  GTQ {item.precio}X{item.cantidad}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-lg text-primary font-extrabold">Total</div>
            <div className="text-lg text-primary font-extrabold">
              GTQ {pedido.totalPrecio}
            </div>
          </div>
          <div className="mt-4">
            {pedido.isPagado ? (
              <Message type="success">
                Pedido pagado {pedido.fechaDePago}{" "}
              </Message>
            ) : (
              <Message type="danger">Falta de pago</Message>
            )}
          </div>
          {loadingEnviado && <Loader />}
          {userInfo &&
            userInfo.esAdmin &&
            !pedido.isEntregado &&
            pedido.isPagado && (
              <button
                onClick={deliverHandler}
                className="bg-primary text-white w-full rounded-lg py-2 mt-4"
              >
                Marcar como Enviado
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default PedidoScreen;
