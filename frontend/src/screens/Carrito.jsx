import { useNavigate, Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/cartSlice";

const Carrito = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/pago");
  };

  return (
    <div className="mt-24">
      <section className="bg-secondary">
        <div className="mx-auto px-8 sm:px-6 lg:px-64">
          <div className="py-8 sm:px-4 sm:py-10">
            <h1 className="text-3xl text-primary">Carrito de Compras</h1>
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
                  className="flex items-center justify-between border-b border-gray-200 py-4 px-4"
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
                  <div className="text-lg text-gray-900">${item.precio}</div>
                  <button
                    onClick={() => removeFromCartHandler(item._id)}
                    className="text-primary hover:text-red-500 text-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="border border-solid p-6">
                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-900 flex items-center">
                    Total: {cartItems.length}{" "}
                    <span className="ml-1">eBooks</span>
                  </p>
                  <div className="text-lg text-gray-900">
                    ${cartItems.reduce((acc, item) => acc + item.precio, 0)}
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-10 mb-12">
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
                  Proceder a Pagar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Carrito;
