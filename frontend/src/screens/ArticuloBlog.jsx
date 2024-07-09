import React from "react";
import { useParams } from "react-router-dom";
import BreadCrumbsBlog from "../components/BreadCrumbsBlog";
import blog from "../blog";
import ArticulosSugeridos from "../components/ArticulosSugeridos";

const ArticuloBlog = () => {
  const { id } = useParams();
  const post = blog.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>Blog no encontrado</div>;
  }

  const breadCrumbsData = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Blog",
      link: "/#blog",
    },
    {
      name: post.title,
      link: `/blog/${post.id}`,
    },
  ];

  return (
    <section className="mt-32 mx-auto container max-w-5xl flex flex-col px-4 py-5">
      <article className="flex-1">
        <BreadCrumbsBlog data={breadCrumbsData} />
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center">{post.title}</h1>
          <p className="text-gray-400 mt-4">
            {post.reading_time} de lectura - {post.published_date}
          </p>
        </div>
        <div className="mt-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <p className="text-gray-400 mt-4">Categoria: {post.category}</p>
        <div className="mt-8">
          <div
            className="text-lg text-gray-500"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </div>
      </article>
      <ArticulosSugeridos currentPostId={post.id} />
    </section>
  );
};

export default ArticuloBlog;
