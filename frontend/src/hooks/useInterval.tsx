import { useEffect, useRef } from 'react';

export default function useInterval(callback : () => void, delay : number) {
    const fnc = useRef(() => {});

    useEffect(() => {
        fnc.current = callback;
    }, [callback]);

    useEffect(() => {
        function countdown() : void {
            fnc.current();
        };

        if (delay !== 0) {
            const id = setInterval(countdown, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};