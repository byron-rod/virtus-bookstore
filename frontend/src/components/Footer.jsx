import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white px-8 lg:px-32 h-min-[400px]">
      <div className="grid grid-cols-1 md:grid-cols-3 border-b">
        <div className="flex flex-col text-black p-4">
          <img src={logo} alt="logo" className="w-32 h-32" />
          <h1 className="text-black text-2xl font-semibold">Virgilio Cordon</h1>
          <p>
            Viva una vida más saludable, más rica, más satisfactoria, apasionada
            y con un propósito, ya sea que eso signifique triunfar en los
            negocios, reavivar su relación o descubrir quién es realmente.
          </p>
        </div>
        <div className="text-black capitalize p-4 md:p-16 gap-y-6 flex flex-col">
          <div className="flex gap-14 md:gap-8 text-2xl">
            <Link to="www.facebook.com">
              <FaFacebookF />
            </Link>
            <Link to="www.twitter.com">
              <FaTwitter />
            </Link>
            <Link to="www.instagram.com">
              <FaInstagram />
            </Link>
            <Link to="www.linkedin.com">
              <FaLinkedinIn />
            </Link>
            <Link to="www.tiktok.com">
              <FaTiktok />
            </Link>
          </div>
          <p>Virtus Institue</p>
          <p>Life coaching</p>
          <p>Cursos</p>
          <p>Blog</p>
        </div>
        <div className="text-black capitalize p-4 md:p-16 gap-y-6 flex flex-col">
          <h2 className="text-2xl font-semibold">Libros</h2>
          <Link>Coach Corner</Link>
          <Link>Hasta que la muerte nos separe</Link>
          <Link>
            Despierta! tienes la grandeza para una vida extraordinaria
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 text-center pt-2 text-gray-600 text-sm pb-8 items-center">
        <span>© 2024 Virtus Institute. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
