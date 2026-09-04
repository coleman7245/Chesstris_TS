import { styled } from 'styled-components';

const StyledChessImage = styled.img<{type? : number, image_url? : string | undefined}>`
    position: relative;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background-color: ${props => (props.type !== 0)? 'white' : 'rgba(0, 0, 0, 0)'};
`;

export default function Block({type, image_url} : {type : number, image_url : string | undefined}) {
    return <StyledChessImage type={type} src={image_url} />
};