import { useEffect, useRef } from 'react';
import { Game_Phase } from '../utilities.ts';

export default function useInterval(callback : () => void, delay : number, gamePhase : Game_Phase) {
    const fnc = useRef(() => {});

    useEffect(() => {
        fnc.current = callback;
    }, [callback]);

    useEffect(() => {
        function countdown() : void {
            fnc.current();
        };

        if (gamePhase === Game_Phase.PLAY && delay !== 0) {
            const id = setInterval(countdown, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};