import { useContext } from 'react';
import { styled } from 'styled-components';

// import { chess_piece_images, tetris_block_types } from '../../utilities.ts';
import { GameContext } from '../../App.tsx';
import Block from './Block.tsx';
import { BlockStatus } from '../../types.ts';
import Vector2 from '../../classes/Vector2.ts';

const StyledStage = styled.div<{$blockSize : Vector2, height : number, width : number}>`
    display: grid;
    overflow: hidden;
    grid-template-rows: repeat(${props => Math.floor(props.height / props.$blockSize.y)}, 1fr);
    grid-template-columns: repeat(${props => Math.floor(props.width / props.$blockSize.x)}, 1fr);
    border: 10px solid white;
    outline: 10px solid black;
    position: relative;
    background-color: grey;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin-top: 3%;
    margin-left: 5%;
`;

function Stage({stage} : {stage : Array<Array<BlockStatus>>}) {
    const [gameState] = useContext(GameContext);

    return (
        <StyledStage $blockSize={gameState.chess_piece_pixel_size} height={gameState.stage_size.y} width={gameState.stage_size.x}>
            {stage.map((row) => row.map((block, x) => <Block status={block['status']} key={x} type={block['type']} 
                image_url={block['image_url']} />))}
        </StyledStage>
    )
};

export default Stage;