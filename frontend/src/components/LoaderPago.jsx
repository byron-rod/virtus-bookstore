import { Triangle } from "react-loader-spinner";
import Message from "./Message";

const LoaderPago = () => {
  return (
    <div className="flex flex-col justify-center mt-6">
      <div className="flex justify-center">
        <Message type="info">
          <p>Procesando tu pago...</p>
        </Message>
      </div>
      <div className="flex justify-center">
        <Triangle
          height="90"
          width="90"
          color="#0511f2"
          ariaLabel="loading"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
};

export default LoaderPago;
