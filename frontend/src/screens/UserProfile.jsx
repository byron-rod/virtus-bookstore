import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserStatus = () => {
  // Access the user state from authSlice
  const user = useSelector((state) => state.auth.user);
  const authState = useSelector((state) => state.auth);

  console.log("Logged in user info:", user);
  console.log("Auth state:", authState);

  // Check if user is null
  if (!user) {
    // Optionally, render a loading message or redirect
    return <div className="mt-32">Loading user data...</div>;
  }

  return (
    <div className="mt-32">
      <h1>Welcome, {user.displayName || user.email}!</h1>
      {user.photoURL && (
        <img src={user.photoURL} alt="User Avatar" className="rounded-full" />
      )}
      {/* Add other user information as needed */}
    </div>
  );
};

export default UserStatus;
