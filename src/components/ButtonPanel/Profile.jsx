import React from "react";
import styled, { keyframes } from 'styled-components';
import Logo from '../Assets/cartoon.png';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, SpotLight } from "@react-three/drei";

const dropDownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-600px);
  }
  100% {
    opacity: 1;
    transform: translateY(100px);
  }
`;
const Desc = styled.p`
  font-size: 30px;
  color: white;
  
`;

const Popup = styled.div`
width: 800px;
max-height: 450px;
border-radius: 100px;
background-image: linear-gradient(to bottom, #101327, #121F42,#121F42);
font-weight: 30px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
display: flex;
align-items: center;      
justify-content: center; 
flex-direction: column;
overflow-y: auto;  
animation: ${dropDownAnimation} 0.4s ease-out forwards;
padding: 20px 10px;  

h1 {
  margin: 10px 0;
}
`;

const StyledCanvas = styled(Canvas)`
padding: 30px;
width: 100%;           // Set width to 100%
height: 100%;          // Set height to 100%
border: none;          // Remove border from the Canvas
`;

function Profile() {

  
    
    return (
      <div className="Header">
    
    

      <Popup>
      <StyledCanvas >
           
           <OrbitControls enableZoom={false} />
           <ambientLight intensity={2} />
           <spotLight position={[0, 0, 10]} intensity={10} angle={2} penumbra={1} castShadow  />
           <Sphere args={[1, 200, 200]} scale={2.6}>
             <MeshDistortMaterial
               color="#DA4EA2"
            
               distort={0.55}
               speed={5}
             />
           </Sphere>
        
       </StyledCanvas>
    
        <h1 style={{ fontSize: '60px', color: 'white' }}>Welcome</h1>
        <Desc>Elevate with XMops-ConnecT</Desc>
        <Desc>By: Team 8</Desc>
      </Popup>
  
    </div>
    );
  }
  
  export default Profile;
  