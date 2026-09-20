import { BlockStatus, ChessPiece } from "./src/types.ts";
import Vector2 from "./src/classes/Vector2.ts";
import { clearBlock } from "./src/utilities.ts";

export function eliminateKnights(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : number {
    let eliminations : number = 0;

    for (let y : number = -2; y <= 2; y++) {
        for (let x : number = -2; x <= 2; x++) {
            if (y !== 0 && x !== 0 && Math.abs(y) !== Math.abs(x)) {
                if (stage[position.y + y] && 
                    stage[position.y + y][position.x + x] && 
                    stage[position.y + y][position.x + x].chess_piece.color !== 'none' && 
                    stage[position.y + y][position.x + x].chess_piece.color !== color) {
                        stage[position.y + y][position.x + x] = clearBlock();
                        eliminations++;
                }
            }
        }
    };

    return eliminations;
};

export function eliminatePawns(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : number {
    let eliminations : number = 0;

    for (let y : number = -1; y <= 1; y++) {
        for (let x : number = -1; x <= 1; x++) {
            if (y !== 0 && x !== 0) {
                if (stage[position.y + y] && 
                    stage[position.y + y][position.x + x] && 
                    stage[position.y + y][position.x + x].chess_piece.color !== 'none' && 
                    stage[position.y + y][position.x + x].chess_piece.color !== color) {
                        stage[position.y + y][position.x + x] = clearBlock();
                        eliminations++;
                }
            }
        }
    };

    return eliminations;
};

export function eliminateBishops(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : number {
    let eliminations : number = 0;

    for (let y : number = -1; y <= 1; y++) {
        for (let x : number = -1; x <= 1; x++) {
            if (y !== 0 && x !== 0) {
                for (let step : number = 1; stage[position.y + (y * step)] && stage[position.y + (y * step)][position.x + (x * step)]; step++) {
                    let selected : ChessPiece = stage[position.y + (y * step)][position.x + (x * step)].chess_piece;

                    if (selected.color === color)
                        break;
                    else if (selected.color !== 'none' && selected.type !== 'white_space' && selected.type !== 'black_space') {
                        stage[position.y + (y * step)][position.x + (x * step)] = clearBlock();
                        eliminations++;
                        break;
                    }
                }
            }
        }
    };

    return eliminations;
};

export function eliminateRooks(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : number {
    let eliminations : number = 0;

    for (let step : number = -1; step <= 1; step++) {
        if (step !== 0) {
            for (let y : number = 1; stage[position.y + (y * step)] && stage[position.y + (y * step)][position.x]; y++) {
                let selected : ChessPiece = stage[position.y + (y * step)][position.x].chess_piece;

                if (selected.color === color)
                    break;
                else if (selected.color !== 'none' && selected.type !== 'white_space' && selected.type !== 'black_space') {
                    stage[position.y + (y * step)][position.x] = clearBlock();
                    eliminations++;
                    break;
                }
            }

            for (let x : number = 1; stage[position.y] && stage[position.y][position.x + (x * step)]; x++) {
                let selected : ChessPiece = stage[position.y][position.x + (x * step)].chess_piece;

                if (selected.color === color)
                    break;
                else if (selected.color !== 'none' && selected.type !== 'white_space' && selected.type !== 'black_space') {
                    stage[position.y][position.x + (x * step)] = clearBlock();
                    eliminations++;
                    break;
                }
            }
        }
    };

    return eliminations;
};

export function eliminateQueens(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : number {
    let eliminations : number = 0;

    for (let step : number = -1; step <= 1; step++) {
        if (step !== 0) {
            for (let y : number = 1; stage[position.y + (y * step)] && stage[position.y + (y * step)][position.x]; y++) {
                let selected : ChessPiece = stage[position.y + (y * step)][position.x].chess_piece;

                if (selected.color === color)
                    break;
                else if (selected.color !== 'none' && selected.type !== 'white_space' && selected.type !== 'black_space') {
                    stage[position.y + (y * step)][position.x] = clearBlock();
                    eliminations++;
                    break;
                }
            }

            for (let x : number = 1; stage[position.y] && stage[position.y][position.x + (x * step)]; x++) {
                let selected : ChessPiece = stage[position.y][position.x + (x * step)].chess_piece;

                if (selected.color === color)
                    break;
                else if (selected.color !== 'none' && selected.type !== 'white_space' && selected.type !== 'black_space') {
                    stage[position.y][position.x + (x * step)] = clearBlock();
                    eliminations++;
                    break;
                }
            }
        }
    };

    for (let y : number = -1; y <= 1; y++) {
        for (let x : number = -1; x <= 1; x++) {
            if (y !== 0 && x !== 0) {
                for (let step : number = 1; stage[position.y + (y * step)] && stage[position.y + (y * step)][position.x + (x * step)]; step++) {
                    let selected : ChessPiece = stage[position.y + (y * step)][position.x + (x * step)].chess_piece;

                    if (selected.color === color)
                        break;
                    else if (selected.color !== 'none' && selected.type !== 'white_space' && selected.type !== 'black_space') {
                        stage[position.y + (y * step)][position.x + (x * step)] = clearBlock();
                        eliminations++;
                        break;
                    }
                }
            }
        }
    };

    return eliminations;
};