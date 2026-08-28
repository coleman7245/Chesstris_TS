import { useState, useEffect } from 'react';
import { Player, GameState, BlockStatus, ChessPiece } from '../types.ts';
import { createStage, Game_Phase } from '../utilities.ts';
import Vector2 from '../classes/Vector2.ts';

function useStage(player : Player, createPlayer : Function, gameState : GameState) {
    const [stage, setStage] = useState(createStage(gameState.stage_size, gameState.chess_piece_pixel_size));

    function clearRows(stage : Array<Array<BlockStatus>>) : void {
        for (let y : number = 0; y < stage.length; y++) {
            for (let x : number = 0; x < stage[y].length; x++) {
                if (stage[y][x].type !== 0) {
                    if (stage[y][x].chess_piece.type === 'knight')
                        knightElimination(stage, new Vector2(x, y), stage[y][x].chess_piece.color);
                }
            }
        }
    };

    function shiftDownRows(stage : Array<Array<BlockStatus>>) : void {
        for (let y : number = stage.length - 1; y >= 0; y--) {
            for (let x : number = stage[y].length - 1; x >= 0; x--) {
                if (stage[y][x].type !== 0) {
                    let moveDown : number = y;

                    while (stage[moveDown + 1] && stage[moveDown + 1][x] && stage[moveDown + 1][x].type === 0) {
                        stage[moveDown + 1][x] = {type : stage[moveDown][x].type, status : stage[moveDown][x].status, 
                            chess_piece : {...stage[moveDown][x].chess_piece}};
                        stage[moveDown][x] = clearBlock();
                        
                        moveDown++;
                    }
                }
            }
        };
    };

    function clearBlock() : BlockStatus {return {type : 0, status : 'cleared', chess_piece : {type : 'none', color : 'none', image_url : undefined}};};

    function knightElimination(stage : Array<Array<BlockStatus>>, position : Vector2, color : string) : void {
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

    function drawPlayer(prev : Array<Array<BlockStatus>>) {
        player.tetrisBlock.shape.forEach((row, y) => {
            row.forEach((type, x) => {
                if (type !== 0) {
                    prev[y + player.position.y][x + player.position.x] = {type : type, status : (player.finished)? "finished" : "cleared", 
                    chess_piece : player.tetrisBlock.chess_pieces[type - 1]};
                }
        })});
    };

    function refreshStage(prev : Array<Array<BlockStatus>>) : Array<Array<BlockStatus>> {
        return prev.map(row => 
            row.map(block => 
                block = (block.status === "cleared")? {type : 0, status : "cleared", 
                    chess_piece : {type : 'none', color : 'none', image_url : undefined}} : block
            )
        );
    };

    function drawStage(prev : Array<Array<BlockStatus>>) {
        const newStage = refreshStage(prev);
        clearRows(newStage);
        shiftDownRows(newStage);
        drawPlayer(newStage);

        if (player.finished)
            createPlayer();

        return newStage;
    };

    useEffect(() => {
        if (gameState.current_phase === Game_Phase.PLAY)
            setStage(prev => drawStage(prev));
    }, [player, createPlayer]);

    return [stage, setStage] as const;
};

export default useStage;