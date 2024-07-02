import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { datosParaEntrega as setDatosParaEntrega } from "../slices/cartSlice";
import BreadCrumbs from "../components/BreadCrumbs";

const PreCheckOut = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, datosParaEntrega } = cart;

  const [email, setEmail] = useState(datosParaEntrega?.email || "");
  const [nombre, setNombre] = useState(datosParaEntrega?.nombre || "");
  const [apellido, setApellido] = useState(datosParaEntrega?.apellido || "");
  const [pais, setPais] = useState(datosParaEntrega?.pais || "");
  const [ciudad, setCiudad] = useState(datosParaEntrega?.ciudad || "");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  console.log(cartItems);
  console.log(datosParaEntrega);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }
    dispatch(setDatosParaEntrega({ email, nombre, apellido, pais, ciudad })); // Dispatch the action correctly
    navigate("/pago");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8 mt-24">
      <BreadCrumbs step1 step2 step3 />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900 uppercase border-b-2">
          Resumen de orden de {userInfo.nombre}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl lg:flex lg:justify-between">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 lg:mt-0 lg:w-1/2 lg:order-1 order-2 mb-4 md:mb-0">
          <h3 className="flex text-lg font-semibold text-primary mb-4 justify-center">
            eBooks Para Pagar
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
        </div>
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 lg:w-1/2 lg:order-2">
          <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-base font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="nombre"
                className="block text-base font-medium text-gray-700"
              >
                Nombre
              </label>
              <div className="mt-1">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="apellido"
                className="block text-base font-medium text-gray-700"
              >
                Apellido
              </label>
              <div className="mt-1">
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  autoComplete="apellido"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pais"
                className="block text-base font-medium text-gray-700"
              >
                Ciudad
              </label>
              <div className="mt-1">
                <input
                  id="pais"
                  name="pais"
                  type="text"
                  autoComplete="pais"
                  required
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pais"
                className="block text-base font-medium text-gray-700"
              >
                País
              </label>
              <div className="mt-1">
                <input
                  id="pais"
                  name="pais"
                  type="text"
                  autoComplete="pais"
                  required
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms-and-privacy"
                name="terms-and-privacy"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded"
              />
              <label
                htmlFor="terms-and-privacy"
                className="ml-2 block text-sm text-gray-900"
              >
                Acepto los
                <Link to="#" className="text-blue-600 hover:text-blue-500 mx-1">
                  Términos, Condiciones
                </Link>
                y
                <Link to="#" className="text-blue-600 hover:text-blue-500 mx-1">
                  Política de Privacidad
                </Link>
                .
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#db3e36] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                Proceder a Pagar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreCheckOut;
