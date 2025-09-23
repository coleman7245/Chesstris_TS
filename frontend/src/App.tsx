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

import {initialGameState, GameState, Time, Game_Phase, Player, Action } from './utilities.ts';

const GameContext : React.Context<any> = createContext({});

function handleGameState(gameState : GameState, action : Action) : GameState {
    let newGameState : GameState = {...gameState};

    async function postPlayer(player : Player) {
        const data = {player};

        try {
            await fetch('http://localhost:8080/api/players', 
                {
                    method : 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                    body : JSON.stringify(data)
                }
            );
        }
        catch(err) {
            console.log(err);
        }
    }

    async function putPlayer(player : Player) {
        const data = {player};

        try {
            await fetch(`http://localhost:8080/api/players/${player.name}`, 
                {
                    method : 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                    body : JSON.stringify(data)
                }
            );
        }
        catch(err) {
            console.log(err);
        }
    }

    switch (action.type) {
        case 'ADD_NEW_PLAYER':
            postPlayer(action.player);
            newGameState.player_name = action.player.name;
            newGameState.startTime = Date.now();
            break;
        case 'EDIT_INPUT':
            putPlayer(action.player);
            newGameState.player_name = action.player.name;
            break;
        case 'UPDATE_TIME':
            newGameState.finishTime = getTime(newGameState.startTime);
            break;
        case 'PAUSED':
            newGameState.isPaused = true;
            break;
        case 'RESET_GAME':
            newGameState.score = 0;
            newGameState.startTime = Date.now();
            newGameState.finishTime = getTime(newGameState.startTime);
            newGameState.default_block_position = [135, 30];
        case 'CHANGE_SCORE':
            if (action.hasScored)
                newGameState.score += 1;
            newGameState.crossed_finish_line = action.crossedFinishLine;
            break;
        default:
            break;
    }

    newGameState.current_phase = checkGamePhase(gameState);
    return newGameState;
}

function checkGamePhase(gameState : GameState) : Game_Phase {
    if (gameState.score <= gameState.win_state.win_score && gameState.crossed_finish_line)
        return Game_Phase.WON;
    else if (gameState.crossed_finish_line)
        return Game_Phase.LOST;
    else
        return Game_Phase.PLAYING;
}

function getTime(startTime : number) : Time {
    let currentTime : number = Date.now() - startTime;
    let seconds : number = currentTime / 1000;
    let minutes : number = seconds / 60;
    let hours : number = minutes / 60;

    let gameTime : Time = {
        seconds : (seconds >= 60) ? Math.floor(seconds - (Math.floor(minutes) * 60)) : Math.floor(seconds),
        minutes : (minutes >= 60) ? Math.floor(minutes - (Math.floor(hours) * 60)) : Math.floor(minutes),
        hours : Math.floor(hours)
    }

    return gameTime;
}

function App() {
    const [gameState, dispatch] = useReducer(handleGameState, initialGameState);

    console.log(gameState.player_name);

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
