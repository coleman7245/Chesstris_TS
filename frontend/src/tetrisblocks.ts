import { TetrisBlocks } from './types.ts';

const TETRIS_BLOCKS : TetrisBlocks = {
    0 : {
        shape : [[0]],
        images : null
    },
    l : {
            shape : [
                [0, '1', 0, 0],
                [0, '2', 0, 0],
                [0, '3', 0, 0],
                [0, '4', 0, 0],
            ],
            images : null
    },
    L : {
        shape : [
            [0, '1', 0],
            [0, '2', 0],
            [0, '3', '4']
        ],
        images : null
    },
    T : {
        shape : [
            [0, 0, 0],
            ['1', '2', '3'],
            [0, '4', 0],
        ],
        images : null
    },
  J : {
        shape : [
            [0, '1', 0],
            [0, '2', 0],
            ['4', '3', 0]
        ],
        images : null
    },
  O : {
        shape : [
            ['1', '2'],
            ['3', '4']
        ],
        images : null
    },
  S : {
        shape : [
            [0, '1', '2'],
            ['3', '4', 0],
            [0, 0, 0]
        ],
        images : null
    },
  Z : {
        shape : [
            ['1', '2', 0],
            [0, '3', '4'],
            [0, 0, 0]
        ],
        images : null
    }
};

export default TETRIS_BLOCKS;