import { BlockStatus } from "./src/types.ts";
import Vector2 from "./src/classes/Vector2.ts";
import { clearBlock } from "./src/utilities.ts";

export function knightElimination(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : void {
    let eliminated : boolean = false;

    if ((stage[position.y - 2] && stage[position.y - 2][position.x - 1] &&
        stage[position.y - 2][position.x - 1].chess_piece.color !== 'none' && 
        stage[position.y - 2][position.x - 1].chess_piece.color !== color)) {
            stage[position.y - 2][position.x - 1] = clearBlock();
            eliminated = true;
    }

    if ((stage[position.y - 2] && stage[position.y - 2][position.x + 1] && 
        stage[position.y - 2][position.x + 1].chess_piece.color !== 'none' &&
        stage[position.y - 2][position.x + 1].chess_piece.color !== color)) {
            stage[position.y - 2][position.x + 1] = clearBlock();
            eliminated = true;
    }

    if ((stage[position.y + 2] && stage[position.y + 2][position.x - 1] &&
        stage[position.y + 2][position.x - 1].chess_piece.color !== 'none' && 
        stage[position.y + 2][position.x - 1].chess_piece.color !== color)) {
            stage[position.y + 2][position.x - 1] = clearBlock();
            eliminated = true;
    }

    if ((stage[position.y + 2] && stage[position.y + 2][position.x + 1] &&
        stage[position.y + 2][position.x + 1].chess_piece.color !== 'none' && 
        stage[position.y + 2][position.x + 1].chess_piece.color !== color)) {
            stage[position.y + 2][position.x + 1] = clearBlock();
            eliminated = true;
    }

    if ((stage[position.y - 1] && stage[position.y - 1][position.x - 2] &&
        stage[position.y - 1][position.x - 2].chess_piece.color !== 'none' && 
        stage[position.y - 1][position.x - 2].chess_piece.color !== color)) {
            stage[position.y - 1][position.x - 2] = clearBlock();
            eliminated = true;
    }

    if ((stage[position.y - 1] && stage[position.y - 1][position.x + 2] && 
        stage[position.y - 1][position.x + 2].chess_piece.color !== 'none' &&
        stage[position.y - 1][position.x + 2].chess_piece.color !== color)) {
            stage[position.y - 1][position.x + 2] = clearBlock();
            eliminated = true;
    }

    if ((stage[position.y + 1] && stage[position.y + 1][position.x - 2] && 
        stage[position.y + 1][position.x - 2].chess_piece.color !== 'none' &&
        stage[position.y + 1][position.x - 2].chess_piece.color !== color)) {
            stage[position.y + 1][position.x - 2] = clearBlock();
            eliminated = true;
    }

    if ((stage[position.y + 1] && stage[position.y + 1][position.x + 2] && 
        stage[position.y + 1][position.x + 2].chess_piece.color !== 'none' &&
        stage[position.y + 1][position.x + 2].chess_piece.color !== color)) {
            stage[position.y + 1][position.x + 2] = clearBlock();
            eliminated = true;
    }

    if (eliminated)
        stage[position.y][position.x] = clearBlock();
};

export function pawnElimination(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : void {
    let eliminated : boolean = false;

    if (stage[position.y + 1] && 
        stage[position.y + 1][position.x + 1] && 
        stage[position.y + 1][position.x + 1].chess_piece.color !== 'none' &&
        stage[position.y + 1][position.x + 1].chess_piece.color !== color) {
            stage[position.y + 1][position.x + 1] = clearBlock();
            eliminated = true;
    }
    if (stage[position.y + 1] && 
        stage[position.y + 1][position.x - 1] && 
        stage[position.y + 1][position.x - 1].chess_piece.color !== 'none' &&
        stage[position.y + 1][position.x - 1].chess_piece.color !== color) {
            stage[position.y + 1][position.x - 1] = clearBlock();
            eliminated = true;
    }
    if (stage[position.y - 1] && 
        stage[position.y - 1][position.x - 1] && 
        stage[position.y - 1][position.x - 1].chess_piece.color !== 'none' &&
        stage[position.y - 1][position.x - 1].chess_piece.color !== color) {
            stage[position.y - 1][position.x - 1] = clearBlock();
            eliminated = true;
    }
    if (stage[position.y - 1] && 
        stage[position.y - 1][position.x + 1] && 
        stage[position.y - 1][position.x + 1].chess_piece.color !== 'none' &&
        stage[position.y - 1][position.x + 1].chess_piece.color !== color) {
            stage[position.y - 1][position.x + 1] = clearBlock();
            eliminated = true;
    }

    if (eliminated)
        if (eliminated)
        stage[position.y][position.x] = clearBlock();
};