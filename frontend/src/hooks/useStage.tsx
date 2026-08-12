import { useState, useEffect } from 'react';
import { Player, GameState, BlockStatus } from '../types.ts';
import { createStage, copy } from '../utilities.ts';

function useStage(player : Player, gameState : GameState) {
    const [stage, setStage] = useState(createStage(gameState.stage_size));

    function drawPlayer(newStage : Array<Array<BlockStatus>>) {
        player.tetrisBlock.shape.forEach((row, y) => {
            row.forEach((type, x) => {
                newStage[y + player.position.y][x + player.position.x] = {type : type, status : "cleared", image_url : undefined};
        })});
    };

    function drawStage(prev : Array<Array<BlockStatus>>) {
        let newStage = copy(prev);

        newStage.forEach(row => {
            row.forEach(block => {
                block = (block.type === "cleared")? {type : 0, status : "cleared", image_url : undefined} : block;
            })
        });

        drawPlayer(newStage);

        return newStage;
    };

    useEffect(() => {
        return () => setStage(prev => drawStage(prev));
    }, [player]);

    return [stage, setStage] as const;
};

export default useStage;