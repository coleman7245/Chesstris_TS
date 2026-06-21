import { CollisionPoints } from "../types.ts";
import Vector2 from './Vector2.ts';

class Collider {
    private _local_position : Vector2;
    private _global_position : Vector2;
    private _pixel_size : Vector2;
    private _collisionPoints : CollisionPoints;

    public constructor(pixelSize : Vector2, localPosition : Vector2, globalPosition : Vector2) {
        this._local_position = localPosition.copy();
        this._global_position = globalPosition.copy();
        this._pixel_size = pixelSize.copy();
        this._collisionPoints = {top : 0, bottom : 0, left : 0, right : 0};
    }

    public get localPosition() : Vector2 {return this._local_position;}

    public set localPosition(localPosition : Vector2) {this._local_position = localPosition.copy();}

    public get globalPosition() : Vector2 {return this._global_position;}

    public set globalPosition(globalPosition : Vector2) {this._global_position = globalPosition.copy();}

    public get pixelSize() : Vector2 {return this._pixel_size;}

    public set pixelSize(pixelSize : Vector2) {this._pixel_size = pixelSize.copy();}

    public get collisionPoints() : CollisionPoints {return this._collisionPoints;}

    public set collisionPoints(collisionPoints : CollisionPoints) {this._collisionPoints = collisionPoints;}

    public calculateCollisionPoints() : void {
        this._collisionPoints.top = this._local_position.top + this._global_position.top;
        this._collisionPoints.bottom = this._collisionPoints.top + this._pixel_size.top;
        this._collisionPoints.left = this._local_position.left + this._global_position.left;
        this._collisionPoints.right = this._collisionPoints.left + this._pixel_size.left;
    }

    public copy() : Collider {return new Collider(this._pixel_size, this._local_position, this._global_position);}

    public hasCollided(other : Collider, type : string) : boolean {
        this.calculateCollisionPoints();
        other.calculateCollisionPoints();

        if (type === 'block') {
            if (this._collisionPoints.top <= other.collisionPoints.bottom)
                return true;
            if (this._collisionPoints.bottom >= other.collisionPoints.top)
                return true;
            if (this._collisionPoints.left >= other.collisionPoints.right)
                return true;
            if (this._collisionPoints.right <= other.collisionPoints.left)
                return true;
        }
        else {
            if (this._collisionPoints.bottom >= other.collisionPoints.bottom)
                return true;
            if (this._collisionPoints.top <= other.collisionPoints.top)
                return true;
            if (this._collisionPoints.left <= other.collisionPoints.left)
                return true;
            if (this._collisionPoints.right >= other.collisionPoints.right)
                return true;
        }
        
        return false;
    }
}

export default Collider;