import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="rating flex items-center">
      <span>
        {value >= 1 ? (
          <FaStar className="star" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="star" />
        ) : (
          <FaRegStar className="text-primary" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar className="star" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="star" />
        ) : (
          <FaRegStar className="text-primary" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar className="star" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="star" />
        ) : (
          <FaRegStar className="text-primary" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar className="star" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="star" />
        ) : (
          <FaRegStar className="text-primary" />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar className="star" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="star" />
        ) : (
          <FaRegStar className="text-primary" />
        )}
      </span>
      <span className="rating-text ml-2">{text && text}</span>
    </div>
  );
};

export default Rating;
