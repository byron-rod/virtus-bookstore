import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = ({ step1, step2, step3, step4 }) => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="flex mb-4 px-4 gap-x-4 justify-center mt-8">
      <div
        className={`mt-4 ${
          path === "/login"
            ? "bg-blue-600 text-white"
            : "bg-gray-600 text-gray-300"
        } rounded-full px-4 py-1`}
      >
        {step1 ? (
          <Link to="/login" className="text-white">
            Login
          </Link>
        ) : (
          <span>Login</span>
        )}
      </div>
      <div
        className={`mt-4 ${
          path === "/carrito"
            ? "bg-blue-600 text-white"
            : "bg-gray-600 text-gray-300"
        } rounded-full px-3 py-1`}
      >
        {step2 ? (
          <Link to="/carrito" className="text-white">
            Carrito
          </Link>
        ) : (
          <span>Carrito</span>
        )}
      </div>
      <div
        className={`mt-4 ${
          path === "/resumen"
            ? "bg-blue-600 text-white"
            : "bg-gray-600 text-gray-300"
        } rounded-full px-3 py-1`}
      >
        {step3 ? (
          <Link to="/resumen" className="text-white">
            Resumen
          </Link>
        ) : (
          <span>Resumen</span>
        )}
      </div>
      <div
        className={`mt-4 ${
          path === "/pago"
            ? "bg-blue-600 text-white"
            : "bg-gray-600 text-gray-300"
        } rounded-full px-4 py-1`}
      >
        {step4 ? (
          <Link to="/pago" className="text-white">
            Pago
          </Link>
        ) : (
          <span>Pago</span>
        )}
      </div>
    </div>
  );
};

export default BreadCrumbs;
