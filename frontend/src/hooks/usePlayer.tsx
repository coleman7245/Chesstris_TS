import { useState, useCallback } from 'react';
import TETRIS_BLOCKS from '../tetrisblocks.ts';
import { TetrisBlocks, TetrisBlock, GameState, Player, BlockStatus } from '../types.ts';
import Vector2 from '../classes/Vector2.ts';
import { copyTetrisBlockShape, hasCollided } from '../utilities.ts';

function createRandomTetrisBlock() : TetrisBlock {
    const selection : string = 'LJTOlSZ';
    const randomKey : keyof TetrisBlocks = selection[Math.floor(Math.random() * selection.length)] as keyof TetrisBlocks;

    return TETRIS_BLOCKS[randomKey];
};

function usePlayer(gameState : GameState) {
    const [player, setPlayer] = useState({name : gameState.player_name, 
        position : new Vector2(Math.floor(gameState.stage_size.x / gameState.chess_piece_pixel_size.x / 2), 0), 
            tetrisBlock : createRandomTetrisBlock(), finished : false});

    const createPlayer = useCallback(() => setPlayer({name : gameState.player_name, 
        position : new Vector2(Math.floor(gameState.stage_size.x / gameState.chess_piece_pixel_size.x / 2), 0), 
            tetrisBlock : createRandomTetrisBlock(), finished : false}), []);

    function move(velocity : Vector2, finished : boolean) {
        setPlayer({name : player.name, position : player.position.add(velocity), 
            tetrisBlock : {shape : copyTetrisBlockShape(player.tetrisBlock.shape), images : 
                (player.tetrisBlock.images !== null)? player.tetrisBlock.images.slice() : null}, finished : finished}
        );
    }

    function rotate() : Array<Array<number>> {
        return player.tetrisBlock.shape.map(
            (row, y) => row.map(
                (col, x) => col = player.tetrisBlock.shape[x].toReversed()[y]
            )
        );
    };

    function rotatePlayer(stage : Array<Array<BlockStatus>>) : void {
        const rotatedPlayer : Player = {name : player.name, position : player.position.copy(), 
            tetrisBlock : {shape : rotate(), 
                images : (player.tetrisBlock.images !== null)? player.tetrisBlock.images.slice() : null}, finished : player.finished};

        for (let dir = hasCollided(rotatedPlayer, stage, Vector2.zero()); dir !== 'none'; 
            dir = hasCollided(rotatedPlayer, stage, Vector2.zero())) {
                if (dir === 'left')
                    rotatedPlayer.position = rotatedPlayer.position.add(new Vector2(1, 0));
                else if (dir === 'right')
                    rotatedPlayer.position = rotatedPlayer.position.add(new Vector2(-1, 0));
                else if (dir === 'top')
                    rotatedPlayer.position = rotatedPlayer.position.add(new Vector2(0, 1));
                else if (dir === 'bottom')
                    rotatedPlayer.position = rotatedPlayer.position.add(new Vector2(0, -1));
        }

        setPlayer(rotatedPlayer);
    };

    return [player, createPlayer, move, rotatePlayer] as const;
};

export default usePlayer 