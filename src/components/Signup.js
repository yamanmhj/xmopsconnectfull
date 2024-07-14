import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import user_icon from "./Assets/person.png";
import email_icon from "./Assets/email.png";
import password_icon from "./Assets/password.png";
import UserPool from "./Homepage/Userpool";
import "./Login.css";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    navigate('/Login'); 
  };

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
        navigate("/Buttonpanel");

      }
    });
  };

  return (
  /*  <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
            placeholder="***********"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form> */

    <form onSubmit={onSubmit} className="container">
  <div className="continer">
    <div className="Header">
      <div className="text">Sign Up</div>
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
      <div className="AlreadyHaveAccount">Already have an account?<span onClick={handleLoginClick} style={{textDecoration: 'underline' }}
> Log In</span></div>
      <div className="submit-container">
        <button type="submit" className="submit">
          Create an Account
        </button>
      </div>
    </div>
  </div>
</form>
  );
};

export default Signup;
