// frontend/src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

// Utility function to extract user information
const extractUserInfo = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, nombre }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // Save user to MongoDB
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        email: user.email,
        password,
        nombre,
      }
    );
    return extractUserInfo(response.data); // Extract necessary user info
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return extractUserInfo(userCredential.user); // Extract necessary user info
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const token = await userCredential.user.getIdToken(); // Get ID token
    // Send token to backend for verification
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      token,
    });
    return extractUserInfo(response.data); // Assuming backend returns user info
  }
);

export const handleAuthStateChanged = createAsyncThunk(
  "auth/handleAuthStateChanged",
  async (user, { dispatch }) => {
    if (user) {
      // Assuming you have a method to extract user info
      return user;
    } else {
      // Handle the case where the user is logged out if necessary
      return null;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
