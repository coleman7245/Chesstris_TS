import { useState, useEffect } from 'react';

export default function useGameState(blocksCleared : number) {
    const [score, setScore] = useState(0);
    // const [level, setLevel] = useState(1);

    function addScore(score : number) {
        setScore(prev => prev + score);
    };

    useEffect(() => {
        addScore(blocksCleared);
    }, [blocksCleared]);

    return [score];
};