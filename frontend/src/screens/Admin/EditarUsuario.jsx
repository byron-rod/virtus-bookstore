import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUsuarioDetailsQuery,
  useUpdateUsuarioMutation,
} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const EditarUsuario = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [esAdmin, setEsAdmin] = useState(false);

  const {
    data: usuario,
    isLoading,
    error,
    refetch,
  } = useGetUsuarioDetailsQuery(userId);

  const [updateUsuario, { isLoading: loadingUpdate }] =
    useUpdateUsuarioMutation();

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre);
      setEmail(usuario.email);
      setEsAdmin(usuario.esAdmin);
    }
  }, [usuario]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUsuario({
        userId,
        nombre,
        email,
        esAdmin,
      });
      toast.success("Usuario actualizado correctamente");
      navigate("/admin/panel");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return (
    <div className="mt-28 p-4 md:px-60">
      <Link to="/admin/panel" className="btn btn-light mb-3">
        <button className="text-indigo-600 hover:text-white hover:bg-blue-500 border-2 rounded-lg px-4">
          Atras
        </button>
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          Editar Usuario
        </h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message type="danger">{error?.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="esAdmin"
              >
                Administrador
              </label>
              <input
                type="checkbox"
                id="esAdmin"
                className="shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline"
                checked={esAdmin}
                onChange={(e) => setEsAdmin(e.target.checked)}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Actualizar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditarUsuario;
