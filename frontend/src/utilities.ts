import Player from './classes/Player.ts';

type Score = {
    score : number,
    player_name : string,
    game_id : string
};

type Action = {
    type : string,
    player : Player,
    hasScored : boolean,
    crossedFinishLine : boolean
}

type GameState = {
    player_name : string, 
    startTime : number,
    finishTime : Time, 
    score : number,
    board_size : Dimensions,
    current_phase : Game_Phase,
    crossed_finish_line : boolean,
    win_state : WinState,
    isPaused : boolean,
    tetris_pieces : Array<number>,
    default_block_position: Array<number>
}

type WinState = {
    win_pos_y : number,
    win_score : number
}

type Time = {
    hours : number,
    minutes : number,
    seconds : number
}

type Dimensions = {
    width : number,
    height : number
}

type State = {

}

enum Game_Phase {
    PLAYING,
    LOST,
    WON,
    NOT_RUNNING,
    PAUSED
}

const initialGameState : GameState = {
    player_name : '', 
    startTime : Date.now(),
    finishTime : {hours : 0, minutes: 0, seconds: 0}, 
    score : 0,
    board_size : {
        width: 360,
        height: 600
    },
    current_phase : Game_Phase.PLAYING,
    crossed_finish_line : false,
    win_state : {
        win_pos_y : 480,
        win_score : 18
    },
    isPaused : false,
    tetris_pieces : [],
    default_block_position: []
}

async function getCurrentGame(dispatch : Function) : Promise<void> {
    try {
        const response = await fetch('');
        const result = await response.json();
        dispatch({type : 'LOAD_GAME', game : result});
    }
    catch(err) {
        console.log(err);
    }
}

async function saveCurrentGame(dispatch : Function) : Promise<void> {
    try {
        const response = await fetch('');
        const result = await response.json();
        dispatch({type : 'SAVE_GAME', game : result});
    }
    catch(err) {
        console.log(err);
    }
}

async function overrideCurrentGame(dispatch : Function) : Promise<void> {
    try {
        const response = await fetch('');
        const result = await response.json();
        dispatch({type : 'OVERRIDE_GAME', game : result});
    }
    catch (err) {
        console.log(err);
    }
}

type ChessPieceImages = {
    'black_bishop': string,
    'black_king' : string,
    'black_knight': string,
    'black_pawn' : string,
    'black_queen' : string,
    'black_rook' : string,
    'white_bishop' : string,
    'white_king' : string,
    'white_knight' : string,
    'white_pawn' : string,
    'white_queen' : string,
    'white_rook' : string
}

const chess_piece_images : ChessPieceImages = {
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

const tetris_block_types : Array<string> = [
    't',
    'squiggly',
    'reverseSquiggly',
    'l',
    'reverseL',
    'square',
    'line'
];

export { ChessPieceImages, WinState, State, Time, Player, Score, Action, GameState, initialGameState, Game_Phase, getCurrentGame, saveCurrentGame, overrideCurrentGame, chess_piece_images, tetris_block_types }; 