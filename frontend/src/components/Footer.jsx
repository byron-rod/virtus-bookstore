import React from "react";
import logo from "/assets/images/logo.webp";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaYoutube,
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
          <p className="footer-text mt-4 text-justify">
            Viva una vida más saludable, más rica, más satisfactoria, apasionada
            y con un propósito, ya sea que eso signifique triunfar en los
            negocios, reavivar su relación o descubrir quién es realmente.
          </p>
        </div>
        <div className="text-black p-4 md:p-16 gap-y-6 flex flex-col">
          <div className="flex gap-14 md:gap-8 text-2xl cursor-pointer">
            <Link
              to="https://www.facebook.com/virtusinstitute"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Facebook page"
            >
              <FaFacebookF className="hover:text-blue-600 transition-transform duration-300 hover:scale-110" />
            </Link>
            <Link
              to="https://www.youtube.com/channel/UCo4ulI6-qOYE0fNCtwTKZsg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Youtube channel"
            >
              <FaYoutube className="hover:text-blue-600 transition-transform duration-300 hover:scale-110" />
            </Link>
            <Link
              to="https://www.instagram.com/cordonvirgilio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Instagram profile"
            >
              <FaInstagram className="hover:text-blue-600 transition-transform duration-300 hover:scale-110" />
            </Link>
            <Link
              to="https://www.linkedin.com/in/virgilio-cordon-07093147"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Linkedin profile"
            >
              <FaLinkedinIn className="hover:text-blue-600 transition-transform duration-300 hover:scale-110" />
            </Link>
            <Link
              to="https://www.tiktok.com/@virgiliocordon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Link to Tiktok profile"
            >
              <FaTiktok className="hover:text-blue-600 transition-transform duration-300 hover:scale-110" />
            </Link>
          </div>
          <Link
            to="https://virtusinstitute.com/"
            className="tracking-wide hover:text-blue-600 cursor-pointer"
            aria-label="Link para Virtus Institute"
            target="_blank"
            rel="noopener noreferrer"
          >
            Virtus Institue
          </Link>
          <Link
            to="https://ufm.academia.edu/VirgilioCordon"
            aria-label="Link Aritculos en UFMAcademia"
            className="hover:text-blue-600 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            Articulos
          </Link>
          <div className="hover:text-blue-600">Contacto: (+502) 2388 5100</div>
          <div className="hover:text-blue-600">info@virtusinstitute.com</div>
        </div>
        <div className="text-black capitalize p-4 md:p-16 gap-y-6 flex flex-col">
          <h2 className="text-2xl font-semibold ">Libros</h2>
          <Link
            to="/libros/despierta"
            aria-label="Link to book Despierta! tienes la grandeza para una vida extraordinaria"
            className="hover:text-blue-600 cursor-pointer"
          >
            Despierta! tienes la grandeza para una vida extraordinaria
          </Link>

          <Link
            to="/libros/hasta-que-la-muerte-nos-separe"
            aria-label="Link to book Hasta que la muerte nos separe"
            className="hover:text-blue-600 cursor-pointer"
          >
            Hasta que la muerte nos separe
          </Link>
          <Link
            to="/libros/coach-corner"
            aria-label="Link to book Coach Corner"
            className="hover:text-blue-600 cursor-pointer"
          >
            Coach Corner
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 text-center pt-2 text-gray-600 text-sm pb-8 items-center">
        <span>© 2024 Virtus Institute. Todos los Derechos Reservados.</span>
        <Link to="/terminos-privacidad">
          <span>Política de Privacidad</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
