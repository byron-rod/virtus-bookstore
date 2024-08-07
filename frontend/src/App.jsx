import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import scrollTop from "./utils/scrollTop";

function App() {
  scrollTop();
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <section className="overflow-x-hidden ">
        <Footer />
      </section>
      <ToastContainer />
    </>
  );
}

export default App;
