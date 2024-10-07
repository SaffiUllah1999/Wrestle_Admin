import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css"
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");


  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password); // Call login with email and password
  };

  return (
    <div className={"mainContainer"} style={{backgroundColor:"#000"}}>
      <div className={"titleContainer"}>
        <div style={{color:"#fff"}}>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter Username"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          style={{color:"#fff"}}
          className={"inputButton"}
          type="button"
          onClick={handleSubmit}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
