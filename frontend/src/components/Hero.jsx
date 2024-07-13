import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = ({ handleOrderPopup, books }) => {
  const [book, setBook] = useState(books[0]);

  useEffect(() => {
    if (books && books.length > 0) {
      setBook(books[0]);
    }
  }, [books]);

  // don't render if book is not set
  if (!book) {
    return null;
  }

  return (
    <>
      <div className="min-h-[550px] md:min-h-[550px] bg-secondary mt-24 flex flex-col md:flex-row border-8 border-solid xl:px-[8rem]">
        <div className="order-2 md:order-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center md:mb-8 md:ml-4 mx-6 order-2 md:order-1 p-4 md:p-0 mb-6">
              <h1 className="text-4xl lg:text-4x xl:text-5xl font-semibold lg:ml-16 p-4 uppercase justify-normal">
                {book.titulo}
                <p className="text-sm pt-2 mt-2 font-semibold">
                  por {book.autor}
                </p>{" "}
              </h1>
              <div className="lg:ml-16 p-4">
                <p className="text-md font-normal text-justify">
                  {book.descripcion}
                </p>
              </div>
              <div className="flex ml-4 mb-4">
                <Link to={`/libros/${book._id}`}>
                  <button className="bg-third hover:bg-fourth py-2 px-4 rounded-md xl:mt-10 lg:ml-16 text-white text-lg">
                    Ver Detalles
                  </button>
                </Link>
              </div>
            </div>
            <div className="min-h-[550px] sm:min-h-[450px] flex justify-center items-center relative order-1 md:order-2 mt-8 md:mt-8 p-3">
              <div className="h-[400px] sm:h-[550px] flex justify-center items-center">
                <img
                  src={book.portada}
                  onClick={handleOrderPopup}
                  alt={book.titulo}
                  className="w-[300px] h-[500px] md:p-0 mb-12 rounded-md"
                />
              </div>

              <div className="flex">
                <div className="flex flex-col items-start lg:items-center lg:flex-col gap-4">
                  {books.map((item) => (
                    <img
                      key={item.titulo}
                      src={item.portada}
                      onClick={() => setBook(item)}
                      alt={book.titulo}
                      className="max-w-[130px] h-[130px] md:mr-2 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ml-4"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
