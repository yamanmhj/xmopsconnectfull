import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from "../Homepage/Account";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';




function Logs() {

  const [eventType, setEventType] = useState('CloudTrail');
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();


  const MainContainer = styled.div`

  flex: center;
  width: 1400px;
  height: 94vh;

  `;


const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Text = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Underline = styled.div`
  width: 50px;
  height: 3px;
  background-color: #7F7D00; /* Underline color */
`;


const ListContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center; /* Center the content horizontally */
  justify-content: center; /* Center the content vertically */
  background-color: #EEF4D9; /* List background color */
  width: 1000px;
  height: 70vh; /* Fixed height */
  overflow-y: auto; /* Scrollable */
  margin-top: 80px; /* Margin from the Title */
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1); /* Box shadow */
  margin-left: 200px;
  ul {
    font-size: 18px;
    font-weight: 20px; /* Font size for the ul element */
  }
`;


const Title = styled.h1`
  position: sticky;
  top: 0;
  background-color: grey;
  z-index: 1;
  padding: 10px;
  width: 100%;
  text-align: center;
`;

  

  useEffect(() => {
    fetchCloudTrailEvents();
  }, []);



  const fetchCloudTrailEvents = async () => {
    console.log("cloud trail is pressed");
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/cloudtraillogs`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error('Error fetching CloudTrail events:', error);
      // Handle error gracefully, e.g., display a message to the user
    }
  };

    
  return (
  
 
      
    

      
    <MainContainer>
    <div className="Header">
          <div className="text-xmops ">System Log Insights</div>
          <div className="underline-xmops"></div>
    
        </div>


   

    <ListContainer>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </ListContainer>
  </MainContainer>
     

  );
}

export default Logs;
