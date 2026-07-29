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
  shape : Array<Array<string | number>>,
  images : Array<string | null> | null;
};

type TetrisBlocks = {
  0 : BlockStatus,
  l : BlockStatus,
  L : BlockStatus,
  T : BlockStatus,
  J : BlockStatus,
  O : BlockStatus,
  S : BlockStatus,
  Z : BlockStatus
};

export { PositionLimit, CollisionInfo, TetrisBlocks };