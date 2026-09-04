import { styled } from 'styled-components';

import Navbar from '../../shared_components/Navbar.tsx';
import ContinueBox from './ContinueBox.tsx';
import SaveBox from './SaveBox.tsx';
import DeleteBox from './DeleteBox.tsx';

const StyledResultsPage = styled.div`
    border-bottom: 10px double black;
    border-right: 10px double black;
    border-left: 10px double black;
    border-radius: 10px;
    height: 800px;
    width: 1487px;
`;

export default function ResultPage({message} : {message : string}) {
    return (
        <>
            <Navbar />
            <StyledResultsPage>
                <ContinueBox message={message} />
                <SaveBox  />
                <DeleteBox  />
            </StyledResultsPage>
        </>
    )
};