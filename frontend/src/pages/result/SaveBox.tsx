import { useState, useContext } from 'react';
import { styled } from 'styled-components';
import { GameContext } from '../../App.tsx';
import { GameState } from '../../types.ts';

const StyledSaveBox = styled.div`
    font: 50px 'Georgia';
    text-align: center;
    color: black;
    background-color: white;
    border-radius: 10px;
    margin-top: 3%;
    margin-left: 5%;
    border: 10px double black;
    padding: 2%;
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 520px;
    top: 100px;
`;

const StyledButton = styled.button`
    background-color: white;
    font: 'Georgia';
    font-weight: bold;
    border: 5px double black;
    padding: 2%;
    margin-left: 1%;
    margin-right: 1%;

    &:focus {
        color: white;
        background-color: black;
    }
`;

export default function SaveBox() {
    const [isSaved, setIsSaved] = useState(false);
    const [gameState] = useContext(GameContext);

    const data : GameState = {
        player_name : gameState.player_name,
        email : gameState.email, 
        startTime : gameState.startTime,
        finishTime : gameState.finishTime, 
        score : gameState.score,
        chess_piece_pixel_size : gameState.chess_piece_pixel_size,
        stage_size : gameState.stage_size,
        current_phase: gameState.current_phase,
        crossed_finish_line: gameState.crossed_finish_line,
        win_state: gameState.win_state,
        isPaused: gameState.isPaused,
        tetris_pieces: gameState.tetris_piece
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
        <StyledSaveBox className='save-box'>
            {!isSaved? 'Save Data?' : 'Data Saved!'}
            {isSaved ? null : <StyledButton id='save'  onClick={() => handleSave("http://localhost:8080/api", data)}>Save</StyledButton>}
        </StyledSaveBox>
    )
};