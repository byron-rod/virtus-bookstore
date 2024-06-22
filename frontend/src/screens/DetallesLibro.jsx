import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import books from "../books";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import BookImages from "../components/BookImages";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";

const DetallesLibro = () => {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/books/${bookId}`
        );
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      }
    };
    fetchBookDetails();
  }, [bookId]); // Dependency array includes bookId to refetch if it changes

  if (!book) {
    return <div>Loading...</div>; // Or any other loading state representation
  }

  return (
    <div className="px-4 mt-36">
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
            <p className="text-xl font-bold mt-4">Precio: {book.precio}</p>
            <Rating value={book.rating} text={`${book.numReviews} reviews`} />
          </div>
          <div>
            <p>{book.descripcion}</p>
            <button className="btn-comprar hover:bg-blue-700 py-2 px-4 rounded-md text-white flex items-center gap-2 mt-6">
              <FiShoppingCart size={28} />
              Comprar
            </button>
          </div>
          <div className="w-full border-b-4"></div>
          <div className="">
            <div className="meta-data flex">
              <div className="text-base font-light sm:px-4 m-1">
                <p>ISBN: {book.ISBN}</p>
                <p>Editorial: {book.editorial}</p>
                <p>Idioma: {book.idioma}</p>
              </div>
              <div className="text-base font-light sm:px-4 m-1">
                <p>Fecha de publicación: {book.fecha_publicacion}</p>
                <p>Formato: {book.formato}</p>
                <p>Número de páginas: {book.paginas}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
