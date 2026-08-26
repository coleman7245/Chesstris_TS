import { TetrisBlocks } from './types.ts';
import { getRandomChessPieces, chess_pieces } from './utilities.ts';

const TETRIS_BLOCKS : TetrisBlocks = {
    0 : {
        shape : [[0]],
        chess_pieces : getRandomChessPieces(chess_pieces)
    },
    l : {
            shape : [
                [0, 1, 0, 0],
                [0, 2, 0, 0],
                [0, 3, 0, 0],
                [0, 4, 0, 0],
            ],
            chess_pieces : getRandomChessPieces(chess_pieces)
    },
    L : {
        shape : [
            [0, 1, 0],
            [0, 2, 0],
            [0, 3, 4]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces)
    },
    T : {
        shape : [
            [1, 2, 3],
            [0, 4, 0],
            [0, 0, 0],
        ],
        chess_pieces : getRandomChessPieces(chess_pieces)
    },
  J : {
        shape : [
            [0, 1, 0],
            [0, 2, 0],
            [4, 3, 0]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces)
    },
  O : {
        shape : [
            [1, 2],
            [3, 4]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces)
    },
  S : {
        shape : [
            [0, 1, 2],
            [3, 4, 0],
            [0, 0, 0]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces)
    },
  Z : {
        shape : [
            [1, 2, 0],
            [0, 3, 4],
            [0, 0, 0]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces)
    }
};

export default TETRIS_BLOCKS;