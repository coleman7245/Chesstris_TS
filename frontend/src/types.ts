type CollisionPoint = {
  left : number,
  right : number,
  top : number,
  bottom : number
}

type PositionLimit = {
  minX : number, 
  minY : number, 
  maxX : number, 
  maxY : number
}

export { PositionLimit, CollisionPoint };