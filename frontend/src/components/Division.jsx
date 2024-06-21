import logo from "../assets/images/logo.png";

const Division = () => {
  return (
    <div className="w-full h-[6rem] bg-fourth pt-3 mx-auto">
      <div className="justify-center items-center align-middle flex ">
        <img src={logo} alt="logo" className="w-20 h-20" />
        <h2 className="text-6xl uppercase text-third">Libros</h2>
      </div>
    </div>
  );
};

export default Division;
