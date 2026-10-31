import Vector2 from './classes/Vector2.ts';
// import { BlockStatus, ChessPieces, ChessPiece, GameState, Player, Spaces } from './types.ts';
import { BlockStatus, ChessPieces, ChessPiece, Player } from './types.ts';

export function copyBlockStatusMatrix(matrix : Array<Array<BlockStatus>>) : Array<Array<BlockStatus>> {return matrix.map((row) => row.map(col => col));};

export function copyTetrisBlockShape(matrix : Array<Array<number>>) : Array<Array<number>> {return matrix.map((row) => row.map(col => col));}

export function createStage(stageSize : Vector2, pixelSize : Vector2) : Array<Array<BlockStatus>> {
        return Array.from(new Array(Math.floor(stageSize.y / pixelSize.y)), () => 
            new Array(Math.floor(stageSize.x / pixelSize.x)).fill({type : 0, status : "cleared", 
                chess_piece : chess_pieces['blank_block']}));
};

function swap(first : number, second : number, array : Array<ChessPiece>) : void {
    let temp : ChessPiece = array[first];
    array[first] = array[second];
    array[second] = temp;
}

function randomShuffle(array : Array<ChessPiece>) : Array<ChessPiece> {
    let first : number = Math.floor(Math.random() * (array.length - 1));
    let second : number = Math.floor(Math.random() * (array.length - 1));

    for (let i : number = 0; i < array.length; i++) {
        swap(first, second, array);
        first = Math.floor(Math.random() * (array.length));
        second = Math.floor(Math.random() * (array.length));
    }

    return array;
}

function getRandomChessPiece(start : number, end : number, chessPieces : ChessPieces) : ChessPiece {
    let segmentLength : number = end - start;
    const randomIndex : number = Math.floor(Math.random() * (segmentLength + 1)) + start;

    return chessPieces[Object.keys(chessPieces)[randomIndex] as keyof ChessPieces];
};

function getSpace(chessPieces : ChessPieces, color : string) : ChessPiece {return (color === 'black')? 
    chessPieces['black_space'] : chessPieces['white_space'];}

//Notes: 
//Indices of black pieces: 0-5
//Indices of white pieces: 6-11
//Indices 12 and 13 are spaces.
//Index 14 is the blank block.
export function getRandomChessPieces(chessPieceTypes : ChessPieces) : Array<ChessPiece> {
    let chessPieces : Array<ChessPiece> = new Array<ChessPiece>();
    let currentPiece : ChessPiece = getRandomChessPiece(0, Object.keys(chessPieceTypes).length - 2, chessPieceTypes);
    let spaceNum : number = 0;
    let pieceNum : number = 0;
    let count : number = 0;
    let currentColor : string = currentPiece.color;

    do {
        chessPieces.push(currentPiece);
        if (currentPiece.type === 'space')
            spaceNum++;
        else
            pieceNum++;
        if (spaceNum < 2)
            currentPiece = getRandomChessPiece(12, 13, chessPieceTypes);
        else
            currentPiece = (currentColor === 'black')? getRandomChessPiece(0, 5, chessPieceTypes) : 
                getRandomChessPiece(6, 11, chessPieceTypes);
        count++;
    } while (count < 4);

    chessPieces = randomShuffle(chessPieces);

    return chessPieces;
};

export enum GameState {
    PLAY,
    GAME_OVER,
    START,
    PAUSE,
    PREGAME
};

// export const initialGameState : GameState = {
//     player_name : '',
//     email : '', 
//     startTime : Date.now(),
//     finishTime : {hours : 0, minutes: 0, seconds: 0}, 
//     score : 0,
//     chess_piece_pixel_size : new Vector2(30, 30),
//     stage_size : new Vector2(285, 540),
//     current_phase : Game_Phase.PREGAME,
//     crossed_finish_line : false,
//     win_state : {
//         win_pos_y : 480,
//         win_score : 18
//     },
//     isPaused : false
// };

export async function getCurrentGame(dispatch : Function) : Promise<void> {
    try {
        const response = await fetch('');
        const result = await response.json();
        dispatch({type : 'LOAD_GAME', game : result});
    }
    catch(err) {
        console.log(err);
    }
}

export async function saveCurrentGame(dispatch : Function) : Promise<void> {
    try {
        const response = await fetch('');
        const result = await response.json();
        dispatch({type : 'SAVE_GAME', game : result});
    }
    catch(err) {
        console.log(err);
    }
}

export async function overrideCurrentGame(dispatch : Function) : Promise<void> {
    try {
        const response = await fetch('');
        const result = await response.json();
        dispatch({type : 'OVERRIDE_GAME', game : result});
    }
    catch (err) {
        console.log(err);
    }
}

export const chess_pieces : ChessPieces = {
    'black_bishop': { type : 'bishop', color : 'black', image_url : '/src/assets/images/chess_black_bishop.png' },
    'black_king' : { type : 'king', color : 'black', image_url : '/src/assets/images/chess_black_king.png' },
    'black_knight': { type : 'knight', color : 'black', image_url : '/src/assets/images/chess_black_knight.png' },
    'black_pawn' : { type : 'pawn', color : 'black', image_url : '/src/assets/images/chess_black_pawn.png' },
    'black_queen' : { type : 'queen', color : 'black', image_url : '/src/assets/images/chess_black_queen.png' },
    'black_rook' : { type : 'bishop', color : 'black', image_url : '/src/assets/images/chess_black_rook.png' },
    'white_bishop' : { type : 'bishop', color : 'white', image_url : '/src/assets/images/chess_white_bishop.png' },
    'white_king' : { type : 'king', color : 'white', image_url : '/src/assets/images/chess_white_king.png' },
    'white_knight' : { type : 'knight', color : 'white', image_url : '/src/assets/images/chess_white_knight.png' },
    'white_pawn' : { type : 'pawn', color : 'white', image_url : '/src/assets/images/chess_white_pawn.png' },
    'white_queen' : { type : 'queen', color : 'white', image_url : '/src/assets/images/chess_white_queen.png' },
    'white_rook' : { type : 'bishop', color : 'white', image_url : '/src/assets/images/chess_white_rook.png' },
    'black_space' : { type : 'space', color : 'black', image_url : '/src/assets/images/space_block_b.png' },
    'white_space' : { type : 'space', color : 'white', image_url : '/src/assets/images/space_block_w.png' },
    'blank_block' : { type : 'none', color : 'none', image_url : '/src/assets/images/blank_block.png' }
};

export const tetris_block_types : Array<string> = [
    't',
    'squiggly',
    'reverse_squiggly',
    'l',
    'reverse_l',
    'square',
    'line'
];

export function hasCollided(player : Player, stage : Array<Array<BlockStatus>>, velocity : Vector2) : string {
    const newPosition = player.position.add(velocity);
    let block : BlockStatus | null = null;

    for (let y = 0; y < player.tetrisBlock.shape.length; y++) {
        for (let x = 0; x < player.tetrisBlock.shape[y].length; x++) {
            block = (newPosition.x + x < 0 || newPosition.y + y < 0 || newPosition.x + x >= stage[0].length || 
                newPosition.y + y >= stage.length)? null : stage[newPosition.y + y][newPosition.x + x];

            if (player.tetrisBlock.shape[y][x] !== 0) {
                if (newPosition.y + y >= stage.length || (block && block.status === 'finished'))
                    return 'bottom'; 
                if (newPosition.x + x < 0 || (block && block.status === 'finished'))
                    return 'left';
                if (newPosition.x + x >= stage[0].length || (block && block.status === 'finished')) 
                    return 'right'
                if (newPosition.y + y < 0 || (block && block.status === 'finished'))
                    return 'top';
            }
        }
    }

    return 'none';
};

export function clearBlock() : BlockStatus {return {type : 0, status : 'cleared', chess_piece : chess_pieces['blank_block']};};