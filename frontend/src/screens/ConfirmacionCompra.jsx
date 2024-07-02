import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ConfirmacionCompra = () => {
  const [estadoPago, setEstadoPago] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Obtén el paymentId desde el estado de Redux
  const paymentId = useSelector((state) => state.cart.paymentId);

  const fetchEstadoPago = async (checkoutId) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "X-PUBLIC-KEY",
      import.meta.env.VITE_RECURRENTE_PUBLIC_KEY
    );
    myHeaders.append(
      "X-SECRET-KEY",
      import.meta.env.VITE_RECURRENTE_PRIVATE_KEY
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://app.recurrente.com/api/checkouts/${checkoutId}`,
        requestOptions
      );
      const data = await response.json();
      setEstadoPago(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paymentId) {
      fetchEstadoPago(paymentId);
    } else {
      setLoading(false);
    }
  }, [paymentId]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8 mt-12">
      <h1 className="text-3xl font-bold text-center">Confirmación de Compra</h1>
      {estadoPago ? (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <h2 className="text-xl font-semibold mb-4">Estado del Pago</h2>
            <p>
              <strong>ID:</strong> {estadoPago.id}
            </p>
            <p>
              <strong>Estado:</strong> {estadoPago.status}
            </p>
            {/* Puedes agregar más detalles del pago aquí */}
          </div>
        </div>
      ) : (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
            <p>No se pudo obtener el estado del pago.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmacionCompra;
