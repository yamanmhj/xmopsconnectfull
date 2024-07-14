import React from "react";
import styled from 'styled-components';
import main_logo from '../Assets/mainlogo.png';

const StyledDiv = styled.div`
display: flex;
justify-content: center;
`

const Container = styled.div`
width: 1400px;
display: flex;
justify-content: space-between;
aligh-items: center;
padding: 10px 0px;

`;

const Links = styled.div`
display: flex;
align-item: center;
gap: 50px;
`;


const Logo = styled.img`
heigh: 150px;
width: 150px;
`;

const Line = styled.img`
height: 5px;
`;

const List = styled.ul`
top-gap: 40px;
display: flex;
gap: 20px;
list-style: none;
font-size: 30px;

`;
const ListItems = styled.li`
cursor: pointer;

`;
const Icons = styled.div`

`;
const Navbar = () => {
    return(
        <StyledDiv>
            <Container>
                <Links>
                <Logo src ={main_logo}/>
                <List>
                <ListItems>Home</ListItems>
                <ListItems>Architectures</ListItems>
                <ListItems>Works</ListItems>
                </List>
              </Links>
            <Icons></Icons>
            </Container>
            </StyledDiv>
    )
}

export default Navbar;