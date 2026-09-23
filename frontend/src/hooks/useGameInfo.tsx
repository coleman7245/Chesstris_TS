import { useState, useEffect } from 'react';
import { Time } from '../types.ts';
import { Game_Phase } from '../utilities.ts';

export default function useGameInfo(blocksCleared : number, gamePhase : Game_Phase, delay : number) {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameTime, setGameTime] = useState(0);

    function addScore(score : number) : void {
        setScore(prev => prev + (level * score));
    };

    function increaseLevel() : void {
        setLevel(prev => prev + 1);
    };

    function getTime() : Time {
        let seconds : number = (gameTime as number) / 1000;
        let minutes : number = seconds / 60;
        let hours : number = minutes / 60;
        
        let displayTime : Time = {
            seconds : (seconds >= 60) ? Math.floor(seconds - (Math.floor(minutes) * 60)) : Math.floor(seconds),
            minutes : (minutes >= 60) ? Math.floor(minutes - (Math.floor(hours) * 60)) : Math.floor(minutes),
            hours : Math.floor(hours)
        }
        
        return displayTime;
    };

    useEffect(() => {
        function uptick() : void {
            setGameTime(prev => prev += 1000);
        }

        if (gamePhase === Game_Phase.PLAY) {
            const id = setInterval(uptick, delay);
            return () => clearInterval(id);
        }
    }, [gamePhase]);

    useEffect(() => {
        if (score >= (level * 5000))
            increaseLevel();
    }, [score]);

    useEffect(() => {
        addScore(blocksCleared);
    }, [blocksCleared]);

    return [score, level, getTime] as const;
};