import Hero from "../components/Hero";
import About from "../components/About";
import BookList from "../components/BookList";
import { useGetBooksQuery } from "../slices/booksApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Testimonials from "../components/Testimonials";

const HomeScreen = () => {
  const { data: books, isLoading, error } = useGetBooksQuery();

  return (
    <div className="w-full overflow-x-hidden bg-secondary">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="min-h-screen flex items-center justify-center">
          <Message type="warning">
            {error?.data?.message ||
              error?.error ||
              "An unknown error occurred"}
          </Message>
        </div>
      ) : (
        <>
          <section>
            <Hero books={books} />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="booklist">
            <BookList books={books} />
          </section>
          <section>
            <Testimonials />
          </section>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
