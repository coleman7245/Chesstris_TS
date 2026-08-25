import { TetrisBlocks } from './types.ts';
import { getRandomChessPieces, chess_piece_images } from './utilities.ts';

const TETRIS_BLOCKS : TetrisBlocks = {
    0 : {
        shape : [[0]],
        images : getRandomChessPieces(chess_piece_images)
    },
    l : {
            shape : [
                [0, 1, 0, 0],
                [0, 2, 0, 0],
                [0, 3, 0, 0],
                [0, 4, 0, 0],
            ],
            images : getRandomChessPieces(chess_piece_images)
    },
    L : {
        shape : [
            [0, 1, 0],
            [0, 2, 0],
            [0, 3, 4]
        ],
        images : getRandomChessPieces(chess_piece_images)
    },
    T : {
        shape : [
            [1, 2, 3],
            [0, 4, 0],
            [0, 0, 0],
        ],
        images : getRandomChessPieces(chess_piece_images)
    },
  J : {
        shape : [
            [0, 1, 0],
            [0, 2, 0],
            [4, 3, 0]
        ],
        images : getRandomChessPieces(chess_piece_images)
    },
  O : {
        shape : [
            [1, 2],
            [3, 4]
        ],
        images : getRandomChessPieces(chess_piece_images)
    },
  S : {
        shape : [
            [0, 1, 2],
            [3, 4, 0],
            [0, 0, 0]
        ],
        images : getRandomChessPieces(chess_piece_images)
    },
  Z : {
        shape : [
            [1, 2, 0],
            [0, 3, 4],
            [0, 0, 0]
        ],
        images : getRandomChessPieces(chess_piece_images)
    }
};

export default TETRIS_BLOCKS;