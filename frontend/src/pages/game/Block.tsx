import { prototypejs } from 'globals';
import { styled } from 'styled-components';

const StyledBlock = styled.div<{$image_url? : string}>`
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background-color: grey;
`;

function Block({image_url} : {image_url : string}) {
    return <StyledBlock><img src={image_url}></img></StyledBlock>
}

export default Block;