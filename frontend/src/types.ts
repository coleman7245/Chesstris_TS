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

export { PositionLimit, CollisionInfo };