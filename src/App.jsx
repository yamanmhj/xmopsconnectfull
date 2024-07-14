import './App.css';

import History from './components/ButtonPanel/History';
import ButtonPanel from './components/ButtonPanel/ButtonPanel';
import First from './components/Homepage/First'
import Second from './components/Homepage/Second';
import Third from './components/Homepage/Third';
import NewLogin from './components/Homepage/NewLogin';
import Logs from './components/ButtonPanel/Logs';
import Profile from './components/ButtonPanel/Profile';
import MySidebar from './components/DashBoard/MySidebar';
import MainPage from './components/DashBoard/Main';
import { Account, AccountContext } from "./components/Homepage/Account";
import { useContext } from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import backgroundimg from './components/Assets/bg.jpeg'
import MonolithUserInput from './components/ButtonPanel/DialogBox/MonolithPopup'

 
const StyledDiv = styled.div`
  height: 100vh;

  scroll-snap-type: y mandatory;
  scroll-behaviour: smooth;
  overflow-y: auto;
  color: white;
  scrollbar-width: none;
  background: url(${backgroundimg});
`

  function App() {
    return (
      
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/MainPage" element={<MainPage/>} />
          <Route path="/History" element={<History/>} />
          <Route path="/Logs" element={<Logs/>} />
          <Route path="/Profile" element={<Profile/>} />

          <Route path='/ButtonPanel' element={<ButtonPanel/>}/>
     

  

          

        </Routes>
      </Router>
    );
  }
  
  function Home() {
    return (
      <Account className="App">
        <StyledDiv>
          <First />
          <Second />
          <Third />
          <NewLogin />
        </StyledDiv>
      </Account>
    );
  }


export default App;
