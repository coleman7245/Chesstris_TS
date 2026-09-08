import { useState, useEffect } from "react";
import { Game_Phase } from "../utilities.ts";
import { Time } from "../types.ts";

export default function useGameTime(gamePhase : Game_Phase, delay : number) {
    const [gameTime, setGameTime] = useState(0);

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

    return [getTime] as const;
};