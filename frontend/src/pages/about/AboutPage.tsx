import { styled } from 'styled-components';

import Navbar from '../../shared_components/Navbar.tsx';

const StyledAboutPage = styled.div`
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

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <StyledAboutPage className='aboutpage'>
                Text Here.
            </StyledAboutPage>
        </>
    )
};