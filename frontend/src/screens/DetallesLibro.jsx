import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import BookImages from "../components/BookImages";
import { FiShoppingCart } from "react-icons/fi";
import { useGetBookDetailsQuery } from "../slices/booksApiSlice";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";

const DetallesLibro = () => {
  const { id: bookId } = useParams();
  const { data: book, isLoading, error } = useGetBookDetailsQuery(bookId);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart(book));
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
            <div className="w-full lg:w-1/2">
              <BookImages book={book} />
            </div>
            {/* text container */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <div className="gap-6">
                <h1 className="text-2xl font-semibold">{book.titulo}</h1>
                <p className="text-lg font-medium">{book.autor}</p>
                <p className="italic">{book.genero}</p>
                <p className="text-xl font-bold mt-4">
                  Precio: GTQ {book.precio}
                </p>
                <Rating
                  value={book.rating}
                  text={`${book.numReviews} reviews`}
                />
              </div>
              <div>
                <p>{book.descripcion}</p>
                <button
                  className="btn-comprar hover:bg-blue-700 py-2 px-4 rounded-md text-white flex items-center gap-2 mt-6"
                  onClick={addToCartHandler}
                >
                  <FiShoppingCart size={28} />
                  Comprar
                </button>
              </div>
              <div className="w-full border-b-4"></div>
              <div className="">
                <div className="meta-data flex">
                  <div className="text-base font-light sm:px-4 md:px-1 m-1">
                    <p>Fecha de publicación: {book.fecha_publicacion}</p>
                    <p>Editorial: {book.editorial}</p>
                    <p>Idioma: {book.idioma}</p>
                  </div>
                  <div className="text-base font-light sm:px-4 m-1">
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
      <div className="mt-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pb-10">
        <button className="bg-third hover:bg-fourth py-2 px-4 rounded-md text-white text-xl">
          <Link to="/">Volver</Link>
        </button>
      </div>
    </div>
  );
};

export default DetallesLibro;
