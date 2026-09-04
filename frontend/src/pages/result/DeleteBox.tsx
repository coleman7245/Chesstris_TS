import { useState, useContext } from 'react';
import { styled } from 'styled-components';
import { GameContext } from '../../App.tsx';

const StyledDeleteBox = styled.div`
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
    left: 500px;
    top: 350px;
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

export default function DeleteBox() {
    const [isDeleted, setIsDeleted] = useState(false);
    const [gameState] = useContext(GameContext);

    async function handleDelete(url : string, name : string) : Promise<void> {
        try {
            await fetch(url + `/players/${name}`,
                {
                    method : 'DELETE'
                }
            )

            await fetch(url + `/scores/${name}`, 
                {
                    method : 'DELETE'
                }
            );

            await fetch(url + `/times/${name}`, 
                {
                    method : 'DELETE'
                }
            );
            
            setIsDeleted(true);
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <StyledDeleteBox>
            {!isDeleted? 'Delete Data?' : 'Data Deleted!'}
            {isDeleted ? null : 
                <StyledButton id='delete'  onClick={() => handleDelete("http://localhost:8080/api", gameState.player_name)}>Delete</StyledButton>}
        </StyledDeleteBox>
    )
};