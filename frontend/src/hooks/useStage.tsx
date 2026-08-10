import { useState, useEffect } from 'react';
import { Player } from '../types.ts';
import Vector2 from '../classes/Vector2.ts';
import { GameState } from '../utilities.ts';

function createStage(stageSize : Vector2) {
        return Array.from(new Array(Math.floor(stageSize.y / 30)), () => 
            new Array(Math.floor(stageSize.x / 30)).fill({type : 0, status : 'clear'}));
};

function useStage(player : Player, gameState : GameState) {
    const [stage, setStage] = useState(createStage(gameState.stage_size));

    function drawPlayer() {
        let stage_row : number = -1; 

        // player.tetrisBlock.shape.forEach((row : Array<string | number>) => {
        //     row.forEach(block => {
        //         stage[]
        // })});
    };

    // useEffect() {() => {

    // }, [player]};
};

export default useStage;