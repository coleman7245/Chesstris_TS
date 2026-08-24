import React, { createContext, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage.tsx';
import GamePage from './pages/game/GamePage.tsx';
import RankingsPage from './pages/rankings/RankingsPage.tsx';
import AboutPage from './pages/about/AboutPage.tsx';
import RulesPage from './pages/rules/RulesPage.tsx';
import ResultPage from './pages/result/ResultPage.tsx';
import EditPage from './pages/edit/EditPage.tsx';
import Login from './pages/login/Login.tsx';
import Position from './classes/Vector2.ts';
import { initialGameState, Game_Phase, getTime } from './utilities.ts';
import DataHandler from './classes/DataHandler.ts';
import { GameState, Action } from './types.ts';

const GameContext : React.Context<any> = createContext({});

function handleGameState(gameState : GameState, action : Action) : GameState {
    let newGameState : GameState = {...gameState};
    let url : string = '';

    switch (action.type) {
        case 'ADD_NEW_PLAYER':
            DataHandler.post(action.player, url);
            newGameState.player_name = action.player.name;
            newGameState.startTime = Date.now();
            break;
        case 'EDIT_INPUT':
            DataHandler.put(action.player, url, action.player.name);
            newGameState.player_name = action.player.name;
            break;
        case 'UPDATE_TIME':
            newGameState.finishTime = getTime(newGameState.startTime);
            break;
        case 'PAUSE':
            newGameState.isPaused = !gameState.isPaused;
            break;
        case 'RESET_GAME':
            newGameState.score = 0;
            newGameState.startTime = Date.now();
            newGameState.finishTime = getTime(newGameState.startTime);
            newGameState.default_start_position = new Position(135, 30);
            break;
        case 'CHANGE_SCORE':
            if (action.hasScored)
                newGameState.score += 1;
            newGameState.crossed_finish_line = action.crossedFinishLine;
            break;
        default:
            break;
    }

    newGameState.current_phase = checkGamePhase(newGameState);
    return newGameState;
}

function checkGamePhase(gameState : GameState) : Game_Phase {
    if (gameState.isPaused)
        return Game_Phase.PAUSE;
    if (gameState.score <= gameState.win_state.win_score && gameState.crossed_finish_line)
        return Game_Phase.WIN;
    else if (gameState.crossed_finish_line)
        return Game_Phase.LOSE;
    else
        return Game_Phase.PLAY;
};

function App() {
    const [gameState, dispatch] = useReducer(handleGameState, initialGameState);

    return (
        <GameContext.Provider value={[gameState, dispatch]}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/game' element={<GamePage />} />
                <Route path='/rankings' element={<RankingsPage />} />
                <Route path='/rules' element={<RulesPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/win' element={<ResultPage message='You win!' />} />
                <Route path='/lose' element={<ResultPage message='You lose!' />} />
                <Route path='/edit' element={<EditPage />} />
            </Routes>
        </GameContext.Provider>
    )
}

export { App, GameContext };
