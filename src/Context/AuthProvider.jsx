import React, {  useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.init";
import { AuthContext } from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";


 const googleProvider = new GoogleAuthProvider()


const AuthProvider = ({ children }) => {
  // user state
  const [user, setUser] = useState(null);
  // loading state
  const [loading, setLoading] = useState(true);

  // register
 const registerUser = (email, password)=>{
      setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  } 

  //  login
    const signInUser = (email, password)=>{
      setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
  // log out
  const logOut = () => {
     setLoading(true)
    return signOut(auth);
  };

  // update profile
    const updateUserProfile = (profile)=>{
       setLoading(true)
    return updateProfile(auth.currentUser, profile)
  }

  // forget password
  const forgetPassword = (email) => {
     setLoading(true)
    return sendPasswordResetEmail(auth, email);
  };

  // google sign in
  const googleSignIn = () => {
     setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };

  // onAuthStateChanged observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    registerUser,
    signInUser,
    googleSignIn,
    setLoading,
    user,
    setUser,
    loading,
    logOut,
    updateUserProfile,
    forgetPassword,
    googleProvider
  };

  return (<AuthContext value={authInfo}>{children}</AuthContext>);
};

export default AuthProvider;
