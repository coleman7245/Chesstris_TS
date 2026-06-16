import Position from "./Position.ts";
import Collider from "./Collider.ts";

class SubBlock {
    private _position : Position;
    private _collider: Collider | null;


    public constructor(position : Position) {
        this._position = position;
        this._collider = null;
    }

    public hasCollided(other : Collider) : boolean {
        if (this._collider !== null) {
            if (this._collider.top <= other.bottom)
                return true;
            if (this._collider.bottom >= other.top)
                return true;
            if (this._collider.left >= other.right)
                return true;
            if (this._collider.right <= other.left)
                return true;
        }
        
        return false;
    }

    public get position() : Position {return this._position;}

    public set position(position : Position) {this._position = position;}

    public get collider() : Collider | null {return this._collider;}

    public set collider(other : Collider | null) {this._collider = other;} 
}

abstract class Block {
    protected _group_positions : Array<Position>;
    protected _orientation : number;
    protected _position : Position;

    protected constructor(groupPositions : Array<Position>, position : Position, orientation : number) {
        this._position = position;
        this._group_positions = groupPositions;
        this._orientation = orientation;
    }

    public get groupPositions() : Array<Position> {return this._group_positions;}

    public set groupPositions(groupPositions : Array<Position>) {this._group_positions = groupPositions;}

    public get orientation() : number {return this._orientation;}

    public set orientation(orientation : number) {this._orientation = orientation;}

    public get position() : Position {return this._position;}

    public set position(position : Position) {this._position = position;}
    
    public abstract calculatePositions() : void;

    public abstract copy() : Block;

    public static createTetrisBlock(type : string, groupPositions : Array<Position>, position : Position, orientation : number) : Block | null {
        let newBlock : Block | null = null;
        
        switch (type) {
            case 'square':
                newBlock = new SquareBlock(groupPositions, position, orientation);
                return newBlock;
            case 't':
                newBlock = new TBlock(groupPositions, position, orientation);
                return newBlock;
            case 'l':
                newBlock = new LBlock(groupPositions, position, orientation, false);
                return newBlock;
            case 'reverse_l':
                newBlock = new LBlock(groupPositions, position, orientation, true);
                return newBlock;
            case 'squiggly':
                newBlock = new SquigglyBlock(groupPositions, position, orientation, false);
                return newBlock;
            case 'reverse_squiggly':
                newBlock = new SquigglyBlock(groupPositions, position, orientation, true);
                return newBlock;
            case 'line':
                newBlock = new LineBlock(groupPositions, position, orientation);
                return newBlock;
            default:
                return newBlock;
        }
    }
}

abstract class ReversableBlock extends Block {
    protected _reversed : boolean;

    constructor(groupPositions : Array<Position>, position : Position, orientation : number, reversed : boolean) {
        super(groupPositions, position, orientation);
        this._reversed = reversed;
    }

    public get reversed() : boolean {return this._reversed;}

    public set reversed(reversed : boolean) {this._reversed = reversed;}
}

class TBlock extends Block {
    constructor(groupPositions : Array<Position>, position : Position, orientation : number) {
        super(groupPositions, position, orientation);
    }

    public calculatePositions() : void {
        switch (this._orientation) {
            case 0:
                this._group_positions[0].setPosition(0, 0);
                this._group_positions[1].setPosition(0, 30);
                this._group_positions[2].setPosition(0, -30);
                this._group_positions[3].setPosition(30, 0);
                break;
            case 90:
                this._group_positions[0].setPosition(0, 0);
                this._group_positions[1].setPosition(-30, 0);
                this._group_positions[2].setPosition(30, 0);
                this._group_positions[3].setPosition(0, 30);
                break;
            case 180:
                this._group_positions[0].setPosition(0, 0);
                this._group_positions[1].setPosition(0, -30);
                this._group_positions[2].setPosition(0, 30);
                this._group_positions[3].setPosition(-30, 0);
                break;
            case 270:
                this._group_positions[0].setPosition(0, 0);
                this._group_positions[1].setPosition(30, 0);
                this._group_positions[2].setPosition(-30, 0);
                this._group_positions[3].setPosition(0, -30);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new TBlock(this._group_positions, this._position, this._orientation);

        return copy;
    }

    public equals(other : TBlock) : boolean {
        for (let i = 0; i < this._group_positions.length; i++) {
            if (!this.groupPositions[i].equals(other.groupPositions[i]))
                return false;
        }

        if (this.orientation !== other.orientation || !this.position.equals(other.position))
            return false;

        return true;
    }
}

class LBlock extends ReversableBlock {

    constructor(groupPositions : Array<Position>, position : Position, orientation : number, reversed : boolean) {
        super(groupPositions, position, orientation, reversed);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setPosition(30, 15);
                    this._group_positions[1].setPosition(30, -15);
                    this._group_positions[2].setPosition(0, -15);
                    this._group_positions[3].setPosition(-30, -15);
                    break;
                case 90:
                    this._group_positions[0].setPosition(-15, 30);
                    this._group_positions[1].setPosition(15, 30);
                    this._group_positions[2].setPosition(15, 0);
                    this._group_positions[3].setPosition(15, -30);
                    break;
                case 180:
                    this._group_positions[0].setPosition(-30, -15);
                    this._group_positions[1].setPosition(-30, 15);
                    this._group_positions[2].setPosition(0, 15);
                    this._group_positions[3].setPosition(30, 15);
                    break;
                case 270:
                    this._group_positions[0].setPosition(15, -30);
                    this._group_positions[1].setPosition(-15, -30);
                    this._group_positions[2].setPosition(-15, 0);
                    this._group_positions[3].setPosition(-15, 30);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setPosition(30, -15);
                    this._group_positions[1].setPosition(30, 15);
                    this._group_positions[2].setPosition(0, 15 );
                    this._group_positions[3].setPosition(-30, 15 );
                    break;
                case 90:
                    this._group_positions[0].setPosition(15, 30);
                    this._group_positions[1].setPosition(-15, 30);
                    this._group_positions[2].setPosition(-15, 0);
                    this._group_positions[3].setPosition(-15, -30);
                    break;
                case 180:
                    this._group_positions[0].setPosition(-30, 15);
                    this._group_positions[1].setPosition(-30, -15);
                    this._group_positions[2].setPosition(0, -15);
                    this._group_positions[3].setPosition(30, -15);
                    break;
                case 270:
                    this._group_positions[0].setPosition(-15, -30);
                    this._group_positions[1].setPosition(15, -30);
                    this._group_positions[2].setPosition(15, 0);
                    this._group_positions[3].setPosition(15, 30);
                    break;
                default:
                    break;
            }
        }
    }

    public copy() : LBlock {
        let copy : LBlock = new LBlock(this._group_positions, this._position, this._orientation, this._reversed);

        return copy;
    }

    public equals(other : LBlock) : boolean {
        let isEqual : boolean = true;

        for (let i = 0; i < this._group_positions.length; i++) {
            if (!this.groupPositions[i].equals(other.groupPositions[i])) {
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
    constructor(groupPositions : Array<Position>, position : Position, orientation : number, reversed : boolean) {
        super(groupPositions, position, orientation, reversed);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setPosition(15, -30);
                    this._group_positions[1].setPosition(15, 0);
                    this._group_positions[2].setPosition(-15, 0);
                    this._group_positions[3].setPosition(-15, 30);
                    break;
                case 90:
                    this._group_positions[0].setPosition(30, 15);
                    this._group_positions[1].setPosition(0, 15);
                    this._group_positions[2].setPosition(0, -15);
                    this._group_positions[3].setPosition(-30, -15);
                    break;
                case 180:
                    this._group_positions[0].setPosition(-15, 30);
                    this._group_positions[1].setPosition(-15, 0);
                    this._group_positions[2].setPosition(15, 0);
                    this._group_positions[3].setPosition(15, -30);
                    break;
                case 270:
                    this._group_positions[0].setPosition(-30, -15);
                    this._group_positions[1].setPosition(0, -15);
                    this._group_positions[2].setPosition(0, 15);
                    this._group_positions[3].setPosition(30, 15);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setPosition(15, 30);
                    this._group_positions[1].setPosition(15, 0);
                    this._group_positions[2].setPosition(-15, 0);
                    this._group_positions[3].setPosition(-15, -30);
                    break;
                case 90:
                    this._group_positions[0].setPosition(-30, 15);
                    this._group_positions[1].setPosition(0, 15);
                    this._group_positions[2].setPosition(0, -15);
                    this._group_positions[3].setPosition(30, -15);
                    break;
                case 180:
                    this._group_positions[0].setPosition(-15, -30);
                    this._group_positions[1].setPosition(-15, 0);
                    this._group_positions[2].setPosition(15, 0);
                    this._group_positions[3].setPosition(15, 30);
                    break;
                case 270:
                    this._group_positions[0].setPosition(30, -15);
                    this._group_positions[1].setPosition(0, -15);
                    this._group_positions[2].setPosition(0, 15);
                    this._group_positions[3].setPosition(-30, 15);
                    break;
                default:
                    break;
            }
        }
    }

    public copy() : Block {
        let copy = new SquigglyBlock(this._group_positions, this._position, this._orientation, this._reversed);

        return copy;
    }
}

class SquareBlock extends Block {
    constructor(groupPositions : Array<Position>, position : Position, orientation : number) {
        super(groupPositions, position, orientation);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._group_positions[0].setPosition(-15, 15);
                this._group_positions[1].setPosition(-15, -15);
                this._group_positions[2].setPosition(15, -15);
                this._group_positions[3].setPosition(15, 15);
                break;
            case 90:
                this._group_positions[0].setPosition(-15, -15);
                this._group_positions[1].setPosition(15, -15);
                this._group_positions[2].setPosition(15, 15);
                this._group_positions[3].setPosition(-15, 15);
                break;
            case 180:
                this._group_positions[0].setPosition(15, -15);
                this._group_positions[1].setPosition(15, 15);
                this._group_positions[2].setPosition(-15, 15);
                this._group_positions[3].setPosition(-15, -15);
                break;
            case 270:
                this._group_positions[0].setPosition(15, 15);
                this._group_positions[1].setPosition(-15, 15);
                this._group_positions[2].setPosition(-15, -15);
                this._group_positions[3].setPosition(15, -15);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new SquareBlock(this._group_positions, this._position, this._orientation);

        return copy;
    }
}

class LineBlock extends Block {
    constructor(groupPositions : Array<Position>, position : Position, orientation : number) {
        super(groupPositions, position, orientation);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._group_positions[0].setPosition(0, -45);
                this._group_positions[1].setPosition(0, -15);
                this._group_positions[2].setPosition(0, 15);
                this._group_positions[3].setPosition(0, 45);
                break;
            case 90:
                this._group_positions[0].setPosition(45, 0);
                this._group_positions[1].setPosition(15, 0);
                this._group_positions[2].setPosition(-15, 0);
                this._group_positions[3].setPosition(-45, 0);
                break;
            case 180:
                this._group_positions[0].setPosition(0, 45);
                this._group_positions[1].setPosition(0, 15);
                this._group_positions[2].setPosition(0, -15);
                this._group_positions[3].setPosition(0, -45);
                break;
            case 270:
                this._group_positions[0].setPosition(-45, 0);
                this._group_positions[1].setPosition(-15, 0);
                this._group_positions[2].setPosition(15, 0);
                this._group_positions[3].setPosition(45, 0);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new LineBlock(this._group_positions, this._position, this._orientation);

        return copy;
    }
}

export { Block, TBlock, LBlock, SquigglyBlock, SquareBlock, LineBlock };