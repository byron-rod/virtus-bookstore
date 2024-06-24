import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import HomeScreen from "./screens/HomeScreen.jsx";
import DetallesLibro from "./screens/DetallesLibro.jsx";
import Libros from "./screens/Libros.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import Carrito from "./screens/Carrito.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/libros" element={<Libros />} />
      <Route path="/libros/:id" element={<DetallesLibro />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/login" element={<LoginScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
