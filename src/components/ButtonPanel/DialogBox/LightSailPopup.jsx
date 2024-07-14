import React from 'react';
import styled, { keyframes } from 'styled-components';

import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import '../../ButtonPanel/awesomebutton.css';
import ReactLoading from "react-loading";
import { Center } from '@react-three/drei';

const ButtonSubmit = styled.button`
padding: 10px 20px 10px 20px;
font-size: 18px;
font-weight: 900;
color: #ffffff;
background-color: #7F7D00;
border: none;
border-radius: 10px;
cursor: pointer;
transition: background-color 0.3s ease;
width: 400px;
height: 100px; /* Updated width value */
align-items: center;
justify-content: center;
margin-left: 105px;
margin-bottom: 30px;
margin-top: 20px;


&:hover {
  background-color: #546C84;
}

&:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
}

&:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

`;
const Title = styled.h1`
  font-weight: 600;
  aligh: center;
  color: #7F7D00;
  text-align: center; 
  margin-bottom: 40px;
  margin-top: 0px;
  
  flex: center;
`;
const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px; // Optional: add margin-bottom for spacing between input rows
`;

const Labels = styled.label`
font-size: 30px; /* Fixed font-size */
color: #7F7D00; /* Text color */
display: inline-block; /* Allows for margin settings */
align-items: center;
margin-left: 20px;
margin-right: 30px;
`;
const Form = styled.form`
  width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: center;  
  align-items: center;


`;

const Input = styled.input`
  padding: 10px;
  background-color: #e8e6e6;
  border: none;
  border-radius: 5px;
  margin-top: 5px;  // Top margin
  margin-bottom: 5px;
  aligh-items: center;
`;


const ModalBackground = styled.div`
z-index: 99; 
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.8); /* slightly transparent background */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const dropDownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-600px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Popup = styled.div`
  width: 600px;
  max-height: 500px;
  border-radius: 20px;
  background-color: #FEFC81;
  font-weight: 50px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;

  overflow-y: auto;  
  animation: ${dropDownAnimation} 0.4s ease-out forwards;

`;

const CloseButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  font-size: 50px;
  font-weight: 40px;
  color: #7F7D00;
  cursor: pointer;
`;

const PopupTitle = styled.h3`
  text-align: center;
  color: #7F7D00;
  margin-bottom: 60px;
  font-weight: 50px;
  
`;

const PopupContent = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

const StyledSelect = styled.select`
background-color: #ffffff;
color: #7F7D00;
font-size: 20px;
border: 2px solid #7F7D00;
border-radius: 8px;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
font-family: sans-serif;
cursor: pointer;
appearance: none;
background-repeat: no-repeat;
background-position: center;
width: 300px;
height: 50px;

/* Fixed width for dropdown list items */
& option {
  width: 250px;
  height: 50px;
  font-weight: 800px;
  text-align: center;

}
`;

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #7F7D00;
`;

const StyledTextInput = styled.input`
  background-color: #ffffff;
  color: #7F7D00;
  font-size: 25px;
  border: 2px solid #007BFF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  cursor: pointer;
  width: 300px;
  height: 50px;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  /* Placeholder color */
  &::placeholder {
    color: #7F7D00;
    font-size:20px;
  }
`;
const Loadingstyle = styled.div`

z-index: 89; 


`;


const LightSail = ({ onClose }) => {

        


  const [apiRegions, apisetRegions] = useState([]);   //to store the json region in this usestate
  const [PopupRegion, popupsetRegion] = useState('');  // to get the region selected by the user
  
  const [apiEC2instance, apisetEC2instance] = useState([]);   //to store the json region in this usestate
  const [Popupec2instance, popupsetec2instance] = useState(''); 

  const [apiblueprintid, apisetblueprintid] = useState([]);   //to store the json region in this usestate
  const [Popupblueprintid, popupsetblueprintid] = useState(''); 

  const [apibundleid, apisetbundleid] = useState([]);   //to store the json region in this usestate
  const [Popupbundleid, popupsetbundleid] = useState(''); 

  const [apikeypair, apisetkeypair] = useState([]);   //to store the json region in this usestate
  const [Popupkeypair, popupsetkeypair] = useState(''); 



 
 







  const handleCreateLightsail = async () => {

    try {
      const formData = {
        selectedregion: PopupRegion,
        selectedec2InstanceType: Popupec2instance,
        selectedkeypair: Popupkeypair,
        selectedbundleid: Popupbundleid,
        selectedblueprintid: Popupblueprintid,
       
        // Add other form fields as needed
      };
  
      // Make API request using Axios
      const response = await axios.post('http://127.0.0.1:5000/api/MonolithSubmitForm', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  
      if (response.status === 200) {
        console.log('Form submitted successfully:', response.data);
        // Handle success - e.g., show a success message to the user
        onClose();
      } else {
        console.error('Error submitting form:', response.statusText);
        // Handle error - e.g., show an error message to the user
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error - e.g., show an error message to the user
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("+=====================================I have reached here");
        const response = await fetch('http://127.0.0.1:5000/api/GetLightsailelements');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse JSON data from response
        apisetRegions(data.RegionsOptions); // Update regions state variable with 'regions' data
        apisetEC2instance(data.InstanceOptions); // Update ec2 with ec2 from aws
        apisetkeypair(data.keypairOptions); // Update RDS with rds data from boto3
        apisetblueprintid(data.BluePrintOptions); // Update AMI with AMI data from boto3
        apisetbundleid(data.BundleOptions); // Update
        
      } catch (error) {
        console.error('Error fetching regions:', error.message);
      }
    };
    fetchData();
  }, []);  // Empty dependency array to run effect only once 
  return (
    <ModalBackground>
      
     
      <Popup>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        
        <Title> AWS LIGHTSAIL <br/>DEPLOYMENT PARAMETERS</Title>
        
        
        <InputRow> 
 
  <StyledSelect
    value={Popupec2instance}
    onChange={(e) => popupsetec2instance(e.target.value)}
  >
    <option value="">Select Instance Type</option>
    {apiEC2instance && apiEC2instance.length > 0 ? (
      apiEC2instance.map((type, index) => (
        <option key={index} value={type.value}>
          {type.label}
        </option>
      ))
    ) : (
      <option value="" disabled>
        Loading...
      </option>
    )}
  </StyledSelect>
</InputRow>

<InputRow>    
 
  <StyledSelect
    value={PopupRegion}
    onChange={(e) => popupsetRegion(e.target.value)}
  >
    <option value=""><h1>Select AWS Region</h1></option>
    {apiRegions && apiRegions.length > 0 ? (
      apiRegions.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))
    ) : (
      <option value="" disabled>
         Loading...  
      </option>
    )}
  </StyledSelect>
</InputRow>








<InputRow>

<StyledSelect
    value={Popupblueprintid}
    onChange={(e) => popupsetblueprintid(e.target.value)}
  >
    <option value="">Select BluePrint ID</option>
    {apiblueprintid && apiblueprintid.length > 0 ? (
      apiblueprintid.map((type, index) => (
        <option key={index} value={type.value}>
          {type.label}
        </option>
      ))
    ) : (
      <option value="" disabled>
        Loading...
      </option>
    )}
  </StyledSelect>
</InputRow>


<InputRow>    
 
  <StyledSelect
    value={Popupkeypair}
    onChange={(e) => popupsetkeypair(e.target.value)}
  >
    <option value=""><h1>Select KeyPair </h1></option>
    {apikeypair && apikeypair.length > 0 ? (
      apikeypair.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))
    ) : (
      <option value="" disabled>
         Loading...  
      </option>
    )}
  </StyledSelect>
</InputRow>



<InputRow>
 
<StyledSelect
  value={Popupbundleid}
  onChange={(e) => popupsetbundleid(e.target.value)
    }
>
  <option value="">Select Bundle ID</option>
  {apibundleid && apibundleid.length > 0 ? (
    apibundleid.map((option, index) => (
      <option key={index} value={option['value']}>
        {`${option['label']} ${option['version']}`} {/* Displaying both name and version */}
      </option>
    ))
  ) : (
    <option value="" disabled>
      Loading...
    </option>
  )}
</StyledSelect>

</InputRow>








<ButtonSubmit onClick={handleCreateLightsail}>CREATE LIGHTSAIL INSTANCE</ButtonSubmit>
      </Popup>
    </ModalBackground>
  );
};

export default LightSail;
