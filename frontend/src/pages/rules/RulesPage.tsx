import { styled } from 'styled-components';
import Navbar from '../../shared_components/Navbar.jsx';

const StyledRulesPage = styled.div`
    font: 8em 'Georgia';
    text-align: center;
    color: black;
    background-color: white;
    border-bottom: 10px double black;
    border-right: 10px double black;
    border-left: 10px double black;
    border-radius: 10px;
    height: 800px;
    width: 1487px;
`;

export default function RulesPage() {
    return (
        <>
            <Navbar />
            <StyledRulesPage className='rulespage'>Text Here.</StyledRulesPage>
        </>
    );
};