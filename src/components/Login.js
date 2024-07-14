import React, { useState, useContext } from "react";
import { unstable_HistoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import "./Login.css";

import { AccountContext } from "./Homepage/Account";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {authenticate} = useContext(AccountContext);

  const handleLoginClick = () => {
    navigate('/Signup'); 
  };

  const onSubmit = (event) => {
    event.preventDefault();
 
    authenticate(email, password)
      .then((data) => {
        console.log("Logged in", data);
      })
      .catch((data) => {
        console.log("Logged in", data);
      });
  };

  return (
    <form onSubmit={onSubmit} className="container">
      <div className="continer">
        <div className="Header">
          <div className="text">Sign In</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input"
              placeholder="***********"
              required
            />
          </div>
          <div className="donthaveaccount">Dont have an account?<span onClick={handleLoginClick} style={{textDecoration: 'underline' }}
> Sign Up</span></div>
          <div className="submit-container">
            <button type="submit" className="submit">
            Login
            </button>

    
            </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
