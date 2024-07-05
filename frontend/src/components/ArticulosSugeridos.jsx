import React from "react";
import { Link } from "react-router-dom";
import blog from "../blog";

const ArticulosSugeridos = ({ currentPostId }) => {
  const suggestedArticles = blog
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  return (
    <div className="mt-32 mb-12 border-t-2">
      <h2 className="text-2xl font-bold mb-4 mt-12">Artículos Sugeridos</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {suggestedArticles.map((post) => (
          <div key={post.id} className="p-5 shadow-lg rounded">
            <div className="overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full transition-transform duration-300 hover:scale-110 rounded-lg"
              />
            </div>
            <Link to={`/blog/${post.id}`}>
              <h3 className="mt-4 mb-2 font-bold hover:text-blue-700 cursor-pointer">
                {post.title}
              </h3>
            </Link>
            <p className="mb-2 text-gray-600">{post.author}</p>
            <p className="text-sm text-gray-600">
              Publicado: {post.published_date}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Tiempo de lectura: {post.reading_time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticulosSugeridos;
