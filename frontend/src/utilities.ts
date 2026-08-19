import Vector2 from './classes/Vector2.ts';
import Collider from './classes/Collider.ts';
import { BlockStatus, ChessPieceImages, GameState, Player } from './types.ts';

export function copyBlockStatusMatrix(matrix : Array<Array<BlockStatus>>) : Array<Array<BlockStatus>> {return matrix.map((row) => row.map(col => col));};

export function copyTetrisBlockShape(matrix : Array<Array<string | number>>) : Array<Array<string | number>> {return matrix.map((row) => row.map(col => col));}

export function createStage(stageSize : Vector2) : Array<Array<BlockStatus>> {
        return Array.from(new Array(Math.floor(stageSize.y / 30)), () => 
            new Array(Math.floor(stageSize.x / 30)).fill({type : 0, status : 'clear'}));
};

function getRandomChessPiece(chessPieceImages : ChessPieceImages) : string {
    const randomIndex : number = Math.floor(Math.random() * Object.keys(chessPieceImages).length);

    return chessPieceImages[Object.keys(chessPieceImages)[randomIndex] as keyof ChessPieceImages];
};

export function getRandomChessPieces(chessPieceImages : ChessPieceImages) : Array<string> | null {
    const source_images : Array<string> = new Array<string>();

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
    stage_size : new Vector2(285, 600),
    stage_collider : new Collider('stage', new Vector2(0, 0), new Vector2(0, 0), new Vector2(600, 360)),
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

export function hasCollided(player : Player, stage : Array<Array<BlockStatus>>, velocity : Vector2) : boolean {
    const newPosition = player.position.add(velocity);

    for (let y = 0; y < player.tetrisBlock.shape.length; y++) { 
        for (let x = 0; x < player.tetrisBlock.shape[y].length; x++) {
            console.log(newPosition.x + x, newPosition.y + y);
            if (player.tetrisBlock.shape[y][x] !== 0 && (newPosition.x + x < 0 || newPosition.x + x >= stage[0].length || newPosition.y + y < 0 || newPosition.y + y >= stage.length)) {
                console.log("Collision detected!");
                return true;
            }
        }
    }

    return false;
};