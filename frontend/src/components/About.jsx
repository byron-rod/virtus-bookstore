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
    delaySpeed: 2000,
  });
  return (
    <section className="py-12 xl:py-32 xl:pt-16 xl:px-[1rem] 2xl:px-[8rem]">
      <Socials />
      <div className="mt-4 md:mt-10">
        <div className="flex flex-col md:flex-row justify-center gap-x-4">
          <div className="xl:flex relative order-1 mt-6 sm:px-12 photo-container md:w-1/2 px-4">
            <div className="bg-photo_shape w-[550px] h-[550px] bg-no-repeat flex xl:absolute -top-16">
              <div className="relative left-14 top-10">
                <Photo />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center xl:mx-0 px-12 md:px-16 md:ml-16 order-2 -mt-16 sm:mt-16">
            <h1 className="about">Virgilio Cordon PhD.</h1>
            <h3 className="typewriter mt-2" style={{ minHeight: "1.4em" }}>
              {text}
            </h3>
            <div>
              <p className="subtitle mt-4 max-w-[550px] mx-auto xl:mx-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex my-8 items-center">
                <Link to="/services" className="button">
                  <button className="bg-third hover:bg-fourth py-2 px-4 rounded-md text-white">
                    Mas informacion
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
