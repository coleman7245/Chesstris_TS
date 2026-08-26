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
  position : Vector2,
  tetrisBlock : TetrisBlock,
  finished : boolean
};

export type ChessPieceImages = {
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
};

export type ChessPiece = {
  type : string,
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
    startTime : number,
    finishTime : Time, 
    score : number,
    chess_piece_pixel_size : Vector2,
    stage_size : Vector2,
    current_phase : Game_Phase,
    crossed_finish_line : boolean,
    win_state : WinState,
    isPaused : boolean,
    tetris_pieces : Array<number>,
    default_start_position : Vector2,
    default_group_positions : DefaultGroupPositions
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