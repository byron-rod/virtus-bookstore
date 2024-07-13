import photo from "/assets/images/virgilio.webp";

const Photo = () => {
  return (
    <div>
      <img
        src={photo}
        alt="Virgilio Cordon"
        className="w-[350px] h-[380px] sm:w-[340px] sm:h-[370px] flex top-20 left-40 z-20"
      />
    </div>
  );
};

export default Photo;
