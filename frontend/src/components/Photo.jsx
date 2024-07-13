import photo from "/assets/images/virgilio-lower.webp";

const Photo = () => {
  return (
    <div>
      <img
        src={photo}
        alt="Virgilio Cordon"
        className="w-[340px] h-[340px] flex top-20 z-20"
      />
    </div>
  );
};

export default Photo;
