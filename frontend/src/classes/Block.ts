import Position from "./Position.ts";

abstract class Block {
    protected _group_positions : Array<Position>;
    protected _orientation : number;
    protected _position : Position;

    protected constructor(position : Position, orientation : number) {
        this._position = position;
        this._group_positions = new Array<Position>(new Position(0, 0), new Position(0, 0), new Position(0, 0), new Position(0, 0));
        this._orientation = orientation;
        this.calculatePositions();
    }

    public get groupPositions() : Array<Position> {
        return this._group_positions;
    }

    public set groupPositions(groupPositions : Array<Position>) {
        this._group_positions = groupPositions;
    }

    public get orientation() : number {
        return this._orientation;
    }

    public set orientation(orientation : number) {
        this._orientation = orientation;
    }

    public get position() : Position {
        return this._position;
    }

    public set position(position : Position) {
        this._position = position;
    }
    
    protected abstract calculatePositions() : void;

    public calulateRotation(orientation : number) : void {
        this.orientation = orientation;
        this.calculatePositions();
    }

    public abstract copy() : Block;

    public static createTetrisBlock(type : string, position : Position, orientation : number) : Block | null {
        let newBlock : Block | null = null;
        
        switch (type) {
            case 'square':
                newBlock = new SquareBlock(position, orientation);
                return newBlock;
            case 't':
                newBlock = new TBlock(position, orientation);
                return newBlock;
            case 'l':
                newBlock = new LBlock(position, orientation, false);
                return newBlock;
            case 'reverse_l':
                newBlock = new LBlock(position, orientation, true);
                return newBlock;
            case 'squiggly':
                newBlock = new SquigglyBlock(position, orientation, false);
                return newBlock;
            case 'reverse_squiggly':
                newBlock = new SquigglyBlock(position, orientation, true);
                return newBlock;
            case 'line':
                newBlock = new LineBlock(position, orientation);
                return newBlock;
            default:
                return newBlock;
        }
    }
}

abstract class ReversableBlock extends Block {
    protected _reversed : boolean;

    constructor(position : Position, orientation : number, reversed : boolean) {
        super(position, orientation);
        this._reversed = reversed;
    }

    public get reversed() : boolean {
        return this._reversed;
    }

    public set reversed(reversed : boolean) {
        this._reversed = reversed;
    }
}

class TBlock extends Block {
    constructor(position : Position, orientation : number) {
        super(position, orientation);
    }

    public calculatePositions() : void {

        switch (this.orientation) {
            case 0:
                this._group_positions[0].setPosition(0, 0);
                this._group_positions[1].setPosition(0, 30);
                this._group_positions[2].setPosition(0, -30);
                this._group_positions[3].setPosition(30, 0);;
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
        let copy = new TBlock(this._position, this._orientation);

        return copy;
    }
}

class LBlock extends ReversableBlock {

    constructor(position : Position, orientation : number, reversed : boolean) {
        super(position, orientation, reversed);
    }

    public calculatePositions(): void {
        if (!this.reversed)
        {
            switch (this.orientation) {
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
            switch (this.orientation) {
                case 0:
                    this._group_positions[0].setPosition(30, -15);
                    this._group_positions[0].setPosition(30, 15);
                    this._group_positions[0].setPosition(0, 15 );
                    this._group_positions[0].setPosition(-30, 15 );
                    break;
                case 90:
                    this._group_positions[0].setPosition(15, 30);
                    this._group_positions[0].setPosition(-15, 30);
                    this._group_positions[0].setPosition(-15, 0);
                    this._group_positions[0].setPosition(-15, -30);
                    break;
                case 180:
                    this._group_positions[0].setPosition(-30, 15);
                    this._group_positions[0].setPosition(-30, -15);
                    this._group_positions[0].setPosition(0, -15);
                    this._group_positions[0].setPosition(30, -15);
                    break;
                case 270:
                    this._group_positions[0].setPosition(-15, -30);
                    this._group_positions[0].setPosition(15, -30);
                    this._group_positions[0].setPosition(15, 0);
                    this._group_positions[0].setPosition(15, 30);
                    break;
                default:
                    break;
            }
        }
    }

    public copy() : Block {
        let copy = new LBlock(this._position, this._orientation, this._reversed);

        return copy;
    }
}
    
class SquigglyBlock extends ReversableBlock {
    constructor(position : Position, orientation : number, reversed : boolean) {
        super(position, orientation, reversed);
    }

    public calculatePositions(): void {
        if (!this.reversed) {
            switch (this.orientation) {
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
            switch (this.orientation) {
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
        let copy = new SquigglyBlock(this._position, this._orientation, this._reversed);

        return copy;
    }
}

class SquareBlock extends Block {
    constructor(position : Position, orientation : number) {
        super(position, orientation);
    }

    public calculatePositions(): void {
        switch (this.orientation) {
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
        let copy = new SquareBlock(this._position, this._orientation);

        return copy;
    }
}

class LineBlock extends Block {
    constructor(position : Position, orientation : number) {
        super(position, orientation);
    }

    public calculatePositions(): void {
        switch (this.orientation) {
            case 0:
                this._group_positions[0].setPosition(0, -45);
                this._group_positions[1].setPosition(0, -15);
                this._group_positions[2].setPosition(0, 15);
                this._group_positions[3].setPosition(0, 45);
                break;
            case 90:
                this._group_positions[0].setPosition(-45, 0);
                this._group_positions[1].setPosition(-15, 0);
                this._group_positions[2].setPosition(15, 0);
                this._group_positions[3].setPosition(45, 0);
                break;
            case 180:
                this._group_positions[0].setPosition(0, 45);
                this._group_positions[1].setPosition(0, 15);
                this._group_positions[2].setPosition(0, -15);
                this._group_positions[3].setPosition(0, -45);
                break;
            case 270:
                this._group_positions[0].setPosition(45, 0);
                this._group_positions[1].setPosition(15, 0);
                this._group_positions[2].setPosition(-15, 0);
                this._group_positions[3].setPosition(-45, 0);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new LineBlock(this._position, this._orientation);

        return copy;
    }
}

export { Block, TBlock, LBlock, SquigglyBlock, SquareBlock, LineBlock };