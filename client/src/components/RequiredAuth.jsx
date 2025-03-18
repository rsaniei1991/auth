/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RequiredAuth({ children }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  if (!auth.isLoggedIn) {
    //if the user is not logged in
    return <Navigate to="/login" />;
    // navigate('/login')
  }
  return <div>{children}</div>;
}
