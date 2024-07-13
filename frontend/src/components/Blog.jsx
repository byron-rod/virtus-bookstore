import React from "react";
import blog from "../blog";
import BlogCards from "./BlogCards";
import logo from "/assets/images/logo.webp";
import Categorias from "./Categorias";
import { useState } from "react";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredBlogs =
    selectedCategory === "Todos"
      ? blog
      : blog.filter((post) => post.category === selectedCategory);

  return (
    <div id="blog" className="bg-secondary">
      <div className="w-full h-[6rem] bg-fourth pt-3 mx-auto mb-14">
        <div className="justify-center items-center align-middle flex">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <h2 className="text-6xl uppercase text-third">Blog</h2>
        </div>
      </div>
      <div className="">
        <Categorias
          onSelectedCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="mb-12">
        <BlogCards blog={filteredBlogs} />
      </div>
    </div>
  );
};

export default Blog;
