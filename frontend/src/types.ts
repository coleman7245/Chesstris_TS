import Vector2 from "./classes/Vector2.ts";

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
  position : Vector2,
  tetrisBlock : TetrisBlock,
  finished : boolean
};

export type PlayerQueue = {
  current : Player,
  next : Player
};

export type User = {
  name : string,
  email : string,
  score : string
};

export type ChessPieces = {
    'black_bishop': ChessPiece,
    'black_king' : ChessPiece,
    'black_knight': ChessPiece,
    'black_pawn' : ChessPiece,
    'black_queen' : ChessPiece,
    'black_rook' : ChessPiece,
    'black_space' : ChessPiece,
    'white_bishop' : ChessPiece,
    'white_king' : ChessPiece,
    'white_knight' : ChessPiece,
    'white_pawn' : ChessPiece,
    'white_queen' : ChessPiece,
    'white_rook' : ChessPiece,
    'white_space' : ChessPiece,
    'blank_block' : ChessPiece
};

export type ChessPiece = {
  type : string,
  color : string,
  image_url : string | undefined
};

export type Score = {
    score : string,
    player_name : string,
    game_id : string
};

export type StageInfo = {
  size : Vector2,
  pixel_size : Vector2
};

export type Time = {
    hours : number,
    minutes : number,
    seconds : number
};