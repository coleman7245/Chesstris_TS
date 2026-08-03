import Vector2 from "./classes/Vector2.ts"

type PositionLimit = {
  minX : number, 
  minY : number, 
  maxX : number, 
  maxY : number
}

type CollisionPoints = {
  top : number,
  bottom : number,
  left : number,
  right : number
}

type CollisionDirection = {
  top : boolean,
  bottom : boolean,
  left : boolean,
  right : boolean
}

type CollisionInfo = {
  points : CollisionPoints,
  direction : CollisionDirection
}

type BlockStatus = {
  type : string | number,
  status : string,
  image_url : string | undefined
};

type TetrisBlock = {
  shape : Array<Array<string | number>>,
  images : Array<string> | null;
};

type TetrisBlocks = {
  0 : TetrisBlock,
  l : TetrisBlock,
  L : TetrisBlock,
  T : TetrisBlock,
  J : TetrisBlock,
  O : TetrisBlock,
  S : TetrisBlock,
  Z : TetrisBlock
};

type Player = {
  position : Vector2,
  tetrisBlocks : TetrisBlocks
};

export { PositionLimit, CollisionInfo, BlockStatus, TetrisBlock, TetrisBlocks, Player };