import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { GameContext } from '../App.tsx';

const StyledNavBar = styled.div`
    background-color: white;
    border: 10px double black;
    overflow: hidden;
    border-radius: 10px;
`;

const StyledPlayerLogin = styled.span`
    margin-left: 68%;
    color: black;
    font-weight: bold;
`;

const StyledLink = styled(Link)`
    textDecoration: 'none';
    padding: 0.5% 0.5%;
    border-right: 2px solid black;
    color: black;
    font-weight: bold;

    &:hover {
        color: white;
        background-color: black;
    }
`;

export default function Navbar() {
    const [gameState] = useContext(GameContext);

    return (
        <StyledNavBar>
            <StyledLink to='/'>Home</StyledLink>
            <StyledLink to='/game'>Game</StyledLink>
            <StyledLink to='/rankings'>Rankings</StyledLink>
            <StyledLink to='/edit'>Edit</StyledLink>
            <StyledLink to='/rules'>Rules</StyledLink>
            <StyledLink to='/about'>About</StyledLink>
            {gameState.player_name ?
                <StyledPlayerLogin>Player: {gameState.player_name} logged in</StyledPlayerLogin>
                :
                <StyledPlayerLogin><StyledLink to='/login'>Sign In</StyledLink></StyledPlayerLogin>}
        </StyledNavBar>
    )
};