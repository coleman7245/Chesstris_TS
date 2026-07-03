import { useState, useContext } from 'react';

import './Board.css';

import { chess_piece_images, ChessPieceImages, tetris_block_types } from '../../utilities.ts';
import { GameContext } from '../../App.tsx';
import { TetrisPiece } from './TetrisPiece.tsx';
import Collider from '../../classes/Collider.ts';
import Vector2 from '../../classes/Vector2.ts';

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

function createRandomTetrisPiece(tetrisBlockTypes : Array<string>, sources : Array<string>, gameBoardCollider : Collider) {
    let randomIndex : number = Math.floor(Math.random() * tetrisBlockTypes.length);
    let type : string = tetrisBlockTypes[randomIndex];

    return <TetrisPiece sources={sources} type={type} gameBoardCollider={gameBoardCollider}  />;
}

function Board() {
    const [gameState] = useContext(GameContext);
    const [sources] = useState(getRandomChessPieces(chess_piece_images));
    const gameBoardCollider = new Collider(new Vector2(0, 0), new Vector2(0, 0), gameState['board_size']);

    return (
        <div className='board'>
            {createRandomTetrisPiece(tetris_block_types, sources, gameBoardCollider)}
        </div>
    )
}

export default Board;