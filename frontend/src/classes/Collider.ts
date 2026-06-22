import { CollisionInfo } from "../types.ts";
import Vector2 from './Vector2.ts';

class Collider {
    private _local_position : Vector2;
    private _global_position : Vector2;
    private _pixel_size : Vector2;
    private _collisionInfo : CollisionInfo;

    public constructor(pixelSize : Vector2, localPosition : Vector2, globalPosition : Vector2) {
        this._local_position = localPosition.copy();
        this._global_position = globalPosition.copy();
        this._pixel_size = pixelSize.copy();
        this._collisionInfo = {
            points : {top : 0, bottom : 0, left : 0, right : 0},
            direction : {top : false, bottom : false, left : false, right : false}
        };
    }

    public get localPosition() : Vector2 {return this._local_position;}

    public set localPosition(localPosition : Vector2) {this._local_position = localPosition.copy();}

    public get globalPosition() : Vector2 {return this._global_position;}

    public set globalPosition(globalPosition : Vector2) {this._global_position = globalPosition.copy();}

    public get pixelSize() : Vector2 {return this._pixel_size;}

    public set pixelSize(pixelSize : Vector2) {this._pixel_size = pixelSize.copy();}

    public get collisionPoints() : CollisionInfo {return this._collisionInfo;}

    public set collisionPoints(collisionInfo : CollisionInfo) {this._collisionInfo = collisionInfo;}

    public calculateCollisionPoints() : void {
        this._collisionInfo.points.top = this._local_position.top + this._global_position.top;
        this._collisionInfo.points.bottom = this._collisionInfo.points.top + this._pixel_size.top;
        this._collisionInfo.points.left = this._local_position.left + this._global_position.left;
        this._collisionInfo.points.right = this._collisionInfo.points.left + this._pixel_size.left;
    }

    public copy() : Collider {return new Collider(this._pixel_size, this._local_position, this._global_position);}

    public hasCollided(other : Collider, type : string) : boolean {
        this.calculateCollisionPoints();
        other.calculateCollisionPoints();

        if (type === 'block') {
            if (this._collisionInfo.points.top < other._collisionInfo.points.bottom && 
                (this._collisionInfo.points.left >= other._collisionInfo.points.left && 
                    this._collisionInfo.points.right <= other._collisionInfo.points.right))
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
            if (this._collisionInfo.points.top < other._collisionInfo.points.top)
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