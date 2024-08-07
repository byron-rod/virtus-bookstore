import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useGetBooksQuery } from "../slices/booksApiSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { addToCart } from "../slices/cartSlice";
import Message from "../components/Message";
import { toast } from "react-toastify";

const BooksVertical = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();

  const dispatch = useDispatch();

  const addToCartHandler = (book) => {
    dispatch(addToCart({ ...book, cantidad: 1 }));
    toast.success("Libro agregado al carrito");
  };

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return (
      <Message type="warning">{error?.data?.message || error.error}</Message>
    );
  } else {
    return (
      <div className="mt-4 md:mt-8 p-5 mb-20 h-[400px] w-full">
        <h1 className="vertical-title text-center text-2xl font-medium md:pb-6">
          Te puede interesar algun otro de nuestros titulos:
        </h1>
        <div className="flex mt-8 gap-x-5 sm:gap-x-8 md:gap-x-20 xl:gap-x-[15rem] justify-center items-center sm:flex-row gap-y-16">
          {books?.map((book) => (
            <div
              key={book._id}
              className="w-[90px] h-[60px] sm:w-[120px] sm:h-[90px] flex-col"
            >
              <img
                src={book.portada}
                alt={book.titulo}
                className="rounded-md mb-4"
              />
              <div className="">
                <h1 className="text-sm truncate">{book.titulo}</h1>
                <p className="font-semibold">Precio: {book.precio}</p>
                <p className="text-xs">
                  {book.bookInStock > 0 ? "Disponible" : "No Disponible"}
                </p>
              </div>
              <div>
                <button
                  className={`py-2 px-4 rounded-md text-white flex items-center gap-2 mt-3 ${
                    book.bookInStock > 0
                      ? "btn-comprar-mini hover:bg-blue-800"
                      : "btn-comprar-cancel"
                  }`}
                  onClick={() => addToCartHandler(book)}
                  disabled={book.bookInStock === 0}
                >
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default BooksVertical;
