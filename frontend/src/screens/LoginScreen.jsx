import React from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

// Login screen with Firebase authentication

const LoginScreen = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();
      console.log(token);

      // Corrected Axios POST request
      const response = await axios.post(
        "http://localhost:5000/api/auth",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data; // Corrected response handling
      console.log("User data:", userData);
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
    }
  };

  return (
    <div className="mt-40">
      <h1>Login</h1>
      <button className="" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginScreen;
