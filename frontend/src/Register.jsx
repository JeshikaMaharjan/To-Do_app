import { useState } from "react";
import React from "react";
import logo from "./assets/logo.png";
import axios from "axios";
import "./styles/Login.css";
export default function Register() {
  const baseURL = `${import.meta.env.VITE_API_URL}`;
  const [firstName, setfirstname] = useState();
  const [lastName, setlastname] = useState();
  const [userName, setuserName] = useState();
  const [password, setPassword] = useState();
  const [status, setStatus] = useState(false);

  function handleFirstname(e) {
    setfirstname(e.target.value);
  }
  function handleLastname(e) {
    setlastname(e.target.value);
  }
  function handleUsername(e) {
    setuserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  async function postData() {
    const postdata = {
      firstname: firstName,
      lastname: lastName,
      username: userName,
      passwd: password,
    };
    try {
      console.log(postdata);
      const result = await axios.post(`${baseURL}/users`, postdata);
      if (result?.data?.status == "ok") console.log(result.data.message);
      else console.log(result.data.message);
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
            <h1>Registration</h1>
            <span>Firstname</span>
            <input
              type="text"
              placeholder="Enter Firstname"
              required
              onChange={handleFirstname}
            />
            <span>Lastname</span>
            <input
              type="text"
              placeholder="Enter Lastname"
              required
              onChange={handleLastname}
            />
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
              value="Register"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
