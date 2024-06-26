import React from "react";

const Habilidades = () => {
  return (
    <div>
      <div>
        {/* create for cards with */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 px-8 md:px-32 mb-20">
          <div className="p-5 shadow-lg rounded">
            <div className="">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full transition-transform duration-300 hover:scale-110 rounded-lg"
              />
            </div>
            <Link to="#">
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
        </div>
      </div>
    </div>
  );
};

export default Habilidades;
