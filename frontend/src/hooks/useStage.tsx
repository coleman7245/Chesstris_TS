import { useState, useEffect } from 'react';
import { Player, GameState, BlockStatus } from '../types.ts';
import { chess_pieces, createStage, Game_Phase, clearBlock } from '../utilities.ts';
import * as rules from '../../elimination_rules.ts';
import Vector2 from '../classes/Vector2.ts';

function useStage(player : Player, createPlayer : Function, gameState : GameState) {
    const [stage, setStage] = useState(createStage(gameState.stage_size, gameState.chess_piece_pixel_size));

    function clearBlocks(stage : Array<Array<BlockStatus>>) : void {
        let eliminated : boolean = false;

        for (let y : number = 0; y < stage.length; y++) {
            for (let x : number = 0; x < stage[y].length; x++) {
                if (stage[y][x].type !== 0) {
                    if (stage[y][x].chess_piece.type === 'knight')
                        eliminated = rules.eliminateKnights(stage, new Vector2(x, y), stage[y][x].chess_piece.color);
                    else if (stage[y][x].chess_piece.type === 'pawn')
                        eliminated = rules.eliminatePawns(stage, new Vector2(x, y), stage[y][x].chess_piece.color);
                    else if (stage[y][x].chess_piece.type === 'bishop')
                        eliminated = rules.eliminateBishops(stage, new Vector2(x, y), stage[y][x].chess_piece.color);
                    else if (stage[y][x].chess_piece.type === 'rook')
                        eliminated = rules.eliminateRooks(stage, new Vector2(x, y), stage[y][x].chess_piece.color);

                    if (eliminated)
                            stage[y][x] = clearBlock();
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
                   chess_piece : chess_pieces['blank_block']} : block
            )
        );
    }; 

    function drawStage(prev : Array<Array<BlockStatus>>) {
        const newStage = refreshStage(prev);
        clearBlocks(newStage);
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