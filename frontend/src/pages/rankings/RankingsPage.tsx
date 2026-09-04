import { useState, useEffect } from 'react';
import { styled } from 'styled-components';

import Navbar from '../../shared_components/Navbar.jsx'
import RankingsList from './RankingsList.jsx';

const StyledRankingsPage = styled.div`
    color: black;
    background-color: white;
    border-bottom: 10px double black;
    border-right: 10px double black;
    border-left: 10px double black;
    border-radius: 10px;
    height: 900px;
    width: 1487px;
    position: absolute;
`;

const StyledButton = styled.button`
    position: absolute;
    font: 'Georgia';
    font-weight: bold;
    padding: 2%;
    border: 5px double black;

    &:focus {
        color: white;
        background-color: black;
    }
`;

export default function RankingsPage() {
    const [scores, setScores] = useState([]);

    async function getScores() : Promise<any> {
        try {
            const response = await fetch(`http://localhost:8080/api/scores`);
            console.log(response);
            const scores : Promise<any> = await response.json();
            setScores(await scores);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getScores();
    }, []); 

    return (
        <>
            <Navbar />
            <StyledRankingsPage>
                <StyledButton id='score-rankings-btn'>Scores</StyledButton>
                <StyledButton id='player-rankings-btn'>Players</StyledButton>
                <StyledButton id='time-rankings-btn'>Times</StyledButton>
                <RankingsList name='Scores' scores={scores}/>
            </StyledRankingsPage>
        </>
    );
};