import { onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import store from "../store";
import { handleAuthStateChanged } from "../slices/authSlice";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // Extract necessary information from the user object
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    // Dispatch the action with userData as the payload
    store.dispatch(handleAuthStateChanged(userData));
    console.log("User logged in:", userData);
  } else {
    console.log("User logged out");
  }
});
