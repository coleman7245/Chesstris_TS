import { useContext, useState, useRef } from 'react';
import { styled } from 'styled-components';

import { GameContext } from '../../App.tsx';

const StyledEditForm = styled.form`
    border: 10px double black;
    width: fit-content;
    height: fit-content;
    position: absolute;
    margin-top: 3%;
    margin-left: 3%;
    padding: 5%;
    text-align: center;
    font: 1em 'Arial';
    font-weight: bold;
    border-radius: 10px;
`;

const StyledButton = styled.button`
    background-color: white;
    font: 'Georgia';
    font-weight: bold;
    border: 1px double black;
    border-radius: 10px;

    &:focus {
        color: white;
        background-color: black;
    }
`;

export default function EditForm() {
    const textRef = useRef(null);
    const [gameState, dispatch] = useContext(GameContext);
    const [email, setEmail] = useState('');
    const [editDone, setEditDone] = useState(false);

    function handleSubmission(e : React.FormEvent<HTMLElement>, dispatch : Function, email : string) {
        e.preventDefault();
        dispatch({type : 'EDIT_INPUT', player : {name : gameState.player_name, email : email}});
        setEmail('');
        setEditDone(true);
    }

    return (
        <StyledEditForm className='form' ref={textRef} id='player-form' onSubmit={(e) => handleSubmission(e, dispatch, email)}>
            {editDone ? 'Edit Done!' : 'Enter your email'} <br /> <br />
            {editDone ? null : <>
                <input id='email-field' type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/> <br /> <br />
                <StyledButton>Submit</StyledButton>
            </>}
        </StyledEditForm>
    )
};