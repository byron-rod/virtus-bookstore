import {
  RiYoutubeFill,
  RiLinkedinFill,
  RiFacebookFill,
  RiTiktokFill,
  RiInstagramFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const icons = [
  {
    id: 1,
    icon: <RiYoutubeFill className="socials" color="rgba(39, 50, 115, 1" />,
    url: "https://www.youtube.com/channel/UCo4ulI6-qOYE0fNCtwTKZsg",
  },
  {
    id: 2,
    icon: <RiLinkedinFill className="socials" color="rgba(39, 50, 115, 1" />,
    url: "https://www.linkedin.com/in/virgilio-cordon-07093147/",
  },
  {
    id: 3,
    icon: <RiFacebookFill className="socials" color="rgba(39, 50, 115, 1" />,
    url: "https://www.facebook.com/virtusinstitute",
  },
  {
    id: 4,
    icon: <RiTiktokFill className="socials" color="rgba(39, 50, 115, 1" />,
    url: "https://www.tiktok.com/@virgiliocordon",
  },
  {
    id: 5,
    icon: <RiInstagramFill className="socials" color="rgba(39, 50, 115, 1" />,
    url: "https://www.instagram.com/cordonvirgilio/",
  },
];

function Socials() {
  return (
    <div>
      <div className="flex justify-center items-center md:gap-24 gap-10 sm:gap-14 p-1">
        {icons.map((item) => (
          <Link
            className="socials text-[40px] transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-125"
            key={item.id}
            to={item.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Links to social media websites"
          >
            {item.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Socials;
