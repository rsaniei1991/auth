/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function NavBar() {
  const auth = useContext(AuthContext);
  console.log(auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        {/* Navbar Links */}
        <div>
          <ul className="navbar-nav me-auto d-flex align-items-center">
            <li className="nav-item me-3">
              {auth.isLoggedIn ? (
                <button
                  className="btn btn-outline-primary"
                  onClick={auth.logout}
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              {auth.isLoggedIn && (
                <Link to="/private" className="nav-link">
                  PrivateData
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
