// import { useState, useEffect, useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import usePlayer from '../../hooks/usePlayer.tsx';
import useStage from '../../hooks/useStage.tsx';
import useInterval from '../../hooks/useInterval.tsx';
import useGameInfo from '../../hooks/useGameInfo.tsx';
import Navbar from '../../shared_components/Navbar.tsx';
import Stage from './Stage.tsx';
import GameInfo from './GameInfo.tsx';
import Vector2 from '../../classes/Vector2.ts';
import { StageInfo } from '../../types.ts';
import { createStage, GameState, hasCollided } from '../../utilities.ts';
// import { GameContext } from '../../App.tsx';

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

export default function GamePage() {
    const [text, setText] = useState('Start');
    const stageInfo : StageInfo = {size : new Vector2(285, 540), pixel_size : new Vector2(30, 30)};
    const defaultPosition = new Vector2(Math.floor(stageInfo.size.x / stageInfo.pixel_size.x / 2), 0);
    // const [gameState, dispatch] = useContext(GameContext);
    const navigate : Function = useNavigate();
    const [gameState, setGameState] = useState(GameState.PREGAME);
    const [player, createPlayer, move, rotatePlayer] = usePlayer('', '', defaultPosition);
    const [stage, setStage, blocksCleared] = useStage(player, createPlayer, stageInfo, gameState);
    const [dropInterval, setDropInterval] = useState(0);
    const [score, level, getTime] = useGameInfo(blocksCleared, 1000, gameState);

    function checkGameState(gameState : GameState) : void {
        let newState : GameState = gameState;

        if (text === 'Pause')
            newState = GameState.PLAY;
        else if (hasCollided(player, stage, new Vector2(0, 1)) !== 'none' && player.position.equals(defaultPosition))
            newState = GameState.GAME_OVER;
        else if (text === 'Resume')
            newState = GameState.PAUSE;

        setGameState(newState);
    };

    function movePlayer(velocity : Vector2) : void {
        if (hasCollided(player, stage, velocity) === 'none')
            move(velocity, false);
    };

    function startDrop() {
        setDropInterval(1000 / level);
    }

    function dropPlayer() {
        setDropInterval(0);
        drop();
    }

    function drop() : void {
        let dropVel : Vector2 = new Vector2(0, 1);

        if (hasCollided(player, stage, dropVel) !== 'bottom') {
            move(dropVel, false);
        }
        else
            move(Vector2.zero(), true);
    };

    // function handlePause(e : React.MouseEvent) {
    //     e.preventDefault();

    //     if (gameState.current_phase === Game_Phase.PREGAME) {
    //         initializeGame();
    //         setText('Pause');
    //         dispatch('START');
    //     }
    //     else if (gameState.current_phase === Game_Phase.PAUSE) {
    //         setText('Pause');
    //         setDropInterval(1000);
    //         dispatch({type: 'PAUSE'});
    //     }
    //     else if (gameState.current_phase === Game_Phase.PLAY) {
    //         setText('Resume');
    //         setDropInterval(0);
    //         dispatch({type : 'PAUSE'});
    //     }
    // }

    function handlePause(e : React.MouseEvent) {
        e.preventDefault();

        if (gameState === GameState.PREGAME) {
            initializeGame();
            setText('Pause');
        }
        else if (gameState === GameState.PAUSE) {
            setText('Pause');
            setDropInterval(1000);
        }
        else if (gameState === GameState.PLAY) {
            setText('Resume');
            setDropInterval(0);
        }
    }

    function handleInput(e : React.KeyboardEvent) {
        e.preventDefault(); 

        switch(e.key) {
            case 'a':
                movePlayer(new Vector2(-1, 0));
                break;
            case 's':
                dropPlayer();
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

    // function initializeGame() {
    //     setStage(createStage(gameState.stage_size, gameState.chess_piece_pixel_size));
    //     createPlayer();
    //     setDropInterval(1000);
    // };

    function initializeGame() {
        setStage(createStage(stageInfo.size, stageInfo.pixel_size));
        createPlayer();
        setDropInterval(1000);
    };

    // useEffect(() => {
    //     if (gameState.current_phase === Game_Phase.GAME_OVER) {
    //         const timeout = setTimeout(() => navigate('/gameover'), 0);
    //         return () => clearInterval(timeout);
    //      }
    // }, [gameState.current_phase, navigate]);

    useEffect(() => {
        checkGameState(gameState);
    }, [handlePause, useInterval]);

    useEffect(() => {
        if (gameState === GameState.GAME_OVER) {
            const timeout = setTimeout(() => navigate('/gameover'), 0);
            return () => clearInterval(timeout);
         }
    }, [gameState, navigate]);

    useInterval(drop, dropInterval, gameState);

    return (
        <div onKeyDown={e => handleInput(e)} onKeyUp={startDrop}>
            <Navbar name={''} />
            <StyledGamePage>
                <div>
                    <Stage stageInfo={stageInfo} stage={stage} />
                    <GameInfo playerName={''} score={score} gameTime={getTime()} />
                    <StyledStartStopButton onClick={(e) => {handlePause(e)}}>{text}</StyledStartStopButton>
                </div>
            </StyledGamePage>
        </div>
    );
};