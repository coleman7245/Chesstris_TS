import Vector2 from "./Vector2.ts";
import Collider from "./Collider.ts";

abstract class Block {
    protected _size : Vector2;
    protected _colliders : Array<Collider>;
    protected _orientation : number;
    protected _position : Vector2;

    protected constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, size : Vector2) {
        this._size = size.copy();
        this._position = position.copy();
        this._colliders = new Array<Collider>(
            new Collider(groupPositions[0], position, size), 
            new Collider(groupPositions[1], position, size),
            new Collider(groupPositions[2], position, size),
            new Collider(groupPositions[3], position, size)
        );
        this._orientation = orientation;
    }

    public get size() : Vector2 {return this._size;}
    
    public set size(size : Vector2) {this._size = size.copy();}

    public get colliders() : Array<Collider> {return this._colliders;}

    public set colliders(colliders : Array<Collider>) {this._colliders = Array.from(colliders, (sb) => sb.copy());}

    public get orientation() : number {return this._orientation;}

    public set orientation(orientation : number) {this._orientation = orientation;}

    public get position() : Vector2 {return this._position;}

    public set position(position : Vector2) {this._position = position.copy();}
    
    public abstract calculatePositions() : void;

    public getColliderPositions() : Array<Vector2> {
        let groupPositions = new Array<Vector2>(this._colliders.length);

        for (let i = 0; i < this._colliders.length; i++) {
            groupPositions[i] = this._colliders[i].position;
        }

        return groupPositions;
    }

    public abstract copy() : Block;

    public static createTetrisBlock(type : string, groupPositions : Array<Vector2>, position : Vector2, orientation : number, 
    size : Vector2) : Block | null {
        let newBlock : Block | null = null;
        
        switch (type) {
            case 'square':
                newBlock = new SquareBlock(groupPositions, position, orientation, size);
                return newBlock;
            case 't':
                newBlock = new TBlock(groupPositions, position, orientation, size);
                return newBlock;
            case 'l':
                newBlock = new LBlock(groupPositions, position, orientation, false, size);
                return newBlock;
            case 'reverse_l':
                newBlock = new LBlock(groupPositions, position, orientation, true, size);
                return newBlock;
            case 'squiggly':
                newBlock = new SquigglyBlock(groupPositions, position, orientation, false, size);
                return newBlock;
            case 'reverse_squiggly':
                newBlock = new SquigglyBlock(groupPositions, position, orientation, true, size);
                return newBlock;
            case 'line':
                newBlock = new LineBlock(groupPositions, position, orientation, size);
                return newBlock;
            default:
                return newBlock;
        }
    }
}

abstract class ReversableBlock extends Block {
    protected _reversed : boolean;

    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, reversed : boolean, 
    size : Vector2) {
        super(groupPositions, position, orientation, size);
        this._reversed = reversed;
    }

    public get reversed() : boolean {return this._reversed;}

    public set reversed(reversed : boolean) {this._reversed = reversed;}
}

class TBlock extends Block {
    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, size : Vector2) {
        super(groupPositions, position, orientation, size);
    }

    public calculatePositions() : void {
        switch (this._orientation) {
            case 0:
                this._colliders[0].position = new Vector2(0, 0);
                this._colliders[1].position = new Vector2(0, 30);
                this._colliders[2].position = new Vector2(0, -30);
                this._colliders[3].position = new Vector2(30, 0);
                break;
            case 90:
                this._colliders[0].position = new Vector2(0, 0);
                this._colliders[1].position = new Vector2(-30, 0);
                this._colliders[2].position = new Vector2(30, 0);
                this._colliders[3].position = new Vector2(0, 30);
                break;
            case 180:
                this._colliders[0].position = new Vector2(0, 0);
                this._colliders[1].position = new Vector2(0, -30);
                this._colliders[2].position = new Vector2(0, 30);
                this._colliders[3].position = new Vector2(-30, 0);
                break;
            case 270:
                this._colliders[0].position = new Vector2(0, 0);
                this._colliders[1].position = new Vector2(30, 0);
                this._colliders[2].position = new Vector2(-30, 0);
                this._colliders[3].position = new Vector2(0, -30);
                break;
            default:
                break;
        }
    }

    public copy() : Block {return new TBlock(this.getColliderPositions(), this._position, this._orientation, this._size);}

    public equals(other : TBlock) : boolean {
        for (let i = 0; i < this._colliders.length; i++) {
            if (!this._colliders[i].position.equals(other.colliders[i].position))
                return false;
        }

        if (this.orientation !== other.orientation || !this.position.equals(other.position))
            return false;

        return true;
    }
}

class LBlock extends ReversableBlock {

    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, reversed : boolean, 
    size : Vector2) {
        super(groupPositions, position, orientation, reversed, size);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._colliders[0].position = new Vector2(30, 15);
                    this._colliders[1].position = new Vector2(30, -15);
                    this._colliders[2].position = new Vector2(0, -15);
                    this._colliders[3].position = new Vector2(-30, -15);
                    break;
                case 90:
                    this._colliders[0].position = new Vector2(-15, 30);
                    this._colliders[1].position = new Vector2(15, 30);
                    this._colliders[2].position = new Vector2(15, 0);
                    this._colliders[3].position = new Vector2(15, -30);
                    break;
                case 180:
                    this._colliders[0].position = new Vector2(-30, -15);
                    this._colliders[1].position = new Vector2(-30, 15);
                    this._colliders[2].position = new Vector2(0, 15);
                    this._colliders[3].position = new Vector2(30, 15);
                    break;
                case 270:
                    this._colliders[0].position = new Vector2(15, -30);
                    this._colliders[1].position = new Vector2(-15, -30);
                    this._colliders[2].position = new Vector2(-15, 0);
                    this._colliders[3].position = new Vector2(-15, 30);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._colliders[0].position = new Vector2(30, -15);
                    this._colliders[1].position = new Vector2(30, 15);
                    this._colliders[2].position = new Vector2(0, 15 );
                    this._colliders[3].position = new Vector2(-30, 15 );
                    break;
                case 90:
                    this._colliders[0].position = new Vector2(15, 30);
                    this._colliders[1].position = new Vector2(-15, 30);
                    this._colliders[2].position = new Vector2(-15, 0);
                    this._colliders[3].position = new Vector2(-15, -30);
                    break;
                case 180:
                    this._colliders[0].position = new Vector2(-30, 15);
                    this._colliders[1].position = new Vector2(-30, -15);
                    this._colliders[2].position = new Vector2(0, -15);
                    this._colliders[3].position = new Vector2(30, -15);
                    break;
                case 270:
                    this._colliders[0].position = new Vector2(-15, -30);
                    this._colliders[1].position = new Vector2(15, -30);
                    this._colliders[2].position = new Vector2(15, 0);
                    this._colliders[3].position = new Vector2(15, 30);
                    break;
                default:
                    break;
            }
        }
    }

    public copy() : LBlock {return new LBlock(this.getColliderPositions(), this._position, this._orientation, this._reversed, 
        this._size);}

    public equals(other : LBlock) : boolean {
        let isEqual : boolean = true;

        for (let i = 0; i < this._colliders.length; i++) {
            if (!this._colliders[i].position.equals(other.colliders[i].position)) {
                isEqual = false;
            }
        }

        if (this.orientation !== other.orientation) {
            isEqual = false;
        }
        if (!this.position.equals(other.position)) {
            isEqual = false;    
        }
        if (this.reversed !== other.reversed) {
            isEqual = false;
        }

        return isEqual;
    }
}
    
class SquigglyBlock extends ReversableBlock {
    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, reversed : boolean, 
    size : Vector2) {
        super(groupPositions, position, orientation, reversed, size);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._colliders[0].position = new Vector2(15, -30);
                    this._colliders[1].position = new Vector2(15, 0);
                    this._colliders[2].position = new Vector2(-15, 0);
                    this._colliders[3].position = new Vector2(-15, 30);
                    break;
                case 90:
                    this._colliders[0].position = new Vector2(30, 15);
                    this._colliders[1].position = new Vector2(0, 15);
                    this._colliders[2].position = new Vector2(0, -15);
                    this._colliders[3].position = new Vector2(-30, -15);
                    break;
                case 180:
                    this._colliders[0].position = new Vector2(-15, 30);
                    this._colliders[1].position = new Vector2(-15, 0);
                    this._colliders[2].position = new Vector2(15, 0);
                    this._colliders[3].position = new Vector2(15, -30);
                    break;
                case 270:
                    this._colliders[0].position = new Vector2(-30, -15);
                    this._colliders[1].position = new Vector2(0, -15);
                    this._colliders[2].position = new Vector2(0, 15);
                    this._colliders[3].position = new Vector2(30, 15);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._colliders[0].position = new Vector2(15, 30);
                    this._colliders[1].position = new Vector2(15, 0);
                    this._colliders[2].position = new Vector2(-15, 0);
                    this._colliders[3].position = new Vector2(-15, -30);
                    break;
                case 90:
                    this._colliders[0].position = new Vector2(-30, 15);
                    this._colliders[1].position = new Vector2(0, 15);
                    this._colliders[2].position = new Vector2(0, -15);
                    this._colliders[3].position = new Vector2(30, -15);
                    break;
                case 180:
                    this._colliders[0].position = new Vector2(-15, -30);
                    this._colliders[1].position = new Vector2(-15, 0);
                    this._colliders[2].position = new Vector2(15, 0);
                    this._colliders[3].position = new Vector2(15, 30);
                    break;
                case 270:
                    this._colliders[0].position = new Vector2(30, -15);
                    this._colliders[1].position = new Vector2(0, -15);
                    this._colliders[2].position = new Vector2(0, 15);
                    this._colliders[3].position = new Vector2(-30, 15);
                    break;
                default:
                    break;
            }
        }
    }

    public copy() : Block {return new SquigglyBlock(this.getColliderPositions(), this._position, this._orientation, this._reversed, 
        this._size);}
}

class SquareBlock extends Block {
    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, size : Vector2) {
        super(groupPositions, position, orientation, size);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._colliders[0].position = new Vector2(-15, 15);
                this._colliders[1].position = new Vector2(-15, -15);
                this._colliders[2].position = new Vector2(15, -15);
                this._colliders[3].position = new Vector2(15, 15);
                break;
            case 90:
                this._colliders[0].position = new Vector2(-15, -15);
                this._colliders[1].position = new Vector2(15, -15);
                this._colliders[2].position = new Vector2(15, 15);
                this._colliders[3].position = new Vector2(-15, 15);
                break;
            case 180:
                this._colliders[0].position = new Vector2(15, -15);
                this._colliders[1].position = new Vector2(15, 15);
                this._colliders[2].position = new Vector2(-15, 15);
                this._colliders[3].position = new Vector2(-15, -15);
                break;
            case 270:
                this._colliders[0].position = new Vector2(15, 15);
                this._colliders[1].position = new Vector2(-15, 15);
                this._colliders[2].position = new Vector2(-15, -15);
                this._colliders[3].position = new Vector2(15, -15);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new SquareBlock(this.getColliderPositions(), this._position, this._orientation, this._size);

        return copy;
    }
}

class LineBlock extends Block {
    constructor(groupPositions : Array<Vector2>, position : Vector2, 
    orientation : number, size : Vector2) {
        super(groupPositions, position, orientation, size);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._colliders[0].position = new Vector2(0, -45);
                this._colliders[1].position = new Vector2(0, -15);
                this._colliders[2].position = new Vector2(0, 15);
                this._colliders[3].position = new Vector2(0, 45);
                break;
            case 90:
                this._colliders[0].position = new Vector2(45, 0);
                this._colliders[1].position = new Vector2(15, 0);
                this._colliders[2].position = new Vector2(-15, 0);
                this._colliders[3].position = new Vector2(-45, 0);
                break;
            case 180:
                this._colliders[0].position = new Vector2(0, 45);
                this._colliders[1].position = new Vector2(0, 15);
                this._colliders[2].position = new Vector2(0, -15);
                this._colliders[3].position = new Vector2(0, -45);
                break;
            case 270:
                this._colliders[0].position = new Vector2(-45, 0);
                this._colliders[1].position = new Vector2(-15, 0);
                this._colliders[2].position = new Vector2(15, 0);
                this._colliders[3].position = new Vector2(45, 0);
                break;
            default:
                break;
        }
    }

    public copy() : Block {return new LineBlock(this.getColliderPositions(), this._position, this._orientation, this._size);}
}

export { Block, TBlock, LBlock, SquigglyBlock, SquareBlock, LineBlock };