import photo from "/assets/images/virgilio-lower.webp";

const Photo = () => {
  return (
    <div>
      <img
        src={photo}
        alt="Virgilio Cordon"
        className="flex p-3 sm:p-0 mt-3 ml-1 sm:ml-4 z-20"
        width={340}
        height={340}
      />
    </div>
  );
};

export default Photo;
