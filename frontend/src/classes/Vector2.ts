class Vector2 {
    private _x : number;
    private _y : number;

    public constructor(x : number, y : number) {
        this._x = x;
        this._y = y;
    }

    public get x () : number {return this._x;}

    public get y() : number {return this._y;}

    public set x(x : number) {this._x = x;}

    public set y(y : number) {this._y = y;}

    public add(b : Vector2) : Vector2 {return new Vector2(this._x + b.x, this.y + b.y);}

    public copy() : Vector2 {return new Vector2(this._x, this._y);}

    public distance(b : Vector2) : number {return this.subtract(b).magnitude();}

    public equals(other : Vector2) : boolean {return (this.x === other.x && this.y === other.y);}

    public magnitude() : number {return Math.sqrt((this._x * this._x) + (this._y * this._y));}
    
    public scale(scalar : number) : Vector2 {return new Vector2(this._x * scalar, this._y * scalar);}

    public subtract(b : Vector2) : Vector2 {return this.add(b.scale(-1));}

    public static zero() : Vector2 {return new Vector2(0, 0);}

    public setVector2(x : number, y : number) {
        this._x = x;
        this._y = y;
    }
}

export default Vector2;