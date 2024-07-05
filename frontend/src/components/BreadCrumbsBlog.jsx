import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "../styles/blog.css";

const BreadCrumbsBlog = ({ data }) => {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {data.map((item, index) => (
        <div
          key={index}
          className="text-black opacity-50 text-xs flex items-center"
        >
          {item.link.startsWith("/#") ? (
            <HashLink
              to={item.link}
              className="text-gray-400 truncate max-w-[250px] inline-block"
              title={item.name}
            >
              {item.name}
            </HashLink>
          ) : (
            <Link
              to={item.link}
              className="text-gray-400 truncate max-w-[250px] inline-block"
              title={item.name}
            >
              {item.name}
            </Link>
          )}
          {index < data.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbsBlog;
