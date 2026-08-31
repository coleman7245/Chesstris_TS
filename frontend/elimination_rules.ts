import { BlockStatus } from "./src/types.ts";
import Vector2 from "./src/classes/Vector2.ts";
import { clearBlock } from "./src/utilities.ts";

export function eliminateKnights(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : boolean {
    let eliminated : boolean = false;

    for (let y : number = -2; y <= 2; y++) {
        for (let x : number = -2; x <= 2; x++) {
            if (y !== 0 && x !== 0 && Math.abs(y) !== Math.abs(x)) {
                if (stage[position.y + y] && 
                    stage[position.y + y][position.x + x] && 
                    stage[position.y + y][position.x + x].chess_piece.color !== 'none' && 
                    stage[position.y + y][position.x + x].chess_piece.color !== color) {
                        stage[position.y + y][position.x + x] = clearBlock();
                        eliminated = true;
                    }
            }
        }
    };

    if (eliminated)
        stage[position.y][position.x] = clearBlock();

    return eliminated;
};

export function eliminatePawns(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : boolean {
    let eliminated : boolean = false;

    for (let y : number = -1; y <= 1; y++) {
        for (let x : number = -1; x <= 1; x++) {
            if (y !== 0 && x !== 0) {
                if (stage[position.y + y] && 
                    stage[position.y + y][position.x + x] && 
                    stage[position.y + y][position.x + x].chess_piece.color !== 'none' && 
                    stage[position.y + y][position.x + x].chess_piece.color !== color) {
                        stage[position.y + y][position.x + x] = clearBlock();
                        eliminated = true;
                    }
            }
        }
    };

    if (eliminated)
        stage[position.y][position.x] = clearBlock();

    return eliminated;
};

export function eliminateBishops(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : boolean {
    let eliminated : boolean = false;

    for (let y : number = -1; y <= 1; y++) {
        for (let x : number = -1; x <= 1; x++) {
            if (y !== 0 && x !== 0) {
                let step : number = 1;

                while (stage[position.y + (y * step)] && stage[position.y + (y * step)][position.x + (x * step)]) {

                    if (stage[position.y + (y * step)] && 
                        stage[position.y + (y * step)][position.x + (x * step)] && 
                        stage[position.y + (y * step)][position.x + (x * step)].chess_piece.color !== 'none' && 
                        stage[position.y + (y * step)][position.x + (x * step)].chess_piece.color !== color) {
                            stage[position.y + (y * step)][position.x + (x * step)] = clearBlock();
                            eliminated = true;
                    }

                    step++;
                }
            }
        }
    };

    if (eliminated)
        stage[position.y][position.x] = clearBlock();

    return eliminated;
};