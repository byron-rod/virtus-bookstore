import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Hero = ({ handleOrderPopup, books }) => {
  const [book, setBook] = useState(books[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (books && books.length > 0) {
      setBook(books[0]);
      setCurrentIndex(0);
    }
  }, [books]);

  const handleNextBook = () => {
    const nextIndex = (currentIndex + 1) % books.length;
    setCurrentIndex(nextIndex);
    setBook(books[nextIndex]);
  };

  const handlePrevBook = () => {
    const prevIndex = (currentIndex - 1 + books.length) % books.length;
    setCurrentIndex(prevIndex);
    setBook(books[prevIndex]);
  };

  if (!book) {
    return null;
  }

  return (
    <section>
      <div className="min-h-[550px] md:min-h-[550px] bg-secondary mt-24 flex flex-col md:flex-row border-8 border-solid xl:px-[8rem]">
        <div className="order-2 md:order-1">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center md:mb-8 md:ml-4 mx-6 order-2 md:order-1 p-0 sm:p-4 md:p-0 mb-6">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold lg:ml-16 p-1 -mt-5 uppercase justify-normal">
                {book.titulo}
                <p className="text-sm pt-2 mt-2 font-semibold">
                  por {book.autor}
                </p>
              </h1>
              <div className="lg:ml-16 p-1">
                <p className="text-md font-normal text-justify">
                  {book.descripcion}
                </p>
              </div>
              <div className="flex my-4">
                <Link to={`/libros/${book._id}`}>
                  <button className="btn-detalles xl:mt-10 lg:ml-16 text-white text-lg tracking-wider hover:bg-[#0511f2]">
                    Ver Detalles
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center relative order-1 md:order-2 mt-4 md:mt-8 px-4">
              <div className="flex justify-center items-center px-6 md:px-2">
                <img
                  src={book.portada}
                  onClick={handleOrderPopup}
                  alt={book.titulo}
                  className="w-[300px] h-[500px] md:p-0 mb-12 rounded-md"
                />
              </div>

              {/* Hidden on mobile */}
              <div className="hidden md:flex">
                <div className="pr-2 sm:pr-0 flex flex-col items-start lg:items-center lg:flex-col gap-4 mb-9">
                  {books.map((item, index) => (
                    <img
                      key={item.titulo}
                      src={item.portada}
                      onClick={() => {
                        setBook(item);
                        setCurrentIndex(index);
                      }}
                      alt={item.titulo}
                      className="w-[75px] h-[120px] md:mr-2 cursor-pointer hover:scale-105 rounded transition-transform duration-300 ease-in-out ml-4"
                    />
                  ))}
                </div>
              </div>

              {/* Arrows for mobile */}
              <div className="flex md:hidden justify-between items-center w-full absolute top-1/2 transform -translate-y-1/2 px-3">
                <button
                  onClick={handlePrevBook}
                  className="bg-white p-2 rounded-full shadow-lg"
                  aria-label="Previous book"
                >
                  <FaAngleLeft size={20} />
                </button>
                <button
                  onClick={handleNextBook}
                  className="bg-white p-2 rounded-full shadow-lg"
                  aria-label="Next book"
                >
                  <FaAngleRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
