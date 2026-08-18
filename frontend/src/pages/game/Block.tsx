import { styled } from 'styled-components';

const StyledBlock = styled.div<{type? : string | number, status? : string}>`
    position: relative;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background-color: ${props => (props.type !== 0)? 'white' : 'rgba(0, 0, 0, 0)'};
`;

const StyledChessImage = styled.img<{type? : string | number, status? : string, image_url? : string | undefined}>`
    position: relative;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background-color: ${props => (props.type !== 0)? 'white' : 'rgba(0, 0, 0, 0)'};
`;

function Block({type, status, image_url} : {type : string | number, status : string, image_url : string | undefined}) {
    return (type !== 0)? <StyledChessImage type={type} status={status} src={image_url} /> : 
        <StyledBlock type={type} status={status} />
}

export default Block;