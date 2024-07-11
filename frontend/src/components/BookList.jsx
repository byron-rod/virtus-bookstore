import { Link } from "react-router-dom";
import Rating from "./Rating";
import Division from "./Division";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const BookList = ({ books }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (book) => {
    dispatch(addToCart({ ...book, cantidad: 1 }));
  };

  return (
    <>
      <Division />
      <section
        id="booklist"
        className="flex bg-secondary overflow-x-hidden xl:mb-16"
      >
        <div className="container mx-auto flex flex-col lg:px-[4rem] xl:px-[8rem] mt-20">
          {books.map((book, index) => (
            <div
              className="flex px-8 mb-4 flex-col lg:flex-row items-center"
              key={index}
            >
              <img
                src={book.portada}
                alt={book.titulo}
                className="h-[525px] w-[335px] md:h-[425px] md:w-[325px] p-2 mb-2"
              />
              <div className="px-8 py-10 border border-solid rounded-lg shadow-md">
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
                  <div className="text-xl font-medium">
                    Precio: GTQ {book.precio}
                  </div>
                  <p className="mt-8 text-justify">{book.descripcion}</p>
                  <div className="flex flex-col md:flex-row items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCartHandler(book); // Pass the current book
                      }}
                      className={`py-2 px-4 rounded-md text-third flex items-center gap-2 mt-8 ${
                        book.bookInStock > 0
                          ? "btn-comprar hover:bg-blue-800"
                          : "bg-gray-400 cursor-not-allowed text-lg font-semibold"
                      }`}
                      disabled={book.bookInStock === 0}
                    >
                      Agregar al Carrito
                    </button>
                    <button className="mt-8">
                      <Link
                        to={`/libros/${book._id}`}
                        className="bg-third hover:bg-blue-700 text-white font-light py-2 px-4 rounded mt-4 md:ml-4"
                      >
                        Ver Detalles
                      </Link>
                    </button>
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
