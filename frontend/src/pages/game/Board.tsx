import { useState } from 'react';

import './Board.css';

import { chess_piece_images, ChessPieceImages, tetris_block_types } from '../../utilities.ts';
import { TetrisPiece } from './TetrisPiece.tsx';

function getRandomChessPiece(chessPieceImages : ChessPieceImages) : string {
    let objectLength : number = Object.keys(chessPieceImages).length;
    let randomIndex : number = Math.floor(Math.random() * objectLength);

    return chessPieceImages[Object.keys(chessPieceImages)[randomIndex] as keyof ChessPieceImages];
}

function getRandomChessPieces(chessPieceImages : ChessPieceImages) {
    let source_images = new Array<string>;

    for (let i = 0; i < 4; i++) {
        source_images.push(getRandomChessPiece(chessPieceImages));
    }

    return source_images;
}

function createRandomTetrisPiece(tetrisBlockTypes : Array<string>, sources : Array<string>) {
    let randomIndex = Math.floor(Math.random() * tetrisBlockTypes.length);
    let type = tetrisBlockTypes[randomIndex];

    return <TetrisPiece sources={sources} type={type}  />;
}

function Board() {
    const [sources] = useState(getRandomChessPieces(chess_piece_images));

    return (
        <div className='board'>
            {createRandomTetrisPiece(tetris_block_types, sources)}
        </div>
    )
}

export default Board;