import { useContext } from 'react';
import { styled } from 'styled-components';
import { UserInfoContext } from '../../App.tsx';
import Navbar from '../../shared_components/Navbar.tsx';
import ContinueBox from './ContinueBox.tsx';
// import SaveBox from './SaveBox.tsx';
// import DeleteBox from './DeleteBox.tsx';

const StyledResultsPage = styled.div`
    border-bottom: 10px double black;
    border-right: 10px double black;
    border-left: 10px double black;
    border-radius: 10px;
    height: 800px;
    width: 1487px;
`;

export default function ResultPage({message} : {message : string}) {
    const [userInfo, _] = useContext(UserInfoContext);

    return (
        <>
            <Navbar name={userInfo.name} />
            <StyledResultsPage>
                <ContinueBox name={userInfo.name} time={userInfo.time} score={userInfo.score} message={message} />
                {/* <SaveBox  /> */}
                {/* <DeleteBox  /> */}
            </StyledResultsPage>
        </>
    )
};