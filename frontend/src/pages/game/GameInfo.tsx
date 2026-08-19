import { useContext } from 'react';
import { styled } from 'styled-components';

import { GameContext } from '../../App.tsx';

const StyledGameInfo = styled.div`
    position: absolute;
    margin-top: 3%;
    margin-left: 60%;
    font-size: 50px;
    border: 10px double black;
    padding: 2%;
    top: -10px;
    left: -300px;
`;

function GameInfo() {
    const [gameState] = useContext(GameContext);

    return (
        <StyledGameInfo className='gameinfo'>
            Player: {gameState.player_name} <br />
            Time: {gameState.finishTime.hours} : {gameState.finishTime.minutes} : {gameState.finishTime.seconds} <br />
            Score: {gameState.score}
        </StyledGameInfo>
    )
}

export default GameInfo;