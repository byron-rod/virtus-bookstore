import { useState } from "react";
import logo from "../assets/images/logo.png";
import { useLogoutMutation, useLoginMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { FiMenu, FiShoppingCart, FiUser } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = userInfo ? true : false;

  const [logoutApiCall] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="px-10 h-24 md:px-12 lg:px-20 xl:px-32 2xl:px-64 bg-secondary fixed w-full z-50 top-0 shadow-md">
      <div className="container py-1">
        <div className="flex justify-between items-center">
          <div className="flex items-center p-2 text-lg">
            <Link to="/">
              <img src={logo} alt="logo" className="w-20 h-20" />
            </Link>
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
              {/* <HashLink to="/#cursos" className="px-4">
                Cursos
              </HashLink>
              <HashLink to="/#blog" className="px-4">
                Blog
              </HashLink> */}
            </div>
          </div>
          <div className="hidden sm:flex">
            {!isLoggedIn && (
              <Link to="/login" className="px-4">
                Ingresar
              </Link>
            )}
            {isLoggedIn && (
              <div
                className="relative cursor-pointer flex items-center gap-2"
                onClick={handleProfile}
              >
                {userInfo.nombre}
                <FiUser size={28} />
                {isProfileOpen && (
                  <div className="absolute p-4 top-10 left-0 text-md bg-secondary rounded-md shadow-bottom z-20">
                    <Link to="/profile">Perfil</Link>
                    <div className="mt-2 cursor-pointer" onClick={handleLogOut}>
                      Logout
                    </div>
                  </div>
                )}
                {isProfileOpen && userInfo.esAdmin && (
                  <div className="absolute p-4 top-10 left-0 text-md bg-secondary rounded-md shadow-bottom z-20">
                    <div>
                      <Link to="/profile">Perfil</Link>
                    </div>
                    <div className="mt-2">
                      <Link to="/admin/panel">Admin</Link>
                    </div>
                    <div className="mt-2 cursor-pointer" onClick={handleLogOut}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
            <Link to="/carrito" className="px-4 ml-2 relative">
              <FiShoppingCart size={28} className="flex flex-row" />
              {cartItems.length > 0 && (
                <div className="absolute -top-2 -right-1 bg-primary text-white rounded-full w-5 h-5 flex p-3 items-center justify-center">
                  {cartItems.length}
                </div>
              )}
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
              <HashLink
                to="/#about"
                className="block text-center py-4"
                onClick={closeMenu}
              >
                Quienes Somos
              </HashLink>
              <HashLink
                to="/#libros"
                className="block text-center py-4"
                onClick={closeMenu}
              >
                Libros
              </HashLink>
              {/* <HashLink
                to="/#cursos"
                className="block text-center py-4"
                onClick={closeMenu}
              >
                Cursos
              </HashLink>
              <HashLink
                to="/#blog"
                className="block text-center py-4 hover:divide-y-8"
                onClick={closeMenu}
              >
                Blog
              </HashLink> */}
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="text-center block py-4"
                  onClick={closeMenu}
                >
                  Ingresar
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/profile"
                  className="text-center justify-center px-4 flex py-4"
                  onClick={closeMenu}
                >
                  <FiUser size={28} className="justify-center" />
                  <p className="ml-3 text-center">Perfil</p>
                </Link>
              )}
              {isLoggedIn && userInfo.esAdmin && (
                <Link
                  to="/admin/pedidos"
                  className="text-center justify-center px-4 flex py-4"
                  onClick={closeMenu}
                >
                  <MdAdminPanelSettings size={28} className="justify-center" />
                  <p className="ml-3 text-center">Admin Panel</p>
                </Link>
              )}
              <Link
                to="/carrito"
                className="text-center justify-center px-4 flex py-4"
                onClick={closeMenu}
              >
                <FiShoppingCart size={28} className="justify-center" />
                <p className="ml-3 text-center">Carrito</p>
                {cartItems.length > 0 && (
                  <div className="bg-primary ml-3 text-white rounded-full w-5 h-5 flex p-3 items-center justify-center">
                    {cartItems.length}
                  </div>
                )}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
