import { useState, useEffect } from 'react';
import { BlockStatus, Player, TetrisBlock } from '../types.ts';
import Vector2 from '../classes/Vector2.ts';
import { GameState } from '../utilities.ts';

function createStage(stageSize : Vector2) {
        return Array.from(new Array(Math.floor(stageSize.y / 30)), () => 
            new Array(Math.floor(stageSize.x / 30)).fill({type : 0, status : 'clear'}));
};

function useStage(player : Player, gameState : GameState) {
    const [stage, setStage] = useState(createStage(gameState.stage_size));

    function drawPlayer() {
        player.tetrisBlock.shape.forEach((row : Array<string | number>, y : number) => {
            row.forEach((block : string | number, x : number) => {
                stage[y + player.position.y][x + player.position.x] = block;
        })});
    };

    useEffect(() => {
        drawPlayer();

        return () => {setStage(stage)};
    }, [player]);

    return [stage, setStage] as const;
};

export default useStage;