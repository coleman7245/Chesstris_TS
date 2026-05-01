import Position from "./Position.ts";

abstract class Block {
    protected _position : Position;
    protected _group_positions : Array<Position>;
    protected _orientation : number; 

    protected constructor(position : Position, groupPositions : Array<Position>, orientation : number) {
        this._position = position;
        this._group_positions = groupPositions;
        this._orientation = orientation;
    }

    protected get orientation() : number {
        return this._orientation;
    }

    protected set orientation(orientation : number) {
        this._orientation = orientation;
    }

    protected get positions() : Array<Position> {
        return this._group_positions;
    }

    protected set groupPositions(groupPositions : Array<Position>) {
        this._group_positions = groupPositions;
    }
    
    protected abstract calculatePositions() : void;

    protected calulateRotation(orientation : number) : void {
        this.orientation = orientation;
        this.calculatePositions();
    }
}

abstract class ReversableBlock extends Block {
    protected _reversed : boolean;

    constructor(position : Position, groupPositions : Array<Position>, orientation : number, reversed : boolean) {
        super(position, groupPositions, orientation);
        this._reversed = reversed;
    }

    public get reversed() : boolean {
        return this._reversed;
    }

    public set reversed(reversed : boolean) {
        this._reversed = reversed;
    }

    protected abstract calculatePositions(): void;
}

class TBlock extends Block {
    constructor(position : Position, groupPositions : Array<Position>, orientation : number) {
        super(position, groupPositions, orientation);
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
}

class LBlock extends ReversableBlock {

    constructor(position : Position, groupPositions : Array<Position>, orientation : number, reversed : boolean) {
        super(position, groupPositions, orientation, reversed);
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
}
    
class SquigglyBlock extends ReversableBlock {
    constructor(position : Position, groupPositions : Array<Position>, orientation : number, reversed : boolean) {
        super(position, groupPositions, orientation, reversed);
    }

    public calculatePositions(): void {
        if (!this.reversed) {
            switch (this.orientation) {
                case 0:
                    this.positions[0].setPosition(15, -30);
                    this.positions[1].setPosition(15, 0);
                    this.positions[2].setPosition(-15, 0);
                    this.positions[3].setPosition(-15, 30);
                    break;
                case 90:
                    this.positions[0].setPosition(30, 15);
                    this.positions[1].setPosition(0, 15);
                    this.positions[2].setPosition(0, -15);
                    this.positions[3].setPosition(-30, -15);
                    break;
                case 180:
                    this.positions[0].setPosition(-15, 30);
                    this.positions[1].setPosition(-15, 0);
                    this.positions[2].setPosition(15, 0);
                    this.positions[3].setPosition(15, -30);
                    break;
                case 270:
                    this.positions[0].setPosition(-30, -15);
                    this.positions[1].setPosition(0, -15);
                    this.positions[2].setPosition(0, 15);
                    this.positions[3].setPosition(30, 15);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this.orientation) {
                case 0:
                    this.positions[0].setPosition(15, 30);
                    this.positions[1].setPosition(15, 0);
                    this.positions[2].setPosition(-15, 0);
                    this.positions[3].setPosition(-15, -30);
                    break;
                case 90:
                    this.positions[0].setPosition(-30, 15);
                    this.positions[1].setPosition(0, 15);
                    this.positions[2].setPosition(0, -15);
                    this.positions[3].setPosition(30, -15);
                    break;
                case 180:
                    this.positions[0].setPosition(-15, -30);
                    this.positions[1].setPosition(-15, 0);
                    this.positions[2].setPosition(15, 0);
                    this.positions[3].setPosition(15, 30);
                    break;
                case 270:
                    this.positions[0].setPosition(30, -15);
                    this.positions[1].setPosition(0, -15);
                    this.positions[2].setPosition(0, 15);
                    this.positions[3].setPosition(-30, 15);
                    break;
                default:
                    break;
            }
        }
    }
}

class SquareBlock extends Block {
    constructor(position : Position, groupPositions : Array<Position>, orientation : number) {
        super(position, groupPositions, orientation);
    }

    public calculatePositions(): void {
        switch (this.orientation) {
            case 0:
                this.positions[0].setPosition(-15, 15);
                this.positions[1].setPosition(-15, -15);
                this.positions[2].setPosition(15, -15);
                this.positions[3].setPosition(15, 15);
                break;
            case 90:
                this.positions[0].setPosition(-15, -15);
                this.positions[1].setPosition(15, -15);
                this.positions[2].setPosition(15, 15);
                this.positions[3].setPosition(-15, 15);
                break;
            case 180:
                this.positions[0].setPosition(15, -15);
                this.positions[1].setPosition(15, 15);
                this.positions[2].setPosition(-15, 15);
                this.positions[3].setPosition(-15, -15);
                break;
            case 270:
                this.positions[0].setPosition(15, 15);
                this.positions[1].setPosition(-15, 15);
                this.positions[2].setPosition(-15, -15);
                this.positions[3].setPosition(15, -15);
                break;
            default:
                break;
        }
    }
}

class LineBlock extends Block {
    constructor(position : Position, groupPositions : Array<Position>, orientation : number) {
        super(position, groupPositions, orientation);
    }

    public calculatePositions(): void {
        switch (this.orientation) {
            case 0:
                this.positions[0].setPosition(0, -45);
                this.positions[1].setPosition(0, -15);
                this.positions[2].setPosition(0, 15);
                this.positions[3].setPosition(0, 45);
                break;
            case 90:
                this.positions[0].setPosition(-45, 0);
                this.positions[1].setPosition(-15, 0);
                this.positions[2].setPosition(15, 0);
                this.positions[3].setPosition(45, 0);
                break;
            case 180:
                this.positions[0].setPosition(0, 45);
                this.positions[1].setPosition(0, 15);
                this.positions[2].setPosition(0, -15);
                this.positions[3].setPosition(0, -45);
                break;
            case 270:
                this.positions[0].setPosition(45, 0);
                this.positions[1].setPosition(15, 0);
                this.positions[2].setPosition(-15, 0);
                this.positions[3].setPosition(-45, 0);
                break;
            default:
                break;
        }
    }
}

export { TBlock, LBlock, SquigglyBlock, SquareBlock, LineBlock };