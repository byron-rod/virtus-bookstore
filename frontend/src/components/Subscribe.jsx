import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-fourth md:flex md:justify-between md:items-center sm:px-12 py-12 h-[250px] px-8 lg:px-32">
      <h1
        className="lg:text-4xl text-3xl text-white md:mb-0 mb-6 lg:leading-normal font-semibold
         md:w-2/5"
      >
        <span className="text-teal-400">Subscribete</span> a nuestro blog
      </h1>
      <div>
        <input
          type="text"
          placeholder="Ingresa tu correo"
          className="text-gray-800
           sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
        />
        <button
          className="btn-comprar duration-300 px-5 py-2.5 font-[Poppins]
           rounded-md text-white md:w-auto w-full"
        >
          Subscribrise
        </button>
      </div>
    </div>
  );
};

export default Subscribe;
