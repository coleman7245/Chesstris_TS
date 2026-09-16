import { styled } from 'styled-components';
import { Time } from '../../types.ts';

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

export default function GameInfo({playerName, gameTime, score} : {playerName : string, gameTime : Time, score : number}) {
    return (
        <StyledGameInfo className='gameinfo'>
            Player: {playerName} <br />
            Time: {gameTime.hours} : {gameTime.minutes} : {gameTime.seconds} <br />
            Score: {score}
        </StyledGameInfo>
    )
};