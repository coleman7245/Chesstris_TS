import { useState, useEffect } from 'react';
import { Player, GameState, BlockStatus } from '../types.ts';
import { createStage, Game_Phase } from '../utilities.ts';

function useStage(player : Player, createPlayer : Function, gameState : GameState) {
    const [stage, setStage] = useState(createStage(gameState.stage_size, gameState.chess_piece_pixel_size));

    function drawPlayer(newStage : Array<Array<BlockStatus>>) {
        player.tetrisBlock.shape.forEach((row, y) => {
            row.forEach((type, x) => {
                if (type !== 0) {
                    newStage[y + player.position.y][x + player.position.x] = {type : type, status : "cleared", 
                    image_url : (player.tetrisBlock.images !== null && type !== 0)? 
                    player.tetrisBlock.images[type as number - 1] : undefined};
                }
        })});
    };

    function refreshStage(prev : Array<Array<BlockStatus>>) : Array<Array<BlockStatus>> {
        return prev.map(row => 
            row.map(block => 
                block = (block.status === "cleared")? {type : 0, status : "cleared", image_url : undefined} : block
            )
        );
    };

    function drawStage(prev : Array<Array<BlockStatus>>) {
        const newStage = refreshStage(prev);

        drawPlayer(newStage);

        return newStage;
    };

    useEffect(() => {
        if (gameState.current_phase === Game_Phase.PLAY)
            setStage(prev => drawStage(prev));
    }, [player, createPlayer]);

    return [stage, setStage] as const;
};

export default useStage;