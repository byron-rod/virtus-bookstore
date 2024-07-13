import React from "react";
import { Link } from "react-router-dom";
import { useTypewriter } from "react-simple-typewriter";
import Socials from "./Socials";
import Photo from "./Photo";

const About = () => {
  const [text] = useTypewriter({
    words: [
      "Coach Estrategico",
      "Conferencista",
      "Escritor",
      "Profesor",
      "Terapeuta",
    ],
    loop: true,
    delaySpeed: 1000,
  });
  return (
    <section className="py-12 xl:py-32 xl:pt-16 xl:px-[1rem] 2xl:px-[8rem]">
      <Socials />
      <div className="mt-4 md:mt-10">
        <div className="flex flex-col md:flex-row justify-center gap-x-4">
          <div className="xl:flex relative order-1 mt-6 sm:px-12 photo-container md:w-1/2 px-4">
            <div className="bg-photo_shape w-[550px] h-[550px] bg-no-repeat flex xl:absolute -top-16">
              <div className="relative left-[2.2rem] md:left-14 top-12">
                <Photo />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center xl:mx-0 px-12 md:px-16 md:ml-16 order-2 -mt-16 sm:mt-16">
            <h1 className="about">Virgilio Cordon PhD.</h1>
            <h2 className="typewriter mt-2" style={{ minHeight: "1.4em" }}>
              {text}
            </h2>
            <div>
              <p className="lg:text-md mt-4 max-w-[550px] mx-auto xl:mx-0 text-justify">
                El Dr. Virgilio A. Cordón es un profesional multifacético con
                una sólida formación en economía y administración de empresas,
                respaldada por una maestría en liderazgo y otra en negocios, así
                como un doctorado en salud mental y dinámica humana.
              </p>
              <div className="flex my-8 items-center">
                <Link
                  to="https://virtusinstitute.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button"
                >
                  <button className="bg-third hover:bg-fourth py-2 px-4 rounded-md text-white text-lg">
                    Virtus Institute
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
