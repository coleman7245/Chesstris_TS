import { useState, useCallback } from 'react';
import TETRIS_BLOCKS from '../tetrisblocks.ts';
import { TetrisBlocks, TetrisBlock, Player, GameState } from '../types.ts';
import Vector2 from '../classes/Vector2.ts';
import { copyTetrisBlockShape } from '../utilities.ts';

function createRandomTetrisBlock() : TetrisBlock {
    const selection : string = 'LJTOlSZ';
    const randomKey : keyof TetrisBlocks = selection[Math.floor(Math.random() * selection.length)] as keyof TetrisBlocks;

    return TETRIS_BLOCKS[randomKey];
};

function usePlayer(gameState : GameState) {
    const [player, setPlayer] = useState({name : gameState.player_name, 
        position : new Vector2(Math.floor(gameState.stage_size.x / gameState.chess_piece_pixel_size.x / 2), 0), 
            tetrisBlock : createRandomTetrisBlock()});

    const createPlayer = useCallback(() => setPlayer({name : gameState.player_name, 
        position : new Vector2(Math.floor(gameState.stage_size.x / gameState.chess_piece_pixel_size.x / 2), 0), 
            tetrisBlock : createRandomTetrisBlock()}), []);

    function move(velocity : Vector2) {
        setPlayer( {name : player.name, position : player.position.add(velocity), 
            tetrisBlock : {shape : copyTetrisBlockShape(player.tetrisBlock.shape), images : 
                (player.tetrisBlock.images !== null)? player.tetrisBlock.images.slice() : null}}
        );
    }

    function rotate() {
        setPlayer( {name : player.name, position : player.position.copy(), 
                tetrisBlock : {shape : player.tetrisBlock.shape.map(
                (row, y) => row.map(
                    (col, x) => col = player.tetrisBlock.shape[x].toReversed()[y]
                )
            ),
            images : (player.tetrisBlock.images !== null)? player.tetrisBlock.images.slice() : null}}
        );
    };

    return [player, createPlayer, move, rotate] as const;
};

export default usePlayer 