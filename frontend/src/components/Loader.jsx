import { Triangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center mt-42">
      <Triangle
        height="120"
        width="120"
        color="#0511f2"
        ariaLabel="loading"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default Loader;
