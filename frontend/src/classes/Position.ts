class Position {
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

    public equals(other : Position) : boolean {
        return (this.top === other.top && this.left === other.left);
    } 

    public setPosition(top : number, left : number) {
        this._top = top;
        this._left = left;
    }
}

export default Position;