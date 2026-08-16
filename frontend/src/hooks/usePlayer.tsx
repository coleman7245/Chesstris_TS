import { useState, useCallback } from 'react';
import TETRIS_BLOCKS from '../tetrisblocks.ts';
import { TetrisBlocks, TetrisBlock, Player, GameState } from '../types.ts';
import Vector2 from '../classes/Vector2.ts';

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
        let newPlayer : Player = {name : gameState.player_name, position : player.position, tetrisBlock : player.tetrisBlock};

        newPlayer.position = newPlayer.position.add(velocity);
        setPlayer(newPlayer);
    }

    function rotate() {
        let newPlayer : Player = {name : gameState.player_name, position : player.position, tetrisBlock : player.tetrisBlock};
        let col : number = player.tetrisBlock.shape.length - 1;

        for (let y = 0; y < player.tetrisBlock.shape.length; y++) {
            for (let x = 0; x < player.tetrisBlock.shape.length; x++) {
                newPlayer.tetrisBlock.shape[y][x] = player.tetrisBlock.shape[x][col];
            }

            col--;
        }

        setPlayer(newPlayer);
    };

    return [player, createPlayer, move, rotate] as const;
};

export default usePlayer 