import { CollisionPoints } from "../types.ts";
import Vector2 from './Vector2.ts';

class Collider {
    private _pixel_size : Vector2;
    private _collisionPoints : CollisionPoints;

    public constructor(pixelSize : Vector2) {
        this._pixel_size = pixelSize;
        this._collisionPoints = {top : 0, bottom : 0, left : 0, right : 0};
    }

    public get pixelSize() : Vector2 {return this._pixel_size;}

    public set pixelSize(pixelSize : Vector2) {this._pixel_size = pixelSize;}

    public get collisionPoints() : CollisionPoints {return this._collisionPoints;}

    public set collisionPoints(collisionPoints : CollisionPoints) {this._collisionPoints = collisionPoints;}

    public calculateCollisionPoints(update : Vector2 | Collider) : void {
        if (update instanceof Vector2) {
            this._collisionPoints.top = update.top;
            this._collisionPoints.bottom = this._collisionPoints.top + this._pixel_size.top;
            this._collisionPoints.left = update.left;
            this._collisionPoints.right = this._collisionPoints.left + this._pixel_size.left;
        }
        else {
            this._collisionPoints.top = update.collisionPoints.top;
            this._collisionPoints.bottom = this._collisionPoints.top + this._pixel_size.top;
            this._collisionPoints.left = update.collisionPoints.left;
            this._collisionPoints.right = this._collisionPoints.left + this._pixel_size.left;
        }
    }
}

export default Collider;