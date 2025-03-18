/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function PrivateData() {
  const [data, setData] = useState(null);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const requestData = async () => {
    try {
      const { data } = await axios("/api/auth/profile", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      setData(data.message);
      console.log(data.message);
    } catch (error) {
      console.log(error);
      setData(error.message);
      if (error.response.data.message === "invalid token") {
        auth.logout();
        navigate("/login");
      }
    }
  };
  return (
    <div>
      <div className="text-center p-4">
        <button className=" btn btn-outline-primary" onClick={requestData}>
          Request protected data
        </button>
      </div>
      {data && (
        <div className="text-center p-4">
          <div className="alert">{data}</div>
        </div>
      )}
    </div>
  );
}
