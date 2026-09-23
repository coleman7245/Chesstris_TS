import { useEffect, useRef } from 'react';
import { GameState } from '../utilities.ts';

export default function useInterval(callback : () => void, delay : number, gameState : GameState) {
    const fnc = useRef(() => {});

    useEffect(() => {
        fnc.current = callback;
    }, [callback]);

    useEffect(() => {
        function countdown() : void {
            fnc.current();
        };

        if (gameState === GameState.PLAY && delay !== 0) {
            const id = setInterval(countdown, delay);
            return () => clearInterval(id);
        }
    }, [delay, gameState]);
};