import './RankingsList.css';

import { Score } from '../../utilities.ts';

function RankingsList({name, scores} : {name : string, scores : Score[]}) {
    return (
        <ol className='rankings-list'>
            <h2>{name}</h2> <br />
            {(scores) ? scores.map((score : Score) => {
                return <><li>{`Score: ${score.player_name} - Player: ${score.score}`}</li><br /></>
                }) : null}
        </ol>
    )
}

export default RankingsList;