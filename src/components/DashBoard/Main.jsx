import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom'; 

import MySidebar from "./MySidebar";
import ButtonPanel from "../ButtonPanel/ButtonPanel";
import History from "../ButtonPanel/History";
import Logs from "../ButtonPanel/Logs";
import Profile from "../ButtonPanel/Profile";

const MainContainer = styled.div`
  display: flex;
`;

const RightSideContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const MainPage = () => {
  const [receivedPath, setReceivedPath] = useState("/Profile");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("New User Effect Received path:", receivedPath);
    
    if (receivedPath === "/logout") {
      navigate('/');
    }
  }, [receivedPath, navigate]);

  const handleReceivePath = (path) => {
    setReceivedPath(path);
  };

  return (
    <MainContainer>
      <MySidebar onclickChangedpath={handleReceivePath} />
      <RightSideContent>
        {receivedPath === "/ButtonPanel" && <ButtonPanel />}
        {receivedPath === "/History" && <History />}
        {receivedPath === "/Logs" && <Logs />}
        {receivedPath === "/Profile" && <Profile />}
      </RightSideContent>
    </MainContainer>
  );
};

export default MainPage;
