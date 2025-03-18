/* eslint-disable no-unused-vars */
import "./App.css";
import { useState } from "react";
import Login from "./components/Login.jsx";
import { Route, Routes } from "react-router-dom";
import PrivateData from "./components/PrivateData.jsx";
import HomePage from "./components/HomePage.jsx";
import NavBar from "./components/NavBar.jsx";
import AuthContext from "./context/AuthContext.js";
import RequiredAuth from "./components/RequiredAuth.jsx";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  async function login(credentials) {
    console.log("login function in App.jsx");

    try {
      const { data } = await axios("/api/auth/login", {
        method: "POST",
        data: credentials
      });

      localStorage.setItem("token", data.token);
      //set the isLoggedIn to true
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const authObj = { isLoggedIn, login, logout };

  return (
    //02- wrapp all the consumer components with the context provider
    <AuthContext.Provider value={authObj}>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/private"
            element={
              <RequiredAuth>
                <PrivateData />
              </RequiredAuth>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
