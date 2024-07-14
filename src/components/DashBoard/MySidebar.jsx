
import React, { useState } from "react";
import styled from "styled-components";
import main_logo from '../Assets/mainlogo.png';
import square_logo from '../Assets/square.png';
import history_logo from '../Assets/history.png';
import profile_logo from '../Assets/home.png';
import logout_logo from '../Assets/logout.png';
import log_logo from '../Assets/logs.png';
import { unstable_HistoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";


const SideNavContainer  = styled.div `
    background-image: linear-gradient(to bottom, #070014, #15002B,#1C0140);
    width: 300px;
    height: 100vh;
    position: relative;
    color: lightgray;
    transition: width 0.9s;
    aligh: center;
`;

const SideNavContainerNX = styled(SideNavContainer)`
    width: 85px;
    transition: width 0.9s;
`;
const NavUpper = styled.div`
display: grid;
`;



const NavHeading = styled.div`
display: grid;
grid-template-columns: 2fr, 1fr;
grid-template-rows: 1fr;
height: 90px;

`;

const NavBrand = styled.div`
display: flex;
align-items: center;
margin-left: 70px;

`;

const NavMenuContainer =styled.div`
display: grid;
grid-template-rows: repeat(7, 1fr);
	margin-top: 50px;
`;

const MenuItem = styled.a`
    height: 57px;
    width: 16em;
    display: flex;
    align-items: center;
    color: var(--light);
    text-decoration: none;
    text-transform: uppercase;
    margin: 40px auto 20px;
    border-radius: 10px;
    position: relative;
    ${({ isExpanded }) => !isExpanded && "margin: auto;"}

    &:hover {
        background-color: #3498db; /* Set the background color on hover */
        color: #2c3e50; /* Set a contrasting text color */
    }
`;

const MenuItemIcon = styled.img`
    width: 45px;
    height: 45px;
    margin-right: 20px ;

    
`;

const MenuItemText = styled.p`
  
    flex: 1
    display: ${({ isExpanded }) => (isExpanded ? "block" : "none")};
    font-size: 20px;
    font-weight: 20px;5
    font-color: white;
    margin: 0;
`;


const MenuItemNX = styled(MenuItem)`
margin: auto;
width: 4.5em;
`;

const Logo = styled.img`
flex: 0.5;
aligh: center;
width: 150px;
left-padding: 100px;
`;
const Hamburger =styled.button`
    position: absolute;
    right: 0;
    background: none;
    border: none;
    cursor: pointer;
    margin: auto -35px;
    background-color: #2E95D3;
    border: light;
    padding: 20px;
    border-radius: 90px;
    height: 71px;
    width: 74px;
    
    
    &:hover {

    }`;

    const HamburgerSpan = styled.span`
    display: block;
    margin-top: 5px;
    background-color: white;
    border-raidus: 15px;
    height: 4px;
    width: 30px;
    transition: 0.4s;
    aligh: center
    
    &:hover {

    };
`;


const HamburgerIn = styled(Hamburger)`
    /* Styles for .hamburger-in state */
    &:hover {
        ${HamburgerSpan}:nth-child(1) {
            width: 25px;
            transform: translateY(4px) rotate(-25deg);
        }
        ${HamburgerSpan}:nth-child(2) {
            visibility: hidden;
            transition: 0.1s;
         }
        
        ${HamburgerSpan}:nth-child(3) {
            width: 25px;
            transform: translateY(-4px) rotate(25deg);
        }
    }
`;

const HamburgerOut = styled(Hamburger)`
    /* Styles for .hamburger-out state */
    &:hover {
        ${HamburgerSpan}:nth-child(1) {
            width: 25px;
            transform: translate(13px, 4px) rotate(-155deg);
        }
        ${HamburgerSpan}:nth-child(2) {
           visibility: hidden;
           transition: 0.1s;
        }
        ${HamburgerSpan}:nth-child(3) {
            width: 25px;
            transform: translate(13px, -4px) rotate(155deg);
        }
    }
`;


const MySidebar = ({ onclickChangedpath }) => {
    const navigate = useNavigate();

    const handleMenuItemClick = (path) => {
        onclickChangedpath(path); 
    };

    const [isExpanded, setExpanded] = useState(true);
    const menuItems = [
        {text: 'HOME', icon: profile_logo, path:"/Profile"},
        { text: 'DEPLOYMENT', icon: square_logo, path: "/ButtonPanel" },
        { text: 'LOGS', icon: log_logo, path: "/Logs" },
        
        { text: 'HISTORY', icon: history_logo, path: "/History" },
        
        { text: 'LOGOUT', icon: logout_logo, path: "/logout" },
        
       
    
    ];

    return (
        <div className={isExpanded ? "SideNavContainer" : "SideNavContainerNX"}>
            {isExpanded ? (
                <SideNavContainer>
                    <NavUpper>
                        <NavHeading>
                            {isExpanded && (
                                <NavBrand>
                                    <Logo src={main_logo} />
                                </NavBrand>
                            )}
                            {isExpanded ? (
                                <HamburgerIn onClick={() => setExpanded(!isExpanded)}>
                                    <HamburgerSpan />
                                    <HamburgerSpan />
                                    <HamburgerSpan />
                                </HamburgerIn>
                            ) : (
                                <HamburgerOut onClick={() => setExpanded(!isExpanded)}>
                                    <HamburgerSpan />
                                    <HamburgerSpan />
                                    <HamburgerSpan />
                                </HamburgerOut>
                            )}
                        </NavHeading>
                    </NavUpper>
                    <NavMenuContainer>
                        {menuItems.map(({ icon, text, path }, index) => (
                            <MenuItem
                                key={index}
                                className={isExpanded ? "MenuItem" : "MenuItem MenuItemNX"}
                                href="#"
                                onClick={() => handleMenuItemClick(path)}
                                isExpanded={isExpanded}
                            >
                                <MenuItemIcon src={icon} alt="" />
                                <MenuItemText isExpanded={isExpanded}>{text}</MenuItemText>
                            </MenuItem>
                        ))}
                    </NavMenuContainer>
                </SideNavContainer>
            ) : (
                <SideNavContainerNX>
                    {isExpanded ? (
                        <HamburgerIn onClick={() => setExpanded(!isExpanded)}>
                            <HamburgerSpan />
                            <HamburgerSpan />
                            <HamburgerSpan />
                        </HamburgerIn>
                    ) : (
                        <HamburgerOut onClick={() => setExpanded(!isExpanded)}>
                            <HamburgerSpan />
                            <HamburgerSpan />
                            <HamburgerSpan />
                        </HamburgerOut>
                    )}
                </SideNavContainerNX>
            )}
        </div>
    );
};

export default MySidebar;
