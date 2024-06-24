// frontend/src/screens/RegisterScreen.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, loginWithGoogle } from "../slices/authSlice";
import "../styles/registerScreen.css";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password, nombre }));
  };

  const handleGoogleRegister = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="register-screen">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Registering..." : "Register"}
        </button>
        {error && <p className="error">{error}</p>}
        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Registering..." : "Register with Google"}
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;
