import { TetrisBlocks } from './types.ts';

const TETRIS_BLOCKS : TetrisBlocks = {
    0 : {
        shape : [[0]],
        images : null
    },
    l : {
            shape : [
                [0, 'l', 0, 0],
                [0, 'l', 0, 0],
                [0, 'l', 0, 0],
                [0, 'l', 0, 0],
            ],
            images : null
    },
    L : {
        shape : [
            [0, 'L', 0, 0],
            [0, 'L', 0, 0],
            [0, 'L', 0, 0],
            [0, 'L', 'L', 0]
        ],
        images : null
    },
    T : {
        shape : [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0],
        ],
        images : null
    },
  J : {
        shape : [
            [0, 0, 'J', 0],
            [0, 0, 'J', 0],
            [0, 0, 'J', 0],
            [0, 'J', 'J', 0]
        ],
        images : null
    },
  O : {
        shape : [
            ['O', 'O'],
            ['O', 'O']
        ],
        images : null
    },
  S : {
        shape : [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0]
        ],
        images : null
    },
  Z : {
        shape : [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0]
        ],
        images : null
    }
};

export default TETRIS_BLOCKS;