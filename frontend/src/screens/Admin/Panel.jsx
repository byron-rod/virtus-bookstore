import { useGetPedidosQuery } from "../../slices/pedidoApiSlice";
import {
  useGetUsuariosQuery,
  useDeleteUsuarioMutation,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaTrash, FaEdit } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const Panel = () => {
  const {
    data: pedidos,
    isLoading: loadingPedidos,
    error: errorPedidos,
  } = useGetPedidosQuery();
  const {
    data: usuarios,
    refetch,
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useGetUsuariosQuery();
  const [deleteUsuario, { isLoading: loadingDelete }] =
    useDeleteUsuarioMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUsuario(id);
        refetch();
        toast.success("Usuario eliminado");
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        toast.error("Error al eliminar usuario");
      }
    }
  };

  return (
    <div className="mt-28 p-4 md:px-48">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Panel de Administrador -
        <MdAdminPanelSettings className="inline-block text-4xl" />
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Todos los pedidos</h2>
        {loadingPedidos ? (
          <Loader />
        ) : errorPedidos ? (
          <Message type="danger">
            {errorPedidos?.data?.message || errorPedidos.error}
          </Message>
        ) : pedidos.length === 0 ? (
          <Message>No hay pedidos</Message>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Usuario
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pagado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Entregado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Detalles
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedidos.map((pedido) => (
                <tr key={pedido._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pedido._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pedido.usuario.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(pedido.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    GTQ {pedido.totalPrecio}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pedido.isPagado ? (
                      <span className="flex items-center">
                        <FaCheck className="text-green-500 mr-1" />
                        {new Date(pedido.updatedAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pedido.isEntregado ? (
                      <span className="flex items-center">
                        <FaCheck className="text-green-500 mr-1" />
                        {new Date(pedido.updatedAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/pedido/${pedido._id}`}>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        Detalles
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Todos los usuarios</h2>
        {loadingDelete && <Loader />}
        {loadingUsuarios ? (
          <Loader />
        ) : errorUsuarios ? (
          <Message type="danger">
            {errorUsuarios?.data?.message || errorUsuarios.error}
          </Message>
        ) : usuarios.length === 0 ? (
          <Message>No hay usuarios</Message>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Admin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Editar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {usuario._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {usuario.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline hover:text-blue-600">
                    {" "}
                    <a href={`mailto:${usuario.email}`}>{usuario.email}</a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {usuario.esAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link to={`/admin/usuario/${usuario._id}/editar`}>
                      <FaEdit className="text-indigo-600 hover:text-indigo-900" />
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => deleteHandler(usuario._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Panel;
