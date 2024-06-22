import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import BookList from "../components/BookList";
import axios from "axios";

const HomeScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Specify the base URL if your backend server is running on a different origin
        const { data } = await axios.get("http://localhost:5000/api/books");
        setBooks(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="w-full overflow-auto">
      <section>
        <Hero books={books} />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="booklist">
        <BookList books={books} />
      </section>
    </div>
  );
};

export default HomeScreen;
