import { useState, useContext } from 'react';
import './SaveBox.css';
import { GameContext } from '../../App.tsx';
import { GameState } from '../../utilities.ts';

function SaveBox() {
    const [isSaved, setIsSaved] = useState(false);
    const [gameState] = useContext(GameContext);

    const data : GameState = {
        player_name : gameState.player_name, 
        startTime : gameState.startTime,
        finishTime : gameState.finishTime, 
        score : gameState.score,
        board_size : gameState.board_size,
        current_phase: gameState.current_phase,
        crossed_finish_line: gameState.crossed_finish_line,
        win_state: gameState.win_state,
        isPaused: gameState.isPaused,
        tetris_pieces: gameState.tetris_piece,
        default_block_position: gameState.default_block_position
    };

    async function handleSave(url : string, data : GameState) {
        try {
            await fetch(url + '/savedgame', 
                {
                    method : 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body : JSON.stringify(data)
                }
            );
            
            setIsSaved(true);
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='save-box'>
            {!isSaved? 'Save Data?' : 'Data Saved!'}
            {isSaved ? null : <button id='save'  onClick={() => handleSave("http://localhost:8080/api", data)}>Save</button>}
        </div>
    )
}

export default SaveBox;