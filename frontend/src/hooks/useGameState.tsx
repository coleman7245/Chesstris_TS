import { useState, useEffect } from 'react';

export default function useGameState() {
    const [score, setScore] = useState(0);

    function addScore(score : number) {
        setScore(prev => prev + score);
    };

    useEffect(() => {}, []);

    return [score, addScore];
};