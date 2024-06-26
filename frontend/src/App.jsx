import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Subscribe from "./components/Subscribe";
import scrollTop from "./utils/scrollTop";

function App() {
  scrollTop();
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <section>
        <Subscribe />
      </section>
      <section className="overflow-x-hidden">
        <Footer />
      </section>
      <ToastContainer />
    </>
  );
}

export default App;
