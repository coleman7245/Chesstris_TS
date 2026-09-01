import { TetrisBlocks } from './types.ts';
import { getRandomChessPieces, chess_pieces, spaces } from './utilities.ts';

const TETRIS_BLOCKS : TetrisBlocks = {
    0 : {
        shape : [[0]],
        chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    },
    l : {
            shape : [
                [0, 1, 0, 0],
                [0, 2, 0, 0],
                [0, 3, 0, 0],
                [0, 4, 0, 0],
            ],
            chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    },
    L : {
        shape : [
            [0, 1, 0],
            [0, 2, 0],
            [0, 3, 4]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    },
    T : {
        shape : [
            [1, 2, 3],
            [0, 4, 0],
            [0, 0, 0],
        ],
        chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    },
  J : {
        shape : [
            [0, 1, 0],
            [0, 2, 0],
            [4, 3, 0]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    },
  O : {
        shape : [
            [1, 2],
            [3, 4]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    },
  S : {
        shape : [
            [0, 1, 2],
            [3, 4, 0],
            [0, 0, 0]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    },
  Z : {
        shape : [
            [1, 2, 0],
            [0, 3, 4],
            [0, 0, 0]
        ],
        chess_pieces : getRandomChessPieces(chess_pieces, spaces)
    }
};

export default TETRIS_BLOCKS;