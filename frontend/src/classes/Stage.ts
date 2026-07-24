import Vector2 from './Vector2.ts';
import Collider from './Collider.ts';

class Stage {
    private _size : Vector2;
    private _collider : Collider;

    constructor(size : Vector2) {
        this._size = size;
        this._collider = new Collider('board', new Vector2(0, 0), new Vector2(0, 0), size);
    }

    public get collider() : Collider {return this._collider;}

    public set collider(collider : Collider) {this._collider = collider;}

    public get size() : Vector2 {return this._size;}

    public set size(size : Vector2) {this._size = size;}
}

export default Stage;