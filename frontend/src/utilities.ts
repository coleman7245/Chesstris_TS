import Vector2 from './classes/Vector2.ts';
import { BlockStatus, ChessPieceImages, ChessPiece, GameState, Player, Time } from './types.ts';
import { SetStateAction, Dispatch } from 'react';

export function copyBlockStatusMatrix(matrix : Array<Array<BlockStatus>>) : Array<Array<BlockStatus>> {return matrix.map((row) => row.map(col => col));};

export function copyTetrisBlockShape(matrix : Array<Array<number>>) : Array<Array<number>> {return matrix.map((row) => row.map(col => col));}

export function createStage(stageSize : Vector2, pixelSize : Vector2) : Array<Array<BlockStatus>> {
        return Array.from(new Array(Math.floor(stageSize.y / pixelSize.y)), () => 
            new Array(Math.floor(stageSize.x / pixelSize.x)).fill({type : 0, status : "cleared", 
                chess_piece : {type : 'none', image_url : undefined}}));
};

function getRandomChessPiece(chessPieceImages : ChessPieceImages) : ChessPiece {
    const randomIndex : number = Math.floor(Math.random() * Object.keys(chessPieceImages).length);

    return {type : Object.keys(chessPieceImages)[randomIndex], image_url : chessPieceImages[Object.keys(chessPieceImages)[randomIndex] as keyof ChessPieceImages]};
};

export function getRandomChessPieces(chessPieceImages : ChessPieceImages) : Array<ChessPiece> {
    const source_images : Array<ChessPiece> = new Array<ChessPiece>();

    for (let i = 0; i < 4; i++) {
        source_images.push(getRandomChessPiece(chessPieceImages));
    }

    return source_images;
};

export enum Game_Phase {
    PLAY,
    LOSE,
    WIN,
    START,
    PAUSE,
    PREGAME
};

export const initialGameState : GameState = {
    player_name : '', 
    startTime : Date.now(),
    finishTime : {hours : 0, minutes: 0, seconds: 0}, 
    score : 0,
    chess_piece_pixel_size : new Vector2(30, 30),
    stage_size : new Vector2(285, 540),
    current_phase : Game_Phase.PREGAME,
    crossed_finish_line : false,
    win_state : {
        win_pos_y : 480,
        win_score : 18
    },
    isPaused : false,
    tetris_pieces : [],
    default_start_position : new Vector2(30, 180),
    default_group_positions : {
        't' : [new Vector2(0, 0), new Vector2(0, 30), new Vector2(0, -30), new Vector2(30, 0)],
        'squiggly' : [new Vector2(15, -30), new Vector2(15, 0), new Vector2(-15, 0), new Vector2(-15, 30)],
        'reverse_squiggly' : [new Vector2(15, 30), new Vector2(15, 0), new Vector2(-15, 0), new Vector2(-15, -30)],
        'l' : [new Vector2(30, 15), new Vector2(30, -15), new Vector2(0, -15), new Vector2(-30, -15)],
        'reverse_l' : [new Vector2(30, -15), new Vector2(30, 15), new Vector2(0, 15), new Vector2(-30, 15)],
        'square' : [new Vector2(-15, 15), new Vector2(-15, -15), new Vector2(15, -15), new Vector2(15, 15)],
        'line' : [new Vector2(0, -45), new Vector2(0, -15), new Vector2(0, 15), new Vector2(0, 45)]
    }
};

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

export const chess_piece_images : ChessPieceImages = {
    'black_bishop': '/src/assets/images/chess_black_bishop.png',
    'black_king' : '/src/assets/images/chess_black_king.png',
    'black_knight': '/src/assets/images/chess_black_knight.png',
    'black_pawn' : '/src/assets/images/chess_black_pawn.png',
    'black_queen' : '/src/assets/images/chess_black_queen.png',
    'black_rook' : '/src/assets/images/chess_black_rook.png',
    'white_bishop' : '/src/assets/images/chess_white_bishop.png',
    'white_king' : '/src/assets/images/chess_white_king.png',
    'white_knight' : '/src/assets/images/chess_white_knight.png',
    'white_pawn' : '/src/assets/images/chess_white_pawn.png',
    'white_queen' : '/src/assets/images/chess_white_queen.png',
    'white_rook' : '/src/assets/images/chess_white_rook.png'
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

// export function getTime(startTime : number) : Time {
//     let currentTime : number = Date.now() - startTime;
//     let seconds : number = currentTime / 1000;
//     let minutes : number = seconds / 60;
//     let hours : number = minutes / 60;

//     let gameTime : Time = {
//         seconds : (seconds >= 60) ? Math.floor(seconds - (Math.floor(minutes) * 60)) : Math.floor(seconds),
//         minutes : (minutes >= 60) ? Math.floor(minutes - (Math.floor(hours) * 60)) : Math.floor(minutes),
//         hours : Math.floor(hours)
//     }

//     return gameTime;
// };

export function getTime(currentTime : number | Dispatch<SetStateAction<number>>) : Time {
    let seconds : number = (currentTime as number) / 1000;
    let minutes : number = seconds / 60;
    let hours : number = minutes / 60;

    let gameTime : Time = {
        seconds : (seconds >= 60) ? Math.floor(seconds - (Math.floor(minutes) * 60)) : Math.floor(seconds),
        minutes : (minutes >= 60) ? Math.floor(minutes - (Math.floor(hours) * 60)) : Math.floor(minutes),
        hours : Math.floor(hours)
    }

    return gameTime;
};