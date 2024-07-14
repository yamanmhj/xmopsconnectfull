import React from "react";
import styled, { keyframes } from 'styled-components';
import Navbar from "./Navigation";
import lineimage from "../Assets/lineimage.png"

import cloudimage from "../Assets/cloudimage.png"
const StyledDiv = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
height: 100vh;
scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
flex: 2;
display: flex;
flex-direction: column;
justify-content: center;
gap: 20px;;
`;
const Title = styled.h1`
  font-size: 65px;
  
  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;
const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Line = styled.img`
  height: 8px;

`;

const Subtitle = styled.h2`
  color: #eeee45;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;
const right = styled.div`
flex: 3;
  position: relative;
  @media only screen and (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;
const Img = styled.img`
width: 500px;
  object-fit: contain;
  border-radius: 50%; /* This will make the image round */
  object-fit: cover;
  
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media only screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const First = () => {
    return(
        <StyledDiv>
          <Navbar/>
          <Container>
          <Left>
            <Title>Instant. Cloud. Architecture</Title>
            <WhatWeDo>
            <Line src={lineimage} />
            <Subtitle>What is XMops-Connect?</Subtitle>
          </WhatWeDo>
          <Desc>
          "Instant AWS Blueprint: Click to generate scalable, secure, and efficient cloud infrastructure on AWS."
          </Desc>
            </Left>
          <right>
            <Img src = {cloudimage}/>
          </right>
          </Container>
          </StyledDiv>
    )
}

export default First;