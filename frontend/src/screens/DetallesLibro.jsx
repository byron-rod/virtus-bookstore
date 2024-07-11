import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import BookImages from "../components/BookImages";
import { FiShoppingCart } from "react-icons/fi";
import { useGetBookDetailsQuery } from "../slices/booksApiSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { FaAmazon } from "react-icons/fa";

const DetallesLibro = () => {
  const { id: bookId } = useParams();
  const { data: book, isLoading, error } = useGetBookDetailsQuery(bookId);

  const [cantidad, setCantidad] = useState(1);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...book, cantidad }));
    navigate("/carrito");
  };

  return (
    <div className="px-4 mt-36">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message type="warning">{error?.data.message || error.error}</Message>
      ) : (
        <>
          {/* Image container */}
          <div className="mt-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-12  pb-10">
            <div className="w-full lg:w-1/2 mt-8">
              <BookImages book={book} />
            </div>
            {/* text container */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="gap-6">
                <h1 className="text-2xl font-semibold">{book.titulo}</h1>
                <p className="text-lg font-medium">{book.autor}</p>
                <p className="italic">{book.genero}</p>
                <p className="text-md">
                  {book.bookInStock > 0 ? "Disponible" : "No Disponible"}
                </p>
                <p className="text-xl font-bold mt-4">
                  Precio: GTQ {book.precio}
                </p>
                <Rating
                  value={book.rating}
                  text={`${book.numReviews} reviews`}
                />
              </div>
              <div>
                <p className="text-sm text-justify">{book.sinopsis}</p>
                {book.bookInStock > 0 && (
                  <div className="flex items-center gap-4 mt-4">
                    <p>Cantidad:</p>
                    <select
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
                <button
                  className={`py-2 px-4 rounded-md text-white flex items-center gap-2 mt-6 ${
                    book.bookInStock > 0
                      ? "btn-comprar hover:bg-blue-800"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={addToCartHandler}
                  disabled={book.bookInStock === 0}
                >
                  <FiShoppingCart size={28} />
                  Comprar
                </button>
                <Link
                  to="https://www.amazon.com/stores/VIRGILIO-A.-CORDON/author/B08NGVBHBP?ref_=pe_2466670_811284380&isDramIntegrated=true&shoppingPortalEnabled=true"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="btn-amazon hover:bg-blue-700  py-2 px-4 rounded-md text-white flex items-center gap-2 mt-6">
                    <FaAmazon size={28} className="mr-1" />
                    Comprar Edicion Kindle
                  </button>
                </Link>
              </div>
              <div className="w-full border-b-4"></div>
              <div>
                <div className="meta-data flex">
                  <div className="text-sm font-light sm:px-4 md:px-1 m-1">
                    <p>Fecha de publicación: {book.fecha_publicacion}</p>
                    <p>Editorial: {book.editorial}</p>
                    <p>Idioma: {book.idioma}</p>
                  </div>
                  <div className="text-sm font-light sm:px-4 m-1">
                    <p>Formato: {book.formato}</p>
                    <p>Número de páginas: {book.paginas}</p>
                    <p>ISBN: {book.ISBN}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* back button */}
      <div className="mt-2 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-10">
        <button className="bg-third hover:bg-fourth py-2 px-4 rounded-md text-white text-xl">
          <Link to="/">Volver</Link>
        </button>
      </div>
    </div>
  );
};

export default DetallesLibro;
