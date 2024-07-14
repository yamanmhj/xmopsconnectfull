import React, { useContext } from "react";
import { useState } from "react";
import axios from 'axios';
import "./ButtonPanel.css";
import { AccountContext } from "../Homepage/Account";
import { useNavigate } from "react-router-dom";
import MonolithPopup from "./DialogBox/MonolithPopup";
import styled from "styled-components";
import social from "../Assets/social.jpg"
import keyframes from "styled-components";


import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import './awesomebutton.css';
import LightSailPopup from "./DialogBox/LightSailPopup";


const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;
const ButtonPanel = () => {
  const navigate = useNavigate();
  const [isMonolithPopupOpen, setIsMonolithPopupOpen] = useState(false); 
  const [isLightsailPopupOpen, setIsLightsailPopupOpen] = useState(false);

  const handleMonolithOpenPopup = () => {
    setIsMonolithPopupOpen(!isMonolithPopupOpen);
  };

  const handleLightsaileOpenPopup = () => {
    setIsLightsailPopupOpen(!isLightsailPopupOpen);
  }

  const MainDiv = styled.div`
  background: url(${social}) no-repeat ;
  background-size: cover;
  border-radius: 0px;
  width: 1400px;
  height: 94vh;

  `;


  const HoverableDeployAwesomeButton = styled(AwesomeButton)`
  position: relative; 
  &:hover {
  
    animation: ${shakeAnimation} 0.5s ease infinite;
    color: #0080B9; 
  }


  &:hover::after {
    content: "DEPLOY"; 
    font-weight: 40px;
    position: absolute;
    bottom: 100%; /* Position the tooltip above the button */
    left: 50%;
    transform: translateX(-50%); 
    padding: 5px 20px;
    font-size: 20px; 
    z-index: 1; 
  }
`;

const HoverableDestroyAwesomeButton = styled(AwesomeButton)`
position: relative; 
&:hover {

  animation: ${shakeAnimation} 0.5s ease infinite;
  color: #0080B9; 
}


&:hover::after {
  content: "DESTROY"; 
  font-weight: 40px;
  position: absolute;
  bottom: 100%; /* Position the tooltip above the button */
  left: 50%;
  transform: translateX(-50%); 
  padding: 5px 20px;
  font-size: 20px; 
  animation: ${shakeAnimation} 0.5s ease infinite;
 
  z-index: 1; 
}
`;

 


  // Define click handlers for the buttons
  const handleClick = async (configure_type) => {
      try {
          let response;
          if (configure_type === 'monolith') {
              //response = await axios.post(`http://127.0.0.1:5000/api/monolith`);
              if (configure_type === 'monolith') {
                setIsMonolithPopupOpen(true); // Open the popup when 'monolith' button is clicked
              }
          } else if (configure_type === 'microservice') {
             
          } else if (configure_type === 'lightsail') {
            setIsLightsailPopupOpen(true);
          } else if (configure_type === 'monolithestroy') {
             
          } else if (configure_type === 'microservicedestroy') {
              
          } else if (configure_type === 'lightsaildestroy') {
              
          } 
          else if (configure_type === 'History') {
           navigate("/History");
        }
        else if (configure_type === 'logouts') {
         
      }
        else {
              throw new Error(`Invalid configure_type: ${configure_type}`);
          }
          console.log(response.data);
      } catch (error) {
          console.error(`Error triggering Terraform script "${configure_type}":`, error);
      }
  };


    
    return (
        <MainDiv>
        <div className="Header">
          <div className="text-xmops ">AWS Infrastructure Management Panel</div>
          <div className="underline-xmops"></div>
    
        </div>

        
        
        <div className="button_main_container">
          <div className="button-container">
        <HoverableDeployAwesomeButton  type="secondary" 
        size="large"
        active
       

        onPress={() => {
          handleClick('monolith')
        }}
         >  Monolith</HoverableDeployAwesomeButton>

<HoverableDeployAwesomeButton  type="secondary" 
        size="large"

        onPress={() => {
          handleClick('microservice')
        }}
         >  HighlyAvailable</HoverableDeployAwesomeButton>

<HoverableDeployAwesomeButton  type="secondary" 
        size="large"

        onPress={() => {
          handleClick('lightsail')
        }}
         >  Lightsail</HoverableDeployAwesomeButton>

           
          </div>
          <div className="button-container">
          <HoverableDestroyAwesomeButton  type="danger" 
        size="large"

        onPress={() => {
          handleClick('monolithdestroy')
        }}
         >  Monolith</HoverableDestroyAwesomeButton>
          <HoverableDestroyAwesomeButton  type="danger" 
        size="large"

        onPress={() => {
          handleClick('microservicedestroy')
        }}
         >  Mircoservices</HoverableDestroyAwesomeButton>
          <HoverableDestroyAwesomeButton  type="danger" 
        size="large"

        onPress={() => {
          handleClick('lightsaildestroy')
        }}
         >  Lightsails</HoverableDestroyAwesomeButton>

          </div>

        </div>
        {isMonolithPopupOpen && <MonolithPopup onClose={handleMonolithOpenPopup} />}
        {isLightsailPopupOpen && <LightSailPopup onClose={handleLightsaileOpenPopup} />}
      </MainDiv>
  
    );
};

export default ButtonPanel;