import { useState, useEffect } from "react";
import { Game_Phase } from "../utilities.ts";

export default function useGameTime(gamePhase : Game_Phase) {
    const [gameTime, setGameTime] = useState(0);

    useEffect(() => {
        function uptick() : void {
            setGameTime(prev => prev += 1000);
        }

        if (gamePhase === Game_Phase.PLAY) {
            const id = setInterval(uptick, 1000);
            return () => clearInterval(id);
        }
    }, [gamePhase]);

    return [gameTime, setGameTime] as const;
};