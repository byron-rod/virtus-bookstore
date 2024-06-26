import React from "react";
import { cursos } from "../cursos";
import "../styles/cursos.css";

const Cursos = () => {
  return (
    <>
      <section className="online px-24 mb-12">
        <div className="container">
          <h2 className="text-2xl font-semibold mt-12">CURSOS Y SERVICIOS</h2>
          <h3 className="text-5xl font-bold mb-12">CONOCE NUESTROS</h3>
          <div className="content grid grid-cols-1 md-grid-cols-2 lg:grid-cols-3">
            {cursos.map((val) => (
              <div className="box">
                <div className="img">
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt="" className="show" />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Cursos;
