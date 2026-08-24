import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import usePlayer from '../../hooks/usePlayer.tsx';
import useStage from '../../hooks/useStage.tsx';
import useInterval from '../../hooks/useInterval.tsx';
import Navbar from '../../shared_components/Navbar.tsx';
import Stage from './Stage.tsx';
import GameInfo from './GameInfo.tsx';
import Vector2 from '../../classes/Vector2.ts';
import { createStage, getTime, Game_Phase, hasCollided } from '../../utilities.ts';
import { GameContext } from '../../App.tsx';
import useGameTime from '../../hooks/useGameTime.tsx';

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

const StyledStartStopButton = styled.button`
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
    const [text, setText] = useState('Start');
    const [gameState, dispatch] = useContext(GameContext);
    const navigate : Function = useNavigate();
    const [player, createPlayer, move, rotatePlayer] = usePlayer(gameState);
    const [stage, setStage] = useStage(player, createPlayer, gameState);
    const [dropInterval] = useState(1000);
    const [gameTime, _] = useGameTime(gameState.current_phase, 1000);

    function movePlayer(velocity : Vector2) : void {
        if (hasCollided(player, stage, velocity) === 'none') {
            move(velocity);
        }
    };

    function drop() : void {
        let dropVel : Vector2 = new Vector2(0, 1);

        if (hasCollided(player, stage, dropVel) !== 'bottom') {
            move(dropVel);
        }
    };

    function handlePause(e : React.MouseEvent) {
        e.preventDefault();

        if (gameState.current_phase === Game_Phase.PREGAME) {
            initializeGame();
            setText('Pause');
            dispatch('START');
        }
        else if (gameState.current_phase === Game_Phase.PLAY) {
            setText('Resume');
            dispatch({type : 'PAUSE'});
        }
    }

    function handleInput(e : React.KeyboardEvent) {
        e.preventDefault(); 

        switch(e.key) {
            case 'a':
                movePlayer(new Vector2(-1, 0));
                break;
            case 's':
                movePlayer(new Vector2(0, 1));
                break;
            case 'd':
                movePlayer(new Vector2(1, 0));
                break;
            case 'r':
                rotatePlayer(stage);
                break;
            default:
                break;
        }
    };

    function initializeGame() {
        setStage(createStage(gameState.stage_size, gameState.chess_piece_pixel_size));
        createPlayer();
    };

    useEffect(() => console.log(gameState.current_phase));

    useEffect(() => {
        if (gameState.current_phase === Game_Phase.WIN) {
            const timeout = setTimeout(() => navigate('/win'), 0);
            return () => clearInterval(timeout);
         }
        else if (gameState.current_phase === Game_Phase.LOSE) {
            const timeout = setTimeout(() => navigate('/lose'), 0);
            return () => clearInterval(timeout);
        }
    }, [gameState.current_phase, navigate]);

    useInterval(drop, dropInterval, gameState.current_phase);

    return (
        <div onKeyDown={e => handleInput(e)}>
            <Navbar />
            <StyledGamePage>
                <div>
                    <Stage stage={stage} />
                    <GameInfo gameTime={getTime(gameTime)} />
                    <StyledStartStopButton onClick={(e) => {handlePause(e)}}>{text}
                    </StyledStartStopButton>
                </div>
            </StyledGamePage>
        </div>
    );
}

export default GamePage;