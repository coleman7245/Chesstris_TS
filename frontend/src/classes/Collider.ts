import { CollisionInfo } from "../types.ts";
import Vector2 from './Vector2.ts';
import { SubBlock } from '../classes/BlockClasses.ts';

class Collider {
    private _local_position : Vector2;
    private _subblock : SubBlock;
    private _center : Vector2;
    private _collisionInfo : CollisionInfo;

    public constructor(localPosition : Vector2, subBlock : SubBlock) {
        this._local_position = localPosition.copy();
        this._subblock = subBlock;
        this._center = subBlock.position !== undefined ? subBlock.position.add(localPosition).scale(-0.5) : new Vector2(0, 0);
        this._collisionInfo = {
            points : {top : 0, bottom : 0, left : 0, right : 0},
            direction : {top : false, bottom : false, left : false, right : false}
        };
    }

    public get center() : Vector2 {return this._center;}

    public set center(center : Vector2) {this._center = center.copy();}

    public get localPosition() : Vector2 {return this._local_position;}

    public set localPosition(localPosition : Vector2) {this._local_position = localPosition.copy();}

    public get subBlock() : SubBlock {return this._subblock;}

    public get collisionPoints() : CollisionInfo {return this._collisionInfo;}

    public set collisionPoints(collisionInfo : CollisionInfo) {this._collisionInfo = collisionInfo;}

    public calculateCollisionPoints() : void {
        this._collisionInfo.points.top = this._local_position.top + this._subblock.globalPosition.top;
        this._collisionInfo.points.bottom = this._collisionInfo.points.top + this.subBlock.size.top;
        this._collisionInfo.points.left = this._local_position.left + this._subblock.globalPosition.left;
        this._collisionInfo.points.right = this._collisionInfo.points.left + this._subblock.size.left;
    }

    public copy() : Collider {return new Collider(this._local_position, this._subblock);}

    public hasCollided(other : Collider, type : string) : boolean {
        this.calculateCollisionPoints();
        other.calculateCollisionPoints();

        if (type === 'block') {
            if (this._collisionInfo.points.top < other._collisionInfo.points.bottom && 
                (this._collisionInfo.points.left <= other._collisionInfo.points.right || 
                    this._collisionInfo.points.right >= other._collisionInfo.points.left))
                return true;
            if (this._collisionInfo.points.bottom > other._collisionInfo.points.top)
                return true;
            if (this._collisionInfo.points.left > other._collisionInfo.points.right)
                return true;
            if (this._collisionInfo.points.right < other._collisionInfo.points.left)
                return true;
        }
        else {
            if (this._collisionInfo.points.bottom > other._collisionInfo.points.bottom)
                return true;
            if (this._collisionInfo.points.top < other._collisionInfo.points.top)
                return true;
            if (this._collisionInfo.points.left < other._collisionInfo.points.left)
                return true;
            if (this._collisionInfo.points.right > other._collisionInfo.points.right)
                return true;
        }
        
        return false;
    }
}

export default Collider;