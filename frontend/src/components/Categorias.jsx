import React from "react";

const Categorias = ({ onSelectedCategory, selectedCategory }) => {
  const categories = [
    "Todos",
    "Psicologia",
    "Management",
    "Coaching",
    "Entrepreneurship",
  ];
  return (
    <div className="px-4 mb-8 lg:space-x-16 flex flex-wrap justify-center items-center border-b-2 py-5 text-gray-900 font-semibold">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectedCategory(category)}
          className={`mr-2 space-x-16 ${
            selectedCategory === category
              ? "text-blue-500 underline"
              : "text-black"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categorias;
