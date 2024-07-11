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
      desc: "El matrimonio es un hermoso reto, una decision, un compromiso con Dios, con la pareja y con la familia que se inicia. Virgilio deja muy claro que la felicidad y la plenitud en la relacion de pareja son posibles cuando abrimos los ojos y el corazon a las necesidades, inquiteudes, anhelos, miedos y suenos de la persona con quien emprendimos la aventura de compartir la vida, hasta que la muerte nos separe. Un libro imprescindible para descubrir nuestro potencial y capacidad de amar.",
      img: "/images/male.jpg",
    },
    {
      id: 2,
      name: "Lucrecia de Orive",
      title: "Directora Ejecutiva",
      libro: "Hasta Que La Muerte Nos Separe",
      desc: "Este libro es un curso de coaching matrimonial, que refleja que el maro es una decision para toda la vida. Con un contenido amplio y muy bueno, Virgilio cubre el espacio entre la teoria sobre la vida en pareja y la practica dentro del matrimonio, enfocandose en mostrarnos como desarrolar comportamientos concretos que nos permitan una mejor relacion",
      img: "/images/female.jpg",
    },
    {
      id: 3,
      name: "Andres Sedano Postigo",
      title: "CEO",
      libro: "Coach Corner",
      desc: "Virgilio nos muestra su tenacidad, su gran capacidad de innovar y su enorme generosidad, creando un libro con caractristicas de manuel practico de consultas en un area tan complicada y amplia como la alta direccion. He tenido la suerte de presidir una Junta Directiva por mas de 5 anos, recibiendo la ayuda de Virgilio como Coach Ejecutivo. Esta expreriencia positiva me permite asegurar que su nuevo libro sera una gran ayuda a todas las personas que se dediquen a la dirrecion de cualquier organizacion.",
      img: "/images/male.jpg",
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
    <section className="flex h-[70vh] md:h-[80vh] my-auto bg-fourth items-center px-2 md:px-64 overflow-y-hidden">
      <div>
        {testimonials.map(
          (testimonial, index) =>
            index === current && (
              <div key={testimonial.id} className="p-4 mt-12 mb-12">
                <div className="flex items-center pb-[30px] relative">
                  <img
                    src={quote}
                    alt="quote"
                    className="w-14 h-14 relative bottom-[4rem] mr-4"
                  />
                  <p className="md:text-xl text-sm font-semibold text-gray-200 text-justify">
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
                    <h4 className="text-black text-lg font-bold">
                      {testimonial.name}
                    </h4>
                    <p className="text-white text-xs">{testimonial.title}</p>
                    <p className="text-white text-sm">{testimonial.libro}</p>
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
