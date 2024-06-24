import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Subscribe from "./components/Subscribe";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <section>
        <Subscribe />
      </section>
      <Footer />
    </>
  );
}

export default App;
