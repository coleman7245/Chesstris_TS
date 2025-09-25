import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { GameContext } from '../../App.tsx';

import './ContinueBox.css';

function ContinueBox({message} : {message : string}) {
    const navigate = useNavigate();
    const [gameState, dispatch] = useContext(GameContext);

    function handleContinue(e : React.MouseEvent<HTMLButtonElement, MouseEvent>) : void {
        const button : HTMLElement = e.target as HTMLElement;

        if (button.innerText === 'Yes') {
            //NOTE: Save player data here!!!
            dispatch({type: 'RESET_GAME'});
            navigate('/game');
        }
        else if (button.innerText === 'No')
            navigate('/');
    }

    return (
        <div className='continue-box'>
            {message} <br /> <br />
            Player: {gameState.player_name} <br />
            Time: {gameState.finishTime.hours} : {gameState.finishTime.minutes} : {gameState.finishTime.seconds} <br />
            Score: {gameState.score} <br /> <br />
            Continue? <br />
            <button id='yes' onClick={(e) => {
                const event : React.MouseEvent<HTMLButtonElement, MouseEvent> = e as React.MouseEvent<HTMLButtonElement, MouseEvent>;
                handleContinue(event);}
            }>
                Yes
            </button>
            <button id='no' onClick={(e) => handleContinue(e)}>No</button>
        </div>
    )
}

export default ContinueBox;