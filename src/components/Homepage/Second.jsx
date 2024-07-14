import React from "react";
import styled, { keyframes } from 'styled-components';
import Navbar from "./Navigation";
import lineimage from "../Assets/lineimage.png"

import cloudimage from "../Assets/cloudimage.png"


const StyledDiv = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  
`;

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    font-size: 60px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  @media only screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: #eeee45;
`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
`;


const right = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
gap: 20px;
  }
`;
const Img = styled.img`
width: 500px;
  object-fit: contain;
  border-radius: 50%; 
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

const Second = () => {
    return(
        <StyledDiv>
        
          <Container>
          <Left>
          <Img src = {cloudimage}/>
            </Left>
          <right>
            
            <Title>Driven by Team Spirit</Title>
            <WhatWeDo>
            <Line src={lineimage} />
            <Subtitle>Team 8</Subtitle>
          </WhatWeDo>
          <Desc>
          Transforming AWS Deployment. Click. Done. Elevate Your Digital Experience.
          </Desc>
          </right>
          </Container>
          </StyledDiv>
    )
}

export default Second;