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
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import Carrito from "./screens/Carrito.jsx";
import UserProfile from "./screens/UserProfile.jsx";
import Checkout from "./screens/Checkout.jsx";
import PreCheckOut from "./screens/PreCheckOut.jsx";
import TerminosCondiciones from "./screens/TerminosCondiciones.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import PedidoScreen from "./screens/PedidoScreen.jsx";
import Panel from "./screens/Admin/Panel.jsx";
import EditarUsuario from "./screens/Admin/EditarUsuario.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/libros/:id" element={<DetallesLibro />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/terminos-privacidad" element={<TerminosCondiciones />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/resumen" element={<PreCheckOut />} />
        <Route path="/pago" element={<Checkout />} />
        <Route path="/pedido/:id" element={<PedidoScreen />} />
        <Route path="/profile" element={<UserProfile />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/panel" element={<Panel />} />
        <Route path="/admin/usuario/:id/editar" element={<EditarUsuario />} />
      </Route>
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
