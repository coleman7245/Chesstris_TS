import { CollisionPoints } from "../types.ts";
import Vector2 from './Vector2.ts';

class Collider {
    private _position : Vector2;
    private _pixel_size : Vector2;
    private _collisionPoints : CollisionPoints;

    public constructor(pixelSize : Vector2, position : Vector2) {
        this._position = position;
        this._pixel_size = pixelSize;
        this._collisionPoints = {top : 0, bottom : 0, left : 0, right : 0};
    }

    public get pixelSize() : Vector2 {return this._pixel_size;}

    public set pixelSize(pixelSize : Vector2) {this._pixel_size = pixelSize;}

    public get collisionPoints() : CollisionPoints {return this._collisionPoints;}

    public set collisionPoints(collisionPoints : CollisionPoints) {this._collisionPoints = collisionPoints;}

    public calculateCollisionPoints(blockPos : Vector2) : void {
        this._collisionPoints.top = this._position.top + blockPos.top;
        this._collisionPoints.bottom = this._collisionPoints.top + this._pixel_size.top;
        this._collisionPoints.left = this._collisionPoints.left + blockPos.left;
        this._collisionPoints.right = this._collisionPoints.left + this._pixel_size.left;
    }

    public hasCollided(other : Collider, parentPosition : Vector2, type : string) : boolean {
        this.calculateCollisionPoints(parentPosition);
        other.calculateCollisionPoints(new Vector2 (0, 0));
        console.log(this._collisionPoints);
        console.log(other._collisionPoints);

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
            if (this._collisionPoints.top >= other.collisionPoints.bottom)
                return true;
            if (this._collisionPoints.bottom <= other.collisionPoints.top)
                return true;
            if (this._collisionPoints.left <= other.collisionPoints.right)
                return true;
            if (this._collisionPoints.right >= other.collisionPoints.left)
                return true;
        }
        
        return false;
    }
}

export default Collider;