import { useNavigate, Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";
import BooksVertical from "../components/BooksVertical";
import BreadCrumbs from "../components/BreadCrumbs";

const Carrito = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector((state) => state.auth);

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate("/login?redirect=/resumen");
    } else {
      navigate("/resumen");
    }
  };

  return (
    <div className="mt-24">
      <section className="bg-secondary">
        <div className="mt-4">
          <BreadCrumbs step1 step2 />
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-64 xl:px-[20rem]">
          <div className="py-8 sm:px-4 sm:py-10">
            <h1 className="text-3xl text-primary text-center uppercase italic font-medium border-b-2">
              Carrito de {userInfo ? userInfo.nombre : "Invitado"}
            </h1>
          </div>
          {cartItems.length === 0 ? (
            <Message>
              <div className="flex">
                <p className="text-lg mr-5">Tu carrito está vacío </p>
                <button className="bg-fourth hover:bg-primary text-white font-bold py-2 px-4 rounded">
                  <Link to="/">Regresar</Link>
                </button>
              </div>
            </Message>
          ) : (
            <div className="flex flex-col">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-4 px-4"
                >
                  <div className="flex items-center basis-1/2">
                    <img
                      className="h-20 w-25 rounded"
                      src={item.portada}
                      alt={item.titulo}
                    />
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-900">
                        {item.titulo}
                      </div>
                      <div className="text-sm text-gray-900">
                        {item.formato}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-4 md:gap-x-8 mt-10 md:mt-0">
                    <div className="text-lg text-gray-900 md:mt-0">
                      Costo: GTQ {item.precio}
                    </div>
                    <div className="flex  gap-9 md:gap-12">
                      <div className="text-lg text-gray-900">
                        Cantidad: {item.cantidad}
                      </div>
                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="text-primary hover:text-red-500 text-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border border-solid p-6">
                <div className="flex justify-between">
                  <p className="text-lg font-bold text-gray-900 flex items-center">
                    Total: {cartItems.cantidad}
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    GTQ {cart.itemsPrecio}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-col p-4">
                  <p className="text-sm">
                    El cargo del envio viene incluido en tu compra.
                  </p>
                  <p className="text-sm">
                    El tiempo de entrega es de{" "}
                    <span className="font-bold">1 a 3 días hábiles</span>.
                  </p>
                  <div className="w-[9rem] h-[6rem] pr-3 mt-2">
                    <img
                      src="/assets/images/cargo-logo.png"
                      alt="logo cargo express"
                      width={300}
                      height={140}
                    />
                  </div>
                </div>
              </div>
              <div className="flex sm:flex-row justify-between mt-10 mb-12 flex-col gap-y-2">
                <button
                  onClick={() => navigate(-1)}
                  className="bg-fourth hover:bg-primary text-white font-bold py-2 px-4 rounded"
                >
                  Regresar
                </button>
                <button
                  onClick={checkoutHandler}
                  className="btn-comprar hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Proceder Datos de Entrega
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section>
        <div>
          <BooksVertical />
        </div>
      </section>
    </div>
  );
};

export default Carrito;
