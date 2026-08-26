import { useState, useEffect } from 'react';
import { Player, GameState, BlockStatus } from '../types.ts';
import { createStage, Game_Phase } from '../utilities.ts';

function useStage(player : Player, createPlayer : Function, gameState : GameState) {
    const [stage, setStage] = useState(createStage(gameState.stage_size, gameState.chess_piece_pixel_size));

    // function clearRows(prev : Array<Array<BlockStatus>>) : void {
    //     for (let y : number = 0; y < prev.length; y++) {
    //         for (let x : number = 0; x < prev[y].length; x++) {

    //         }
    //     }
    // };

    // function knightElimination(prev : Array<Array<BlockStatus>>) : void {
    //     if (prev[player.position.y - 2][player.position.x - 1] && prev[player.position.y - 2][player.position.x - 1]) {}
    // };

    function drawPlayer(prev : Array<Array<BlockStatus>>) {
        player.tetrisBlock.shape.forEach((row, y) => {
            row.forEach((type, x) => {
                if (type !== 0) {
                    prev[y + player.position.y][x + player.position.x] = {type : type, status : (player.finished)? "finished" : "cleared", 
                    chess_piece : {type : player.tetrisBlock.chess_pieces[type - 1].type, image_url : (player.tetrisBlock.chess_pieces !== null && type !== 0)? 
                    player.tetrisBlock.chess_pieces[type - 1].image_url : undefined}};
                }
        })});
    };

    function refreshStage(prev : Array<Array<BlockStatus>>) : Array<Array<BlockStatus>> {
        return prev.map(row => 
            row.map(block => 
                block = (block.status === "cleared")? {type : 0, status : "cleared", 
                    chess_piece : {type : 'none', image_url : undefined}} : block
            )
        );
    };

    function drawStage(prev : Array<Array<BlockStatus>>) {
        const newStage = refreshStage(prev);

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