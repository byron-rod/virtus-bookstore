import { useState } from "react";
import quote from "../assets/images/quote-left.svg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Pastor Cash Luna",
      title: "Fundador Casa de Dios",
      libro: "Hasta Que La Muerte Nos Separe",
      desc: "El matrimonio es un hermoso reto, una decisión, un compromiso con Dios, con la pareja y con la familia que se inicia. Virgilio deja muy claro que la felicidad y la plenitud en la relación de pareja son posibles cuando abrimos los ojos y el corazón a las necesidades, inquietudes, anhelos, miedos y sueños de la persona con quien emprendimos la aventura de compartir la vida, hasta que la muerte nos separe. Un libro imprescindible para descubrir nuestro potencial y capacidad de amar.",
      img: "/images/male.webp",
    },
    {
      id: 2,
      name: "Lucrecia de Orive",
      title: "Directora Ejecutiva",
      libro: "Hasta Que La Muerte Nos Separe",
      desc: "Este libro es un curso de coaching matrimonial que refleja que el matrimonio es una decisión para toda la vida. Con un contenido amplio y muy bueno, Virgilio cubre el espacio entre la teoría sobre la vida en pareja y la práctica dentro del matrimonio, enfocándose en mostrarnos cómo desarrollar comportamientos concretos que nos permitan tener una mejor relación",
      img: "/images/female.webp",
    },
    {
      id: 3,
      name: "Andres Sedano Postigo",
      title: "CEO",
      libro: "Coach Corner",
      desc: "Virgilio nos muestra su tenacidad, su gran capacidad de innovar y su enorme generosidad al crear un libro con características de manual práctico de consultas en un área tan complicada y amplia como la alta dirección. He tenido la suerte de presidir una Junta Directiva por más de 5 años, recibiendo la ayuda de Virgilio como Coach Ejecutivo. Esta experiencia positiva me permite asegurar que su nuevo libro será una gran ayuda para todas las personas que se dediquen a la dirección de cualquier organización",
      img: "/images/male.webp",
    },
  ];

  const [current, setCurrent] = useState(0);

  const previous = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };

  const next = () => {
    setCurrent(current === testimonials.length - 1 ? 0 : current + 1);
  };

  return (
    <section className="flex bg-fourth items-center sm:px-4 md:px-32 2xl:px-52 overflow-y-hidden">
      <div className="w-full py-4">
        {testimonials.map(
          (testimonial, index) =>
            index === current && (
              <div key={testimonial.id} className="p-4 mt-10 mb-4">
                <div className="flex items-center pb-[28px] relative">
                  <img
                    src={quote}
                    alt="quote"
                    className="w-8 h-8 sm:w-14 sm:h-14 relative bottom-[3rem] mr-4"
                  />
                  <p className="md:text-sm text-xs font-medium sm:font-semibold text-gray-200 text-justify tracking-widest pr-3">
                    {testimonial.desc}
                  </p>
                </div>
                <div className="flex items-center mb-8">
                  <div className="flex gap-4 items-center mx-4">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="rounded-full w-[80px] h-[80px] md:w-[80px] md:h-[80px]"
                    />
                  </div>
                  <div>
                    <p className="text-third text-lg font-bold tracking-widest">
                      {testimonial.name}
                    </p>
                    <p className="text-white text-xs tracking-widest">
                      {testimonial.title}
                    </p>
                    <p className="text-white text-xs tracking-widest">
                      {testimonial.libro}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center cursor-pointer gap-x-8">
                  <FaAngleLeft size={38} onClick={previous} />
                  <FaAngleRight size={38} onClick={next} />
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default Testimonials;
