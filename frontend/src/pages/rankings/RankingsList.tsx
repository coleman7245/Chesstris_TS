import { styled } from 'styled-components';

import { Score } from '../../types.ts';

const StyledRankingsList = styled.ol`
    font: 30px 'Georgia';
    width: fit-content;
    height: fit-content;
    border: 10px double black;
    padding: 3% 6%;
    position: absolute;
    top: 150px;
    left: 250px;
    text-align: center;
`;

function RankingsList({name, scores} : {name : string, scores : Score[]}) {
    return (
        <StyledRankingsList>
            <h2>{name}</h2> <br />
            {(scores) ? scores.map((score : Score) => {
                return <><li>{`Score: ${score.player_name} - Player: ${score.score}`}</li><br /></>
                }) : null}
        </StyledRankingsList>
    )
}

export default RankingsList;