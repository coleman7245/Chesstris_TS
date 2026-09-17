import { useState, useEffect } from 'react';

export default function useGameInfo(blocksCleared : number) {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);

    function addScore(score : number) : void {
        setScore(prev => prev + (level * score));
    };

    function increaseLevel() : void {
        setLevel(prev => prev + 1);
    };

    useEffect(() => {
        if (score >= (level * 5000))
            increaseLevel();
    }, [score]);

    useEffect(() => {
        addScore(blocksCleared);
    }, [blocksCleared]);

    return [score, level];
};