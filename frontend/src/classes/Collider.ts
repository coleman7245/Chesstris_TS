import { CollisionPoints } from "../types.ts";
import Coordinates from '../classes/Coordinates.ts';

class Collider {
    private _pixel_size : Coordinates;
    private _collisionPoints : CollisionPoints | null;

    public constructor(pixelSize : Coordinates) {
        this._pixel_size = pixelSize;
        this._collisionPoints = null;
    }

    public get pixelSize() : Coordinates {return this._pixel_size;}

    public set pixelSize(pixelSize : Coordinates) {this._pixel_size = pixelSize;}

    public get collisionPoints() : CollisionPoints | null {return this._collisionPoints;}

    public set collisionPoints(collisionPoints : CollisionPoints) {this._collisionPoints = collisionPoints;}
}

export default Collider;