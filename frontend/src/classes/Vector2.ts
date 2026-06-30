class Vector2 {
    private _top : number;
    private _left : number;

    public constructor(top : number, left : number) {
        this._top = top;
        this._left = left;
    }

    public get left () : number {
        return this._left;
    }

    public get top() : number {
        return this._top;
    }

    public set left(left : number) {
        this._left = left;
    }

    public set top(top : number) {
        this._top = top;
    }

    public add(b : Vector2) : Vector2 {return new Vector2(this._top + b.top, this.left + b.left);}

    public copy() : Vector2 {
        let copy : Vector2 = new Vector2(this._top, this._left);

        return copy;
    }

    public equals(other : Vector2) : boolean {
        return (this.top === other.top && this.left === other.left);
    }
    
    public scale(scalar : number) : Vector2 {return new Vector2(this._top * scalar, this._left * scalar);}

    public setVector2(top : number, left : number) {
        this._top = top;
        this._left = left;
    }
}

export default Vector2;