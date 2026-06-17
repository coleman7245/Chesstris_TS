import Coordinates from "./Coordinates.ts";
import Collider from "./Collider.ts";

class SubBlock {
    private _position : Coordinates;
    private _collider: Collider | null;


    public constructor(position : Coordinates) {
        this._position = position;
        this._collider = null;
    }

    public hasCollided(other : Collider | null) : boolean {
        if (this._collider !== null && other !== null) {
            if (this._collider.collisionPoints !== null && other.collisionPoints !== null)
            {
                if (this._collider.collisionPoints.top <= other.collisionPoints.bottom)
                    return true;
                if (this._collider.collisionPoints.bottom >= other.collisionPoints.top)
                        return true;
                if (this._collider.collisionPoints.left >= other.collisionPoints.right)
                        return true;
                if (this._collider.collisionPoints.right <= other.collisionPoints.left)
                    return true;
            }
        }
        
        return false;
    }

    public get position() : Coordinates {return this._position;}

    public set position(position : Coordinates) {this._position = position;}

    public get collider() : Collider | null {return this._collider;}

    public set collider(other : Collider | null) {this._collider = other;} 
}

abstract class Block {
    protected _group_positions : Array<Coordinates>;
    protected _orientation : number;
    protected _position : Coordinates;

    protected constructor(groupPositions : Array<Coordinates>, position : Coordinates, orientation : number) {
        this._position = position;
        this._group_positions = groupPositions;
        this._orientation = orientation;
    }

    public get groupPositions() : Array<Coordinates> {return this._group_positions;}

    public set groupPositions(groupPositions : Array<Coordinates>) {this._group_positions = groupPositions;}

    public get orientation() : number {return this._orientation;}

    public set orientation(orientation : number) {this._orientation = orientation;}

    public get position() : Coordinates {return this._position;}

    public set position(position : Coordinates) {this._position = position;}
    
    public abstract calculatePositions() : void;

    public abstract copy() : Block;

    public static createTetrisBlock(type : string, groupPositions : Array<Coordinates>, position : Coordinates, orientation : number) : Block | null {
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

    constructor(groupPositions : Array<Coordinates>, position : Coordinates, orientation : number, reversed : boolean) {
        super(groupPositions, position, orientation);
        this._reversed = reversed;
    }

    public get reversed() : boolean {return this._reversed;}

    public set reversed(reversed : boolean) {this._reversed = reversed;}
}

class TBlock extends Block {
    constructor(groupPositions : Array<Coordinates>, position : Coordinates, orientation : number) {
        super(groupPositions, position, orientation);
    }

    public calculatePositions() : void {
        switch (this._orientation) {
            case 0:
                this._group_positions[0].setCoordinates(0, 0);
                this._group_positions[1].setCoordinates(0, 30);
                this._group_positions[2].setCoordinates(0, -30);
                this._group_positions[3].setCoordinates(30, 0);
                break;
            case 90:
                this._group_positions[0].setCoordinates(0, 0);
                this._group_positions[1].setCoordinates(-30, 0);
                this._group_positions[2].setCoordinates(30, 0);
                this._group_positions[3].setCoordinates(0, 30);
                break;
            case 180:
                this._group_positions[0].setCoordinates(0, 0);
                this._group_positions[1].setCoordinates(0, -30);
                this._group_positions[2].setCoordinates(0, 30);
                this._group_positions[3].setCoordinates(-30, 0);
                break;
            case 270:
                this._group_positions[0].setCoordinates(0, 0);
                this._group_positions[1].setCoordinates(30, 0);
                this._group_positions[2].setCoordinates(-30, 0);
                this._group_positions[3].setCoordinates(0, -30);
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

    constructor(groupPositions : Array<Coordinates>, position : Coordinates, orientation : number, reversed : boolean) {
        super(groupPositions, position, orientation, reversed);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setCoordinates(30, 15);
                    this._group_positions[1].setCoordinates(30, -15);
                    this._group_positions[2].setCoordinates(0, -15);
                    this._group_positions[3].setCoordinates(-30, -15);
                    break;
                case 90:
                    this._group_positions[0].setCoordinates(-15, 30);
                    this._group_positions[1].setCoordinates(15, 30);
                    this._group_positions[2].setCoordinates(15, 0);
                    this._group_positions[3].setCoordinates(15, -30);
                    break;
                case 180:
                    this._group_positions[0].setCoordinates(-30, -15);
                    this._group_positions[1].setCoordinates(-30, 15);
                    this._group_positions[2].setCoordinates(0, 15);
                    this._group_positions[3].setCoordinates(30, 15);
                    break;
                case 270:
                    this._group_positions[0].setCoordinates(15, -30);
                    this._group_positions[1].setCoordinates(-15, -30);
                    this._group_positions[2].setCoordinates(-15, 0);
                    this._group_positions[3].setCoordinates(-15, 30);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setCoordinates(30, -15);
                    this._group_positions[1].setCoordinates(30, 15);
                    this._group_positions[2].setCoordinates(0, 15 );
                    this._group_positions[3].setCoordinates(-30, 15 );
                    break;
                case 90:
                    this._group_positions[0].setCoordinates(15, 30);
                    this._group_positions[1].setCoordinates(-15, 30);
                    this._group_positions[2].setCoordinates(-15, 0);
                    this._group_positions[3].setCoordinates(-15, -30);
                    break;
                case 180:
                    this._group_positions[0].setCoordinates(-30, 15);
                    this._group_positions[1].setCoordinates(-30, -15);
                    this._group_positions[2].setCoordinates(0, -15);
                    this._group_positions[3].setCoordinates(30, -15);
                    break;
                case 270:
                    this._group_positions[0].setCoordinates(-15, -30);
                    this._group_positions[1].setCoordinates(15, -30);
                    this._group_positions[2].setCoordinates(15, 0);
                    this._group_positions[3].setCoordinates(15, 30);
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
    constructor(groupPositions : Array<Coordinates>, position : Coordinates, orientation : number, reversed : boolean) {
        super(groupPositions, position, orientation, reversed);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setCoordinates(15, -30);
                    this._group_positions[1].setCoordinates(15, 0);
                    this._group_positions[2].setCoordinates(-15, 0);
                    this._group_positions[3].setCoordinates(-15, 30);
                    break;
                case 90:
                    this._group_positions[0].setCoordinates(30, 15);
                    this._group_positions[1].setCoordinates(0, 15);
                    this._group_positions[2].setCoordinates(0, -15);
                    this._group_positions[3].setCoordinates(-30, -15);
                    break;
                case 180:
                    this._group_positions[0].setCoordinates(-15, 30);
                    this._group_positions[1].setCoordinates(-15, 0);
                    this._group_positions[2].setCoordinates(15, 0);
                    this._group_positions[3].setCoordinates(15, -30);
                    break;
                case 270:
                    this._group_positions[0].setCoordinates(-30, -15);
                    this._group_positions[1].setCoordinates(0, -15);
                    this._group_positions[2].setCoordinates(0, 15);
                    this._group_positions[3].setCoordinates(30, 15);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._group_positions[0].setCoordinates(15, 30);
                    this._group_positions[1].setCoordinates(15, 0);
                    this._group_positions[2].setCoordinates(-15, 0);
                    this._group_positions[3].setCoordinates(-15, -30);
                    break;
                case 90:
                    this._group_positions[0].setCoordinates(-30, 15);
                    this._group_positions[1].setCoordinates(0, 15);
                    this._group_positions[2].setCoordinates(0, -15);
                    this._group_positions[3].setCoordinates(30, -15);
                    break;
                case 180:
                    this._group_positions[0].setCoordinates(-15, -30);
                    this._group_positions[1].setCoordinates(-15, 0);
                    this._group_positions[2].setCoordinates(15, 0);
                    this._group_positions[3].setCoordinates(15, 30);
                    break;
                case 270:
                    this._group_positions[0].setCoordinates(30, -15);
                    this._group_positions[1].setCoordinates(0, -15);
                    this._group_positions[2].setCoordinates(0, 15);
                    this._group_positions[3].setCoordinates(-30, 15);
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
    constructor(groupPositions : Array<Coordinates>, position : Coordinates, orientation : number) {
        super(groupPositions, position, orientation);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._group_positions[0].setCoordinates(-15, 15);
                this._group_positions[1].setCoordinates(-15, -15);
                this._group_positions[2].setCoordinates(15, -15);
                this._group_positions[3].setCoordinates(15, 15);
                break;
            case 90:
                this._group_positions[0].setCoordinates(-15, -15);
                this._group_positions[1].setCoordinates(15, -15);
                this._group_positions[2].setCoordinates(15, 15);
                this._group_positions[3].setCoordinates(-15, 15);
                break;
            case 180:
                this._group_positions[0].setCoordinates(15, -15);
                this._group_positions[1].setCoordinates(15, 15);
                this._group_positions[2].setCoordinates(-15, 15);
                this._group_positions[3].setCoordinates(-15, -15);
                break;
            case 270:
                this._group_positions[0].setCoordinates(15, 15);
                this._group_positions[1].setCoordinates(-15, 15);
                this._group_positions[2].setCoordinates(-15, -15);
                this._group_positions[3].setCoordinates(15, -15);
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
    constructor(groupPositions : Array<Coordinates>, position : Coordinates, orientation : number) {
        super(groupPositions, position, orientation);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._group_positions[0].setCoordinates(0, -45);
                this._group_positions[1].setCoordinates(0, -15);
                this._group_positions[2].setCoordinates(0, 15);
                this._group_positions[3].setCoordinates(0, 45);
                break;
            case 90:
                this._group_positions[0].setCoordinates(45, 0);
                this._group_positions[1].setCoordinates(15, 0);
                this._group_positions[2].setCoordinates(-15, 0);
                this._group_positions[3].setCoordinates(-45, 0);
                break;
            case 180:
                this._group_positions[0].setCoordinates(0, 45);
                this._group_positions[1].setCoordinates(0, 15);
                this._group_positions[2].setCoordinates(0, -15);
                this._group_positions[3].setCoordinates(0, -45);
                break;
            case 270:
                this._group_positions[0].setCoordinates(-45, 0);
                this._group_positions[1].setCoordinates(-15, 0);
                this._group_positions[2].setCoordinates(15, 0);
                this._group_positions[3].setCoordinates(45, 0);
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