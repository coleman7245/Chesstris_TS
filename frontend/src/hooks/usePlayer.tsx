import { useState } from 'react';
import TETRIS_BLOCKS from '../tetrisblocks.ts';
import { TetrisBlocks, TetrisBlock, Player } from '../types.ts';
import Vector2 from '../classes/Vector2.ts';

function createRandomTetrisBlock() : TetrisBlock {
    const selection : string = 'LJTOlSZ';
    const randomKey : keyof TetrisBlocks = selection[Math.floor(Math.random() * selection.length)] as keyof TetrisBlocks;

    return TETRIS_BLOCKS[randomKey];
};

function usePlayer() {
    const [player, setPlayer] = useState({position : new Vector2(0, 0), tetrisBlock : createRandomTetrisBlock()});

    function move(velocity : Vector2) {
        let newPlayer : Player = {position : player.position, tetrisBlock : player.tetrisBlock};

        newPlayer.position = newPlayer.position.add(velocity);
        
        setPlayer(newPlayer);
    }

    function rotate() {
        let newPlayer : Player = {position : player.position, tetrisBlock : player.tetrisBlock};
        let col : number = player.tetrisBlock.shape.length - 1;

        for (let y = 0; y < player.tetrisBlock.shape.length; y++) {
            for (let x = 0; x < player.tetrisBlock.shape.length; x++) {
                newPlayer.tetrisBlock.shape[y][x] = player.tetrisBlock.shape[x][col];
            }

            col--;
        }

        setPlayer(newPlayer);
    };
};

export default usePlayer 