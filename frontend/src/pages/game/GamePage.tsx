import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './GamePage.css';

import Navbar from '../../shared_components/Navbar.tsx';
import Board from './Board.tsx';
import GameInfo from './GameInfo.tsx';

import { Game_Phase } from '../../utilities.ts';
import { GameContext } from '../../App.tsx';

function GamePage() {
    const [gameState, dispatch] = useContext(GameContext);
    const navigate : Function = useNavigate();

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

    console.log(gameState.current_phase);

    return (
        <div>
            <Navbar />
            <div className='gamepage'>
                <Board />
                <GameInfo />
                <button id='pause-btn' onClick={() => dispatch({type : 'PAUSED'})} >Pause</button>
            </div>
        </div>
    );
}

export default GamePage;