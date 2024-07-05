import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetPedidoDetailsQuery } from "../slices/pedidoApiSlice";

const PedidoScreen = () => {
  const { id: pedidoId } = useParams();

  const {
    data: pedido,
    refetch,
    error,
    isLoading,
  } = useGetPedidoDetailsQuery(pedidoId);

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
              <label className="block text-base font-medium text-gray-700">
                Nombre:
              </label>
              <p>{pedido.usuario.nombre}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                Email:
              </label>
              <p>{pedido.datosParaEntrega.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                Ciudad:
              </label>
              <p>{pedido.datosParaEntrega.ciudad}</p>
            </div>
            <div className="mb-4">
              <label className="block text-base font-medium text-gray-700">
                País:
              </label>
              <p>{pedido.datosParaEntrega.pais}</p>
            </div>
          </div>
          {pedido.isEntregado ? (
            <Message type="success">
              Pedido entregado {pedido.fechaDeEntrega}{" "}
            </Message>
          ) : (
            <Message type="danger">Pedido aun no entregado</Message>
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
                <div className="text-lg text-gray-900">GTQ {item.precio}</div>
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
        </div>
      </div>
    </div>
  );
};

export default PedidoScreen;
