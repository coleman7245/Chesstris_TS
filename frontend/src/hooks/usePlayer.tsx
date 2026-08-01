import { useState } from 'react';
import TETRIS_BLOCKS from '../tetrisblocks.ts';
import { TetrisBlocks, TetrisBlock, Player } from '../types.ts';
import Vector2 from '../classes/Vector2.ts';

function createRandomTetrisBlock() : TetrisBlock {
    const selection : string = 'LJTOlSZ';
    const randomKey : keyof TetrisBlocks = selection[Math.floor(Math.random() * selection.length)] as keyof TetrisBlocks;

    return TETRIS_BLOCKS[randomKey];
};

const [player, setPlayer] = useState({position : new Vector2(0, 0), tetrisBlocks : createRandomTetrisBlock()});

function usePlayer() {

};

export { usePlayer, }