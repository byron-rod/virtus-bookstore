import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isLoggedIn = true;

  const closeMenu = () => {
    setOpen(false);
  };

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="h-30 px-10 md:px-12 lg:px-20 xl:px-32 2xl:px-64 bg-secondary fixed w-full z-50 top-0 shadow-md">
      <div className="container py-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center p-2">
            <img src={logo} alt="logo" className="w-20 h-20" />
            <div className="hidden sm:hidden md:flex">
              <Link to="/" className="px-4">
                Inicio
              </Link>
              <HashLink to="/#about" className="px-4">
                Quienes Somos
              </HashLink>
              <HashLink to="/#booklist" className="px-4">
                Libros
              </HashLink>
              <Link to="/" className="px-4">
                Cursos
              </Link>
              <Link to="/" className="px-4">
                Blog
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex">
            {!isLoggedIn && (
              <Link to="/login" className="px-4">
                Ingresar
              </Link>
            )}
            {isLoggedIn && (
              <div className="relative">
                <FiUser size={28} onClick={handleProfile} />
                {isProfileOpen && (
                  <div className="absolute p-4 top-10 left-0 text-md bg-secondary rounded-md shadow-bottom z-20">
                    <Link to="/profile">Perfil</Link>
                    <div className="mt-2 cursor-pointer">Logout</div>
                  </div>
                )}
              </div>
            )}
            <Link to="/cart" className="px-4 ml-2">
              <FiShoppingCart size={28} className="flex flex-row" />
            </Link>
          </div>
          <FiMenu
            size={42}
            color="black"
            className="sm:hidden flex cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="grid grid-cols-1 divide-y-2 hover:divide-y-4 items-center justify-center w-full bg-secondary absolute top-20 right-0 z-10 sm:hidden">
              <Link
                to="/"
                className="block text-center py-4"
                onClick={closeMenu}
              >
                Inicio
              </Link>
              <Link
                to="/"
                className="block text-center py-4"
                onClick={closeMenu}
              >
                Sobre Nosotros
              </Link>
              <Link
                to="/libros"
                className="block text-center py-4"
                onClick={closeMenu}
              >
                Libros
              </Link>
              <Link
                to="/"
                className="block text-center py-4"
                onClick={closeMenu}
              >
                Cursos
              </Link>
              <Link
                to="/"
                className="block text-center py-4 hover:divide-y-8"
                onClick={closeMenu}
              >
                Blog
              </Link>
              {!isLoggedIn && (
                <Link to="/login" className="py-4" onClick={closeMenu}>
                  Ingresar
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="text-center justify-center px-4 flex py-4"
                >
                  <FiUser size={28} className="justify-center" />
                  <p className="ml-3 text-center">Perfil</p>
                </Link>
              )}
              <Link
                to="/cart"
                className="text-center justify-center px-4 flex py-4"
                onClick={closeMenu}
              >
                <FiShoppingCart size={28} className="justify-center" />
                <p className="ml-3 text-center">Carrito</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
