import Vector2 from "./classes/Vector2.ts";
import { Game_Phase } from "./utilities.ts";

export type PositionLimit = {
  minX : number, 
  minY : number, 
  maxX : number, 
  maxY : number
};

export type CollisionPoints = {
  top : number,
  bottom : number,
  left : number,
  right : number
};

export type CollisionDirection = {
  top : boolean,
  bottom : boolean,
  left : boolean,
  right : boolean
};

// export type CollisionInfo = {
//   points : CollisionPoints,
//   direction : CollisionDirection
// };

export type CollisionInfo = {
  collision : boolean,
  direction : string
}

export type BlockStatus = {
  type : number,
  status : string,
  chess_piece : ChessPiece
};

export type TetrisBlock = {
  shape : Array<Array<number>>,
  chess_pieces : Array<ChessPiece>;
};

export type TetrisBlocks = {
  0 : TetrisBlock,
  l : TetrisBlock,
  L : TetrisBlock,
  T : TetrisBlock,
  J : TetrisBlock,
  O : TetrisBlock,
  S : TetrisBlock,
  Z : TetrisBlock
};

export type Player = {
  name : string,
  email : string,
  position : Vector2,
  tetrisBlock : TetrisBlock,
  finished : boolean
};

export type ChessPieces = {
    'black_bishop': ChessPiece,
    'black_king' : ChessPiece,
    'black_knight': ChessPiece,
    'black_pawn' : ChessPiece,
    'black_queen' : ChessPiece,
    'black_rook' : ChessPiece,
    'white_bishop' : ChessPiece,
    'white_king' : ChessPiece,
    'white_knight' : ChessPiece,
    'white_pawn' : ChessPiece,
    'white_queen' : ChessPiece,
    'white_rook' : ChessPiece,
    'blank_block' : ChessPiece
};

export type Spaces = {
    'white_space' : ChessPiece,
    'black_space' : ChessPiece,
};

export type ChessPiece = {
  type : string,
  color : string,
  image_url : string | undefined
};

export type Score = {
    score : number,
    player_name : string,
    game_id : string
};

export type Action = {
    type : string,
    player : Player,
    hasScored : boolean,
    crossedFinishLine : boolean
};

export type DefaultGroupPositions = {
    t : Array<Vector2>,
    squiggly : Array<Vector2>,
    reverse_squiggly : Array<Vector2>,
    l : Array<Vector2>,
    reverse_l : Array<Vector2>,
    square : Array<Vector2>,
    line : Array<Vector2>
};

export type GameState = {
    player_name : string,
    email : string, 
    startTime : number,
    finishTime : Time, 
    score : number,
    chess_piece_pixel_size : Vector2,
    stage_size : Vector2,
    current_phase : Game_Phase,
    crossed_finish_line : boolean,
    win_state : WinState,
    isPaused : boolean,
    tetris_pieces : Array<number>
};

export type WinState = {
    win_pos_y : number,
    win_score : number
};

export type Time = {
    hours : number,
    minutes : number,
    seconds : number
};