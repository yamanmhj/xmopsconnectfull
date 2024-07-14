import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AccountContext } from "../Homepage/Account";
import { useNavigate } from 'react-router-dom';

function History() {

  
    
  return (
    <div className="Header">
    <div className="text-xmops ">History Of Deployments</div>
    <div className="underline-xmops"></div>

  </div>
  );
}

export default History;
