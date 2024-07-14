import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const Parameters = () => {
  const [instanceType, setInstanceType] = useState('');
  const [cidrBlock, setCidrBlock] = useState('');
  const [region, setRegion] = useState('');
  const [minInstances, setMinInstances] = useState('');
  const [maxInstances, setMaxInstances] = useState('');
  const [ami, setAmi] = useState('');
  const [keyPair, setKeyPair] = useState('');
  const [securityGroup, setSecurityGroup] = useState('');
  const [storageSize, setStorageSize] = useState('');
  const instanceTypes = ['t2.micro', 't3.micro', 'm5.large'];
  const regionTypes = ['us-east-2', 'us-west-2', 'us-east-1']; // Add more instance types as needed
  const AMITypes = ['Linux','Windowx','Ubuntu'];
  const StorageTypes = ['gp2','gp3'];
  const navigate = useNavigate();

  const BackButton = () => {
    // try {
    //   const response = await axios.post('/your-api-endpoint', {
    //     instanceType,
    //     cidrBlock
    //   });
    //   console.log('Response:', response.data);
    //   // Handle success
    // } catch (error) {
    //   console.error('Error:', error);
    //   // Handle error
    // }
    navigate('/ButtonPanel');
  };
  const handleCreatemonolithic = async () => {

  };

  return (

    //AWS Region
//Minimum Number of Instances
//Maximum Number of Instances
//AMI (Linux/ubuntu/windows)
//Instance Type (t2.micro/ t2.medium/ t3.medium)
//Key pair (select existing/ create new)
//Security groups (attach existing/ create new with rules)
//Storage configuration (in gib in SSD(gp2/gp3))

    <div className='container'>
    <div className="Header">
          <div className="text">Instance Configuration</div>
          <div className="underline"></div>
        </div>

        <div className='inputs'>  
        <div className='input'>
      <label className='input'><h2>Select Instance</h2></label>
      <select
     value={instanceType}
       onChange={(e) => setInstanceType(e.target.value)}
        className="custom-dropdown" // Apply custom class name
        >
           <option value="">Select instance</option>
         {instanceTypes.map((type, index) => (
          <option key={index} value={type}>
      {type}
          </option>
           ))}
        </select>
      </div>
    </div>


    <div className='inputs'>
        <div className='input'>
      <label className='input'><h2>Select Region</h2></label>
      <select
     value={instanceType}
       onChange={(e) => setRegion(e.target.value)}
        className="custom-dropdown" // Apply custom class name
        >
           <option value="">select Region</option>
         {regionTypes.map((type, index) => (
          <option key={index} value={type}>
      {type}
          </option>
           ))}
        </select>
      </div>
    </div>


    <div className='inputs'>
        <div className='input'>
      <label className='input'><h2>Select AMI</h2></label>
      <select
     value={instanceType}
       onChange={(e) => setInstanceType(e.target.value)}
        className="custom-dropdown" // Apply custom class name
        >
           <option value="">Select AMI</option>
         {AMITypes.map((type, index) => (
          <option key={index} value={type}>
      {type}
          </option>
           ))}
        </select>
      </div>
    </div>


    <div className='inputs'>
        <div className='input'>
      <label className='input'><h2>Select Storage</h2></label>
      <select
     value={instanceType}
       onChange={(e) => setInstanceType(e.target.value)}
        className="custom-dropdown" // Apply custom class name
        >
           <option value="">Select Storage</option>
         {StorageTypes.map((type, index) => (
          <option key={index} value={type}>
      {type}
          </option>
           ))}
        </select>
      </div>
    </div>
    
          < div className='button_main_container'>
          <div className="button-container">
            <button onClick={BackButton} className="buttonLogout">Go Back</button>
               <button onClick={handleCreatemonolithic} className="buttonLogout">Create Monolithic</button>
        
                  </div>
    </div>
  </div>
  );
};

export default Parameters;