import React, { useState } from "react";
import "./styles/Login.css";
import logo from "./assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const baseURL = `${import.meta.env.VITE_API_URL}`;
  const [userName, setuserName] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState(false);

  function handleUsername(e) {
    setuserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  async function postData() {
    const postdata = {
      username: userName,
      password: password,
    };

    try {
      console.log(postdata);
      const result = await axios.post(`${baseURL}/login`, postdata);
      if (result?.data?.status == "ok") {
        console.log("Logged in successfully.");
        console.log(result.data.data.id);
        navigate("/todo", { state: { userId: result.data.data.id } });
      } else console.log(result.data.message);
    } catch (err) {
      console.log(err);
    }
  }
  function handleSubmit() {
    if (!userName && !password) {
      alert("Please fill all the required fields!!");
    }
    postData();
  }
  return (
    <>
      <div className="container">
        <div className="login-form">
          <div className="logo">
            <img className="img" src={logo} />
          </div>
          <div className="form">
            <h1>User Login</h1>
            <span>Username</span>
            <input
              type="text"
              placeholder="Enter Username"
              required
              onChange={handleUsername}
            />
            <span>Password</span>
            <div className="passwordbx">
              <input
                type="password"
                placeholder="Enter Password"
                required
                onChange={handlePassword}
              />
            </div>

            <input
              type="submit"
              className="button"
              value="Sign In"
              onClick={handleSubmit}
            />

            <p className="signUp" onClick={() => navigate("/register")}>
              Sign up
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
