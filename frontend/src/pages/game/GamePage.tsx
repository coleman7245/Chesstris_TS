import React, { useEffect, useContext } from 'react';
import { UNSAFE_DataRouterStateContext, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import usePlayer from '../../hooks/usePlayer.tsx';
import useStage from '../../hooks/useStage.tsx';
import Navbar from '../../shared_components/Navbar.tsx';
import Stage from './Stage.tsx';
import GameInfo from './GameInfo.tsx';
import Vector2 from '../../classes/Vector2.ts';

import { Game_Phase } from '../../utilities.ts';
import { GameContext } from '../../App.tsx';

const StyledGamePage = styled.div`
    font: 8em 'Georgia';
    text-align: center;
    color: black;
    background-color: white;
    border-bottom: 10px double black;
    border-right: 10px double black;
    border-left: 10px double black;
    border-radius: 10px;
    height: 800px;
    width: 1487px;
    position: absolute;
`;

const StyledPauseButton = styled.button`
    background-color: white;
    font: 'Georgia';
    font-weight: bold;
    border: 5px solid black;
    border-radius: 10px;
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 310px;
    left: 775px;
    padding: 1%;

    &:active {
        color: white;
        background-color: black;
        border: 5px solid white;
    }
`;

function GamePage() {
    const [gameState, dispatch] = useContext(GameContext);
    const navigate : Function = useNavigate();
    const [player, createPlayer, move, rotate] = usePlayer();
    const [stage, setStage] = useStage(player, gameState);

    function handleInput(e : React.KeyboardEvent) {
    e.preventDefault(); 

    switch(e.key) {
        case 'a':
            move(new Vector2(-1, 0));
            break;
        case 's':
            move(new Vector2(0, 1));
            break;
        case 'd':
            move(new Vector2(1, 0));
            break;
        case 'r':
            rotate();
            break;
        default:
            break;
    }
};

    useEffect(() => {
        if (gameState.current_phase === Game_Phase.WON) {
            const timeout = setTimeout(() => navigate('/win'), 0);
            return () => clearInterval(timeout);
         }
        else if (gameState.current_phase === Game_Phase.LOST) {
            const timeout = setTimeout(() => navigate('/lose'), 0);
            return () => clearInterval(timeout);
        }
        else if (gameState.current_phase === Game_Phase.PLAYING) {
            const timeElapsed = setInterval(() => {dispatch({type : 'UPDATE_TIME'});}, 1000);
            return () => clearInterval(timeElapsed);
        }
    }, [gameState.current_phase, navigate, dispatch]);

    return (
        <div>
            <Navbar />
            <StyledGamePage>
                <div>
                    <Stage stage={stage} />
                    <GameInfo />
                    <StyledPauseButton onClick={() => dispatch({type : 'PAUSED'})}>Pause</StyledPauseButton>
                </div>
            </StyledGamePage>
        </div>
    );
}

export default GamePage;