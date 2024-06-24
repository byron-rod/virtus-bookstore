// frontend/src/screens/LoginScreen.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../slices/authSlice";
import "../styles/loginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="login-screen">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
          {status === "loading" ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error">{error}</p>}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Login with Google"}
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;