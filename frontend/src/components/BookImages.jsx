import { useState } from "react";

const BookImages = ({ book }) => {
  const smallerImages = [book.portada, book.texto, book.contra, book.ejemplo];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mainImage, setMainImage] = useState(book.portada);

  // Adjusted handleImageClick for cycling through smaller images
  const handleImageClick = (index) => {
    setMainImage(smallerImages[index]);
  };

  return (
    <div className="lg:flex">
      {/* Big image */}
      <div className="h-[425px] w-[275px] lg:h-[475px] lg:w-[320px] relative mx-auto">
        <img
          src={mainImage}
          alt={book.titulo}
          className="h-full w-full rounded-md"
        />
      </div>
      {/* Smaller images */}
      <div className="flex gap-4 lg:gap-2 mt-4 lg:mt-0 justify-center cursor-pointer lg:flex-col">
        {smallerImages.map((image, index) => (
          <div
            key={index}
            className="h-[145px] w-[80px] lg:h-[110px] lg:w-[75px] xl:-ml-10"
            onClick={() => handleImageClick(index)}
          >
            <img
              src={image}
              alt={book.titulo}
              className="h-full w-full rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookImages;
