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
  margin-top: 0px;
  margin-bottom: 0px;
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


const MonolithPopup = ({ onClose }) => {

  const [selectedOption, setSelectedOption] = useState('');
  const[selectedPortValue, setselectedPortValue]= useState('');

  const [apiRegions, apisetRegions] = useState([]);   //to store the json region in this usestate
  const [PopupRegion, popupsetRegion] = useState('');  // to get the region selected by the user
  

  const [apiOSImage, apisetOSImage] = useState([]); 
  const [PopupOSImage, popupsetOSImage] = useState('');  // to get the osimage selected by the user

  const [apiEC2, apisetEC2] = useState([]);   //to store the json instance in this usestate
  const [PopupEC2, popupsetEC2] = useState(''); // to store the instance selected by the user

  const [apikeypair, apisetkeyPair] = useState([]); 
  const [PopupKeyPair, popupsetkeyPair] = useState(''); // to store the keypair selected by the user

  const [apiSecurityGroup, apisetsecuritygroup] = useState([]); 
  const [PopupSecurityGroup, popupsecuritygroup] = useState(''); // to store the securitygroup selected by the user checkbox


  const[PopupStorage, popupsetstorage] = useState(''); // to store the storage selected by the user
  
  const [apiphpVersions, apisetPhpVersions] = useState([
    '7.0',
    '7.1',
    '7.2',
    '7.3',
    '7.4',
    '8.0',
    '8.1'
  ]);


  const [apiRDS, apisetRDS] = useState([]);   //to store the json database in this usestate
  const [PopupRDS, popupsetRDS] = useState(''); // to store the database selected by the user

  const [PopupPHPVersion, popupsetphpversion] = useState('');  //to store the php version selected by the user

  
  const [apiApache, apisetApache] = useState([]);
  const [PopupApache, popupapache] = useState(''); // to store the apache version selected by the user
 
 



 
 







  const handleCreatemonolithic = async (onClose) => {

    try {
      const formData = {
        selectedregion: PopupRegion,
        selectedec2InstanceType: PopupEC2,
        selectedrdsDBType: PopupRDS,
        selectedsshoption: selectedPortValue,
        selectedkeypairvalues: PopupKeyPair,
        selectedphpversion: PopupPHPVersion,
        selectedstoragesize: PopupStorage
        

        
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
        const response = await fetch('http://127.0.0.1:5000/api/GetMonolithicelements');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse JSON data from response
        apisetRegions(data.RegionsOptions); // Update regions state variable with 'regions' data
        apisetEC2(data.EC2InstanceTypeOptions);   //update ec2 with ec2 from aws
        apisetRDS(data.RDSDBTypeOptions);   //update RDS with rds data from boto3
        apisetOSImage(data.AMITypeOptions);  //update AMI with AMI data from boto3
        apisetkeyPair(data.KeyPairOptions);
      

               //update  rds type with options from aws
        
      } catch (error) {
        console.error('Error fetching regions:', error.message);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run effect only once
  return (
    <ModalBackground>
      
     
      <Popup>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title> AWS MONOLITH <br/> DEPLOYMENT PARAMETERS</Title>
        
        
        

        <InputRow>    
 
  <StyledSelect
    value={PopupRegion}
    onChange={(e) => popupsetRegion(e.target.value)}
  >
    <option value=""><h1>Select Region</h1></option>
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
    value={PopupEC2}
    onChange={(e) => popupsetEC2(e.target.value)}
  >
    <option value="">Select Instance Type</option>
    {apiEC2 && apiEC2.length > 0 ? (
      apiEC2.map((type, index) => (
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
    value={PopupKeyPair}
    onChange={(e) => popupsetkeyPair(e.target.value)}
  >
    <option value="">Select Key Pair</option>
    {apikeypair && apikeypair.length > 0 ? (
      apikeypair.map((type, index) => (
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
<div className="InputRow">
      <label style={{ color: '#7F7D00', fontSize: '25px', marginBottom: '10px' }}>Security Group</label>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ color: '#7F7D00', fontSize: '20px', marginBottom: '10px' }}>
          <input 
            type="radio"
            value="SSH"
            checked={selectedOption === "SSH"}
            onChange={() => {
              setSelectedOption("SSH");
              setselectedPortValue(22);
            }}
          />
          SSH
        </label>
        <label style={{ color: '#7F7D00', fontSize: '20px' }}>
          <input 
            type="radio"
            value="HTTP"
            checked={selectedOption === "HTTP"}
            onChange={() => {
              setSelectedOption("HTTP");
              setselectedPortValue(80);
            }}
          />
          HTTP
        </label>
      </div>
    </div>
    </InputRow>



<InputRow>
 
<StyledSelect
  value={PopupRDS}
  onChange={(e) => popupsetRDS(e.target.value)
    }
>
  <option value="">Select DB Type</option>
  {apiRDS && apiRDS.length > 0 ? (
    apiRDS.map((option, index) => (
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


<InputRow>
<StyledSelect
  value={PopupPHPVersion}
  onChange={(e) => popupsetphpversion(e.target.value)}
>
  <option value="">Select PHP Version</option>
  {apiphpVersions.map((version, index) => (
    <option key={index} value={version} style={{ textAlign: 'center' }}>
      {version}
    </option>
  ))}
</StyledSelect>
</InputRow>



<InputRow>
  <StyledInput>
    <label style={{ color: '#7F7D00', fontSize: '25px', marginBottom: '10px', alignItems: Center }}>
      Volume Size
    </label>
    <StyledTextInput
      type="text"
      placeholder="Enter volume size"
      value={PopupStorage}
      onChange={(e) => {
        // Ensure only numeric values are entered
        const value = e.target.value;
        if (!isNaN(value)) { // Check if it's a valid number
          popupsetstorage(value);
        }
      }}
    />
  </StyledInput>
</InputRow>




<ButtonSubmit onClick={handleCreatemonolithic}>CREATE MONOLITH INSTANCE</ButtonSubmit>
      </Popup>
    </ModalBackground>
  );
};

export default MonolithPopup;
