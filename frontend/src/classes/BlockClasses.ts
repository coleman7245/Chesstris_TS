import Vector2 from "./Vector2.ts";
import Collider from "./Collider.ts";

class SubBlock {
    private _pixel_size : Vector2;
    private _position : Vector2;
    private _collider: Collider;

    public constructor(position : Vector2, pixelSize : Vector2) {
        this._position = position;
        this._pixel_size = pixelSize;
        this._collider = new Collider(pixelSize);
    }

    public get pixelSize() : Vector2 {return this._pixel_size;}
    
    public set pixelSize(pixelSize : Vector2) {this._pixel_size = pixelSize;}

    public get position() : Vector2 {return this._position;}

    public set position(position : Vector2) {this._position = position;}

    public get collider() : Collider {return this._collider;}

    public set collider(other : Collider) {this._collider = other;} 
}

abstract class Block {
    protected _pixel_size : Vector2;
    protected _subblocks : Array<SubBlock>;
    protected _orientation : number;
    protected _position : Vector2;

    protected constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, pixelSize : Vector2) {
        this._pixel_size = pixelSize;
        this._position = position;
        this._subblocks = new Array<SubBlock>(
            new SubBlock(groupPositions[0], pixelSize), 
            new SubBlock(groupPositions[1], pixelSize),
            new SubBlock(groupPositions[2], pixelSize),
            new SubBlock(groupPositions[3], pixelSize)
        );
        this._orientation = orientation;
    }

    public get pixelSize() : Vector2 {return this._pixel_size;}
    
    public set pixelSize(pixelSize : Vector2) {this._pixel_size = pixelSize;}

    public get subBlocks() : Array<SubBlock> {return this._subblocks;}

    public set subBlocks(subBlocks : Array<SubBlock>) {this._subblocks = subBlocks;}

    public get orientation() : number {return this._orientation;}

    public set orientation(orientation : number) {this._orientation = orientation;}

    public get position() : Vector2 {return this._position;}

    public set position(position : Vector2) {this._position = position;}
    
    public abstract calculatePositions() : void;

    public getSubblockPositions() : Array<Vector2> {
        let groupPositions = new Array<Vector2>(this._subblocks.length);

        for (let i = 0; i < this._subblocks.length; i++) {
            groupPositions[i] = this._subblocks[i].position;
        }

        return groupPositions;
    }

    public abstract copy() : Block;

    public static createTetrisBlock(type : string, groupPositions : Array<Vector2>, position : Vector2, orientation : number, 
    pixelSize : Vector2) : Block | null {
        let newBlock : Block | null = null;
        
        switch (type) {
            case 'square':
                newBlock = new SquareBlock(groupPositions, position, orientation, pixelSize);
                return newBlock;
            case 't':
                newBlock = new TBlock(groupPositions, position, orientation, pixelSize);
                return newBlock;
            case 'l':
                newBlock = new LBlock(groupPositions, position, orientation, false, pixelSize);
                return newBlock;
            case 'reverse_l':
                newBlock = new LBlock(groupPositions, position, orientation, true, pixelSize);
                return newBlock;
            case 'squiggly':
                newBlock = new SquigglyBlock(groupPositions, position, orientation, false, pixelSize);
                return newBlock;
            case 'reverse_squiggly':
                newBlock = new SquigglyBlock(groupPositions, position, orientation, true, pixelSize);
                return newBlock;
            case 'line':
                newBlock = new LineBlock(groupPositions, position, orientation, pixelSize);
                return newBlock;
            default:
                return newBlock;
        }
    }
}

abstract class ReversableBlock extends Block {
    protected _reversed : boolean;

    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, reversed : boolean, 
    pixelSize : Vector2) {
        super(groupPositions, position, orientation, pixelSize);
        this._reversed = reversed;
    }

    public get reversed() : boolean {return this._reversed;}

    public set reversed(reversed : boolean) {this._reversed = reversed;}
}

class TBlock extends Block {
    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, pixelSize : Vector2) {
        super(groupPositions, position, orientation, pixelSize);
    }

    public calculatePositions() : void {
        switch (this._orientation) {
            case 0:
                this._subblocks[0].position = new Vector2(0, 0);
                this._subblocks[1].position = new Vector2(0, 30);
                this._subblocks[2].position = new Vector2(0, -30);
                this._subblocks[3].position = new Vector2(30, 0);
                break;
            case 90:
                this._subblocks[0].position = new Vector2(0, 0);
                this._subblocks[1].position = new Vector2(-30, 0);
                this._subblocks[2].position = new Vector2(30, 0);
                this._subblocks[3].position = new Vector2(0, 30);
                break;
            case 180:
                this._subblocks[0].position = new Vector2(0, 0);
                this._subblocks[1].position = new Vector2(0, -30);
                this._subblocks[2].position = new Vector2(0, 30);
                this._subblocks[3].position = new Vector2(-30, 0);
                break;
            case 270:
                this._subblocks[0].position = new Vector2(0, 0);
                this._subblocks[1].position = new Vector2(30, 0);
                this._subblocks[2].position = new Vector2(-30, 0);
                this._subblocks[3].position = new Vector2(0, -30);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new TBlock(this.getSubblockPositions(), this._position, this._orientation, this._pixel_size);

        return copy;
    }

    public equals(other : TBlock) : boolean {
        for (let i = 0; i < this._subblocks.length; i++) {
            if (!this.subBlocks[i].position.equals(other.subBlocks[i].position))
                return false;
        }

        if (this.orientation !== other.orientation || !this.position.equals(other.position))
            return false;

        return true;
    }
}

class LBlock extends ReversableBlock {

    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, reversed : boolean, 
    pixelSize : Vector2) {
        super(groupPositions, position, orientation, reversed, pixelSize);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._subblocks[0].position = new Vector2(30, 15);
                    this._subblocks[1].position = new Vector2(30, -15);
                    this._subblocks[2].position = new Vector2(0, -15);
                    this._subblocks[3].position = new Vector2(-30, -15);
                    break;
                case 90:
                    this._subblocks[0].position = new Vector2(-15, 30);
                    this._subblocks[1].position = new Vector2(15, 30);
                    this._subblocks[2].position = new Vector2(15, 0);
                    this._subblocks[3].position = new Vector2(15, -30);
                    break;
                case 180:
                    this._subblocks[0].position = new Vector2(-30, -15);
                    this._subblocks[1].position = new Vector2(-30, 15);
                    this._subblocks[2].position = new Vector2(0, 15);
                    this._subblocks[3].position = new Vector2(30, 15);
                    break;
                case 270:
                    this._subblocks[0].position = new Vector2(15, -30);
                    this._subblocks[1].position = new Vector2(-15, -30);
                    this._subblocks[2].position = new Vector2(-15, 0);
                    this._subblocks[3].position = new Vector2(-15, 30);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._subblocks[0].position = new Vector2(30, -15);
                    this._subblocks[1].position = new Vector2(30, 15);
                    this._subblocks[2].position = new Vector2(0, 15 );
                    this._subblocks[3].position = new Vector2(-30, 15 );
                    break;
                case 90:
                    this._subblocks[0].position = new Vector2(15, 30);
                    this._subblocks[1].position = new Vector2(-15, 30);
                    this._subblocks[2].position = new Vector2(-15, 0);
                    this._subblocks[3].position = new Vector2(-15, -30);
                    break;
                case 180:
                    this._subblocks[0].position = new Vector2(-30, 15);
                    this._subblocks[1].position = new Vector2(-30, -15);
                    this._subblocks[2].position = new Vector2(0, -15);
                    this._subblocks[3].position = new Vector2(30, -15);
                    break;
                case 270:
                    this._subblocks[0].position = new Vector2(-15, -30);
                    this._subblocks[1].position = new Vector2(15, -30);
                    this._subblocks[2].position = new Vector2(15, 0);
                    this._subblocks[3].position = new Vector2(15, 30);
                    break;
                default:
                    break;
            }
        }
    }

    public copy() : LBlock {
        let copy : LBlock = new LBlock(this.getSubblockPositions(), this._position, this._orientation, this._reversed, 
        this._pixel_size);

        return copy;
    }

    public equals(other : LBlock) : boolean {
        let isEqual : boolean = true;

        for (let i = 0; i < this._subblocks.length; i++) {
            if (!this.subBlocks[i].position.equals(other.subBlocks[i].position)) {
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
    pixelSize : Vector2) {
        super(groupPositions, position, orientation, reversed, pixelSize);
    }

    public calculatePositions(): void {
        if (!this._reversed) {
            switch (this._orientation) {
                case 0:
                    this._subblocks[0].position = new Vector2(15, -30);
                    this._subblocks[1].position = new Vector2(15, 0);
                    this._subblocks[2].position = new Vector2(-15, 0);
                    this._subblocks[3].position = new Vector2(-15, 30);
                    break;
                case 90:
                    this._subblocks[0].position = new Vector2(30, 15);
                    this._subblocks[1].position = new Vector2(0, 15);
                    this._subblocks[2].position = new Vector2(0, -15);
                    this._subblocks[3].position = new Vector2(-30, -15);
                    break;
                case 180:
                    this._subblocks[0].position = new Vector2(-15, 30);
                    this._subblocks[1].position = new Vector2(-15, 0);
                    this._subblocks[2].position = new Vector2(15, 0);
                    this._subblocks[3].position = new Vector2(15, -30);
                    break;
                case 270:
                    this._subblocks[0].position = new Vector2(-30, -15);
                    this._subblocks[1].position = new Vector2(0, -15);
                    this._subblocks[2].position = new Vector2(0, 15);
                    this._subblocks[3].position = new Vector2(30, 15);
                    break;
                default:
                    break;
            }
        }
        else {
            switch (this._orientation) {
                case 0:
                    this._subblocks[0].position = new Vector2(15, 30);
                    this._subblocks[1].position = new Vector2(15, 0);
                    this._subblocks[2].position = new Vector2(-15, 0);
                    this._subblocks[3].position = new Vector2(-15, -30);
                    break;
                case 90:
                    this._subblocks[0].position = new Vector2(-30, 15);
                    this._subblocks[1].position = new Vector2(0, 15);
                    this._subblocks[2].position = new Vector2(0, -15);
                    this._subblocks[3].position = new Vector2(30, -15);
                    break;
                case 180:
                    this._subblocks[0].position = new Vector2(-15, -30);
                    this._subblocks[1].position = new Vector2(-15, 0);
                    this._subblocks[2].position = new Vector2(15, 0);
                    this._subblocks[3].position = new Vector2(15, 30);
                    break;
                case 270:
                    this._subblocks[0].position = new Vector2(30, -15);
                    this._subblocks[1].position = new Vector2(0, -15);
                    this._subblocks[2].position = new Vector2(0, 15);
                    this._subblocks[3].position = new Vector2(-30, 15);
                    break;
                default:
                    break;
            }
        }
    }

    public copy() : Block {
        let copy = new SquigglyBlock(this.getSubblockPositions(), this._position, this._orientation, this._reversed, 
        this._pixel_size);

        return copy;
    }
}

class SquareBlock extends Block {
    constructor(groupPositions : Array<Vector2>, position : Vector2, orientation : number, pixelSize : Vector2) {
        super(groupPositions, position, orientation, pixelSize);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._subblocks[0].position = new Vector2(-15, 15);
                this._subblocks[1].position = new Vector2(-15, -15);
                this._subblocks[2].position = new Vector2(15, -15);
                this._subblocks[3].position = new Vector2(15, 15);
                break;
            case 90:
                this._subblocks[0].position = new Vector2(-15, -15);
                this._subblocks[1].position = new Vector2(15, -15);
                this._subblocks[2].position = new Vector2(15, 15);
                this._subblocks[3].position = new Vector2(-15, 15);
                break;
            case 180:
                this._subblocks[0].position = new Vector2(15, -15);
                this._subblocks[1].position = new Vector2(15, 15);
                this._subblocks[2].position = new Vector2(-15, 15);
                this._subblocks[3].position = new Vector2(-15, -15);
                break;
            case 270:
                this._subblocks[0].position = new Vector2(15, 15);
                this._subblocks[1].position = new Vector2(-15, 15);
                this._subblocks[2].position = new Vector2(-15, -15);
                this._subblocks[3].position = new Vector2(15, -15);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new SquareBlock(this.getSubblockPositions(), this._position, this._orientation, this._pixel_size);

        return copy;
    }
}

class LineBlock extends Block {
    constructor(groupPositions : Array<Vector2>, position : Vector2, 
    orientation : number, pixelSize : Vector2) {
        super(groupPositions, position, orientation, pixelSize);
    }

    public calculatePositions(): void {
        switch (this._orientation) {
            case 0:
                this._subblocks[0].position = new Vector2(0, -45);
                this._subblocks[1].position = new Vector2(0, -15);
                this._subblocks[2].position = new Vector2(0, 15);
                this._subblocks[3].position = new Vector2(0, 45);
                break;
            case 90:
                this._subblocks[0].position = new Vector2(45, 0);
                this._subblocks[1].position = new Vector2(15, 0);
                this._subblocks[2].position = new Vector2(-15, 0);
                this._subblocks[3].position = new Vector2(-45, 0);
                break;
            case 180:
                this._subblocks[0].position = new Vector2(0, 45);
                this._subblocks[1].position = new Vector2(0, 15);
                this._subblocks[2].position = new Vector2(0, -15);
                this._subblocks[3].position = new Vector2(0, -45);
                break;
            case 270:
                this._subblocks[0].position = new Vector2(-45, 0);
                this._subblocks[1].position = new Vector2(-15, 0);
                this._subblocks[2].position = new Vector2(15, 0);
                this._subblocks[3].position = new Vector2(45, 0);
                break;
            default:
                break;
        }
    }

    public copy() : Block {
        let copy = new LineBlock(this.getSubblockPositions(), this._position, this._orientation, this._pixel_size);

        return copy;
    }
}

export { Block, TBlock, LBlock, SquigglyBlock, SquareBlock, LineBlock };