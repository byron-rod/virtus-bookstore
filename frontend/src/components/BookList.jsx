import { Link } from "react-router-dom";
import Rating from "./Rating";
import Division from "./Division";

const BookList = ({ books }) => {
  return (
    <>
      <Division />
      <section className="flex bg-secondary overflow-x-hidden">
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
                  <Rating
                    value={book.rating}
                    text={`${book.numReviews} reviews`}
                  />
                </div>
                <div className="mt-8">
                  <div className="text-2xl font-medium">
                    Precio: ${book.precio}
                  </div>
                  <p className="mt-8">{book.descripcion}</p>
                  <div className="flex flex-col md:flex-row">
                    <button className="mt-8">
                      <Link
                        to="/carrito"
                        className="bg-third hover:bg-blue-700 text-white font-light py-2 px-4 rounded mt-4"
                      >
                        Agregar al Carrito
                      </Link>
                    </button>
                    <button className="mt-8">
                      <Link
                        to={`/libros`}
                        className="bg-third hover:bg-blue-700 text-white font-light py-2 px-4 rounded mt-4 ml-4"
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
