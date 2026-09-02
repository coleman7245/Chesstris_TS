import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import home_pic from '../../assets/images/chess_homepage_image.jpg';

const StyledHomePage = styled.div`
    font: 8em 'Georgia';
    text-align: center;
    color: black;
    background-color: white;
    border: 10px double black;
    border-radius: 10px;
    height: 800px;
    width: 1400px;
    margin: 0 5%;
`;

const StyledHomeImage = styled.img`
    border: 10px double black;
    size: 600px 600px;
`;

const StyledHomeButton = styled.button`
    border: 10px double black;
    background-color: white;
    margin: 0 10px;
    padding: 2% 2%;
    border-radius: 10px;
    font-weight: bold;
`;

function HomePage() {
    return (
        <StyledHomePage>
            This is Chesstris <br />
            <StyledHomeImage src={home_pic} /> <br />
            <Link to='/game'>
                <StyledHomeButton>
                    NEW GAME
                </StyledHomeButton>
            </Link>
            <Link to='/rankings'>
                <StyledHomeButton>
                    RANKINGS
                </StyledHomeButton>
            </Link>
            <Link to='/rules'>
                <StyledHomeButton>
                    RULES
                </StyledHomeButton>
            </Link>
            <Link to='/about'>
                <StyledHomeButton>
                    ABOUT
                </StyledHomeButton>
            </Link>
        </StyledHomePage>
    );
}

export default HomePage;