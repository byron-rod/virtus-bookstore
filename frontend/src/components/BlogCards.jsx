import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const BlogCards = ({ blog }) => {
  const filteredBlog = blog;
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 px-8 md:px-32 mb-[6rem]">
      {filteredBlog.map((blog) => (
        <div key={blog.id} className="p-5 shadow-lg rounded">
          <div className="overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full transition-transform duration-300 hover:scale-110 rounded-lg"
            />
          </div>
          <Link to={blog.link} target="_blank" rel="noopener noreferrer">
            <h3 className="mt-4 mb-2 font-bold hover:text-blue-700 cursor-pointer">
              {blog.title}
            </h3>
          </Link>
          <p className="mb-2 text-gray-600">
            <FaUser className="inline-flex items-center mr-2" />
            {blog.author}
          </p>
          <div className="">
            <p className="text-sm text-gray-600">
              Publicado: {blog.published_date}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Tiempo de lectura: {blog.reading_time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCards;
