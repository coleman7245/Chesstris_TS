import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { GameContext } from '../../App.tsx';

const StyledContinueBox = styled.div`
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
`;

const StyledButton = styled.button`
    background-color: white;
    font: 'Georgia';
    font-weight: bold;
    border: 5px double black;
    margin-left: 1%;
    margin-right: 1%;
    padding: 2%;

    &:focus {
        color: white;
        background-color: black;
    }
`;

export default function ContinueBox({message} : {message : string}) {
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
        <StyledContinueBox>
            {message} <br /> <br />
            Player: {gameState.player_name} <br />
            Time: {gameState.finishTime.hours} : {gameState.finishTime.minutes} : {gameState.finishTime.seconds} <br />
            Score: {gameState.score} <br /> <br />
            Continue? <br />
            <StyledButton id='yes' onClick={(e) => {
                const event : React.MouseEvent<HTMLButtonElement, MouseEvent> = e as React.MouseEvent<HTMLButtonElement, MouseEvent>;
                handleContinue(event);}
            }>
                Yes
            </StyledButton>
            <StyledButton id='no' onClick={(e) => handleContinue(e)}>No</StyledButton>
        </StyledContinueBox>
    )
};