import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { usePerfilMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMisPedidosQuery } from "../slices/pedidoApiSlice";
import { Link, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updatePerfil, { isLoading: loadingUpdatePerfil }] =
    usePerfilMutation();
  const { data: pedidos, isLoading, error } = useGetMisPedidosQuery();

  useEffect(() => {
    if (userInfo) {
      setNombre(userInfo.nombre);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    } else {
      try {
        console.log("Updating profile with:", {
          _id: userInfo._id,
          nombre,
          email,
          password,
        });
        const res = await updatePerfil({
          _id: userInfo._id,
          nombre,
          email,
          password,
        }).unwrap();
        console.log("Profile update response:", res);
        dispatch(setCredentials(res));
        toast.success("Perfil actualizado correctamente");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="mt-28 p-4 md:px-48">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-light mb-3 text-indigo-600 hover:text-white hover:bg-blue-500 border-2 rounded-lg px-4"
      >
        Atras
      </button>
      <div className="bg-secondary rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Perfil de Usuario</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 p-2 block w-full md:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full md:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full md:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirma tu contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirma tu contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 block w-full md:w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Actualizar
          </button>
          {loadingUpdatePerfil && <Loader />}
        </form>
      </div>
      <div className="bg-secondary rounded-lg shadow-lg p-6 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Mis Pedidos</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="danger">{error?.data?.message || error.error}</Message>
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
    </div>
  );
};

export default UserProfile;
