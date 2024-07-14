import { Link } from "react-router-dom";
import Rating from "./Rating";
import Division from "./Division";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

const BookList = ({ books }) => {
  const dispatch = useDispatch();

  const [cantidad, setCantidad] = useState(1);

  const addToCartHandler = (book) => {
    dispatch(addToCart({ ...book, cantidad }));
    toast.success("Libro agregado al carrito");
  };

  return (
    <>
      <Division />
      <section
        id="booklist"
        className="flex bg-secondary overflow-x-hidden xl:mb-16"
      >
        <div className="container mx-auto flex flex-col lg:px-[4rem] xl:px-[12rem] mt-20">
          {books.map((book, index) => (
            <div
              className="flex px-8 mb-4 flex-col lg:flex-row items-center"
              key={index}
            >
              <img
                src={book.portada}
                alt={book.titulo}
                className="h-[500px] w-[300px] p-2 mb-2"
              />
              <div className="px-6 sm:px-8 py-8 border border-solid rounded-lg shadow-md bg-white ml-4">
                <div className="">
                  <Link to={`/libros/${book._id}`}>
                    <h2 className="font-extrabold text-2xl mb-1 capitalize">
                      {book.titulo}
                    </h2>
                  </Link>
                  <div className="font-semibold text-lg mb-2">{book.autor}</div>
                  <p>{book.bookInStock > 0 ? "Disponible" : "No Disponible"}</p>
                  <Rating
                    value={book.rating}
                    text={`${book.numReviews} reviews`}
                  />
                </div>
                <div className="mt-8">
                  {book.bookInStock > 0 && (
                    <div className="flex items-center gap-4 mb-4">
                      <label htmlFor={`cantidad-${book._id}`} className="block">
                        Cantidad:
                      </label>
                      <select
                        id={`cantidad-${book._id}`}
                        value={cantidad}
                        onChange={(e) => setCantidad(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-6 py-1"
                      >
                        {[...Array(book.bookInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="text-xl font-medium">
                    Precio: GTQ {book.precio}
                  </div>
                  <p className="mt-8 text-justify">{book.descripcion}</p>
                  <div className="flex flex-col md:flex-row items-center md:gap-2">
                    <button
                      className={`py-2 px-4 rounded-md text-white flex items-center gap-2 mt-8 ${
                        book.bookInStock > 0
                          ? "btn-comprar hover:bg-blue-800"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() => addToCartHandler(book)}
                      disabled={book.bookInStock === 0}
                    >
                      <FiShoppingCart size={28} />
                      Comprar
                    </button>
                    <Link
                      to={`/libros/${book._id}`}
                      className="btn-detalles hover:bg-[#0511f2] text-white font-light py-3 px-6 rounded mt-4 md:mt-8 md:ml-4"
                    >
                      <span className="text-white tracking-wide">
                        Ver Detalles
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BookList;
