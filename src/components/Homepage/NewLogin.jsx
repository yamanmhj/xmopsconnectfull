import React, { useState, useContext } from "react";
//import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {useAccount, AccountContext} from "./Account";
import UserPool from "./Userpool";
import Map from "./Map";
import { Navigate, useNavigate } from "react-router-dom";
import MainPage from "../DashBoard/Main";

const StyledDiv = styled.div`
  height: 100vh;
  scroll-snap-align: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 25px;

  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Input = styled.input`
  padding: 20px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
`;

const ChangeForm = styled.h6`
`;

const Right = styled.div`
  flex: 1;

  @media only screen and (max-width: 768px) {
    display: none;
  } 
`;
const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  padding: 20px;
`;


const NewLogin = (onLogin) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Initial value set to true

  const {authenticate} = useContext(AccountContext);

  const onSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      console.log("Login is pressed");
      authenticate(email, password)
        .then((data) => {
          console.log("Logged in", data);
          navigate("/MainPage");
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    } else {
      console.log("Signup is pressed");
      UserPool.signUp(email, password, [], null, (err, data) => {
        if (err) {
          console.error("Signup error:", err);
        } else {
          console.log("Signup successful", data);
        }
      });
    }
  };

  const handleSwitchForm = () => {
    setIsLogin(!isLogin); // Toggle the value of isLogin between true and false
  };

  return (
    <StyledDiv>
      <Container>
        <Left>
     {isLogin ? (
  // Render sign-in form when isLogin is true
  <Form onSubmit={onSubmit}>
    <Title>Sign In</Title>
    <Input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    <Input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
    <ChangeForm> Dont have an account? <span onClick={handleSwitchForm} style={{ textDecoration: 'underline' }}>
    Sign Up</span></ChangeForm>
    <Button type="submit">Login</Button>
  </Form>
) : (
  // Render sign-up form when isLogin is false
  <Form onSubmit={onSubmit}>
    <Title>Sign Up</Title>
    <Input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
    <Input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
   
   <ChangeForm>Already have an account?<span onClick={handleSwitchForm} style={{textDecoration: 'underline' }}
    > Log In</span></ChangeForm>
    <Button type="submit">Sign Up</Button>
  </Form>
)} 
        </Left> 
        <Right>
          <Map/>
        </Right>
      </Container>
    </StyledDiv>
  );
};

export default NewLogin;