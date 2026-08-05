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
    const [player, setPlayer] = useState({position : new Vector2(0, 0), tetrisBlocks : createRandomTetrisBlock()});
};

function copy(matrix : Array<Array<TetrisBlock>>) {
  let copy = new Array(matrix.length);

  for (let y = 0; y < copy.length; y++) {
    copy[y] = matrix[y].slice();
  }

  return copy;
};

function rotate(matrix : Array<Array<TetrisBlock>>) {
  if (matrix.length !== 0 && matrix.length === matrix[0].length) {
    let rotated = copy(matrix);
    let col = matrix.length - 1;

    for (let y = 0; y < matrix.length; y++) {
      for (let x = 0; x < matrix.length; x++) {
        rotated[y][x] = matrix[x][col];
      }

      col--;
    }

    return rotated;
  } else return matrix;
};

export { usePlayer, rotate }