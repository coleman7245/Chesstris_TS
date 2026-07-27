import { useState, useContext } from 'react';
import { styled } from 'styled-components';

import { chess_piece_images, ChessPieceImages, tetris_block_types } from '../../utilities.ts';
import { GameContext } from '../../App.tsx';
import { TetrisPiece } from './TetrisPiece.tsx';

const StyledStage = styled.div`
    overflow: hidden;
    border: 10px solid white;
    outline: 10px solid black;
    position: relative;
    background-color: grey;
    width: 360px;
    height: 600px;
    margin-top: 3%;
    margin-left: 5%;
`;

function getRandomChessPiece(chessPieceImages : ChessPieceImages) : string {
    let objectLength : number = Object.keys(chessPieceImages).length;
    let randomIndex : number = Math.floor(Math.random() * objectLength);

    return chessPieceImages[Object.keys(chessPieceImages)[randomIndex] as keyof ChessPieceImages];
}

function getRandomChessPieces(chessPieceImages : ChessPieceImages) : Array<string> {
    let source_images = new Array<string>;

    for (let i = 0; i < 4; i++) {
        source_images.push(getRandomChessPiece(chessPieceImages));
    }

    return source_images;
}

function createRandomTetrisPiece(tetrisBlockTypes : Array<string>, sources : Array<string>) {
    let randomIndex : number = Math.floor(Math.random() * tetrisBlockTypes.length);
    let type : string = tetrisBlockTypes[randomIndex];

    return <TetrisPiece sources={sources} type={type}/>;
}

function Stage() {
    const [gameState] = useContext(GameContext);
    const [sources] = useState(getRandomChessPieces(chess_piece_images));

    return (
        <StyledStage>
            {createRandomTetrisPiece(tetris_block_types, sources)}
        </StyledStage>
    )
}

export default Stage;