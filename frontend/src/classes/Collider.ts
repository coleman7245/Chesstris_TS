import { CollisionInfo } from "../types.ts";
import Vector2 from './Vector2.ts';

class Collider {
    private _center : Vector2;
    private _size : Vector2;
    private _position : Vector2;
    private _global_position : Vector2;
    private _collisionInfo : CollisionInfo;

    public constructor(position : Vector2, globalPosition : Vector2, size : Vector2) {
        this._position = position.copy();
        this._global_position = globalPosition;
        this._size = size.copy();
        this._center = this._position.add(globalPosition).add(size.scale(-.05));
        this._collisionInfo = {
            points : {top : 0, bottom : 0, left : 0, right : 0},
            direction : {top : false, bottom : false, left : false, right : false}
        };
    }

    public get center() : Vector2 {return this._center;}

    public set center(center : Vector2) {this._center = center.copy();}

    public get collisionInfo() : CollisionInfo {return this._collisionInfo;}

    public set collisionInfo(collisionInfo : CollisionInfo) {this._collisionInfo = collisionInfo;}

    public get globalPosition() : Vector2 {return this._global_position;}

    public get position() : Vector2 {return this._position;}

    public set position(position : Vector2) {this._position = position.copy();}

    public get size() : Vector2 {return this._size;}
    
    public set size(size : Vector2) {this._size = size.copy();}

    public calculateCollisionPoints() : void {
        this._collisionInfo.points.top = this._position.top + this._global_position.top;
        this._collisionInfo.points.bottom = this._collisionInfo.points.top + this._size.top;
        this._collisionInfo.points.left = this._position.left + this._global_position.left;
        this._collisionInfo.points.right = this._collisionInfo.points.left + this._size.left;
    }

    public copy() : Collider {return new Collider(this._position, this._global_position, this._size);}

    public hasCollided(other : Collider, type : string) : boolean {
        this.calculateCollisionPoints();
        other.calculateCollisionPoints();

        if (type === 'block') {
            if (this._collisionInfo.points.top < other._collisionInfo.points.bottom && 
                (this._collisionInfo.points.left <= other._collisionInfo.points.right || 
                    this._collisionInfo.points.right >= other._collisionInfo.points.left))
                return true;
            if (this._collisionInfo.points.bottom > other._collisionInfo.points.top)
                return true;
            if (this._collisionInfo.points.left > other._collisionInfo.points.right)
                return true;
            if (this._collisionInfo.points.right < other._collisionInfo.points.left)
                return true;
        }
        else {
            if (this._collisionInfo.points.bottom > other._collisionInfo.points.bottom)
                return true;
            if (this._collisionInfo.points.left < other._collisionInfo.points.left) 
                return true;
            if (this._collisionInfo.points.right > other._collisionInfo.points.right)
                return true;
        }
        
        return false;
    }
}

export default Collider;