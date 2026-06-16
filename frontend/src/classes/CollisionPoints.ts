class CollisionPoints {
    private _pixel_size : number;
    private _top : number;
    private _bottom : number;
    private _left : number;
    private _right : number;

    public constructor(pixelSize : number, top : number, bottom : number, left : number, right : number) {
        this._pixel_size = pixelSize;
        this._top = top;
        this._bottom = bottom;
        this._left = left;
        this._right = right;
    }

    public get pixelSize() : number {return this._pixel_size;}

    public set pixelSize(pixelSize : number) {this._pixel_size = pixelSize;}

    public get top() : number {return this._top;}

    public set top(top : number) {this._top = top;}

    public get bottom() : number {return this._bottom;}

    public set bottom(bottom : number) {this._bottom = bottom;}

    public get left() : number {return this._left;}

    public set left(left : number) {this._left = left;}

    public get right() : number {return this._right;}

    public set right(right : number) {this._right = right;}
}

export default CollisionPoints;