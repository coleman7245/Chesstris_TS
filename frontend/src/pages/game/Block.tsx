import { styled } from 'styled-components';

const StyledBlock = styled.div<{type? : string | number}>`
    width: 30px;
    overflow: hidden;
    height: 30px;
    border: 1px solid black;
    background-color: ${props => (props.type === 0)? 'white' : 'rgba(0, 0, 0, 0)'};
`;

function Block({type, image_url} : {type : string | number, image_url : string | undefined}) {
    return <StyledBlock type={type}><img src={image_url}></img></StyledBlock>
}

export default Block;