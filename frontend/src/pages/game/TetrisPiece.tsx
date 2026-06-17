import { useState, useRef, useEffect, useContext } from 'react';

import './TetrisPiece.css';
import { Block } from '../../classes/BlockClasses.ts';
import { PositionLimit } from '../../types.ts';
import { GameContext } from '../../App.tsx';
import { Game_Phase } from '../../utilities.ts';

function TetrisPiece({sources, type} : {sources : string[], type : string}) {
    const [gameState, dispatch] = useContext(GameContext);
    const defaultBlock : Block | null = Block.createTetrisBlock(type, gameState['default_group_positions'][type], 
        gameState['default_start_position'], 0);
    const tetrisRef = useRef<HTMLDivElement>(null);
    const [tetrisBlock, setTetrisBlock] = useState(defaultBlock);
    const positionLimit : PositionLimit = {minX: 0, minY: 0, maxX: gameState.board_size.width, 
        maxY: gameState.board_size.height};
    const velocity : number = 30;

    function handleInput(event : React.KeyboardEvent) : void {
        event.preventDefault();
        let newBlock : Block | null;

        if (tetrisBlock !== null) {
            newBlock = tetrisBlock.copy();
        }
        else
            return;

        if (newBlock != null)
        {
            let hasScored : boolean = false;
            let crossedFinishLine : boolean = false;

            switch (event.key) {
                case 'w':
                    newBlock.position.top -= (newBlock.position.top - velocity < positionLimit.minY) ? 0 : velocity;
                    hasScored = true;
                    break;
                case 'a':
                    newBlock.position.left -= (newBlock.position.left - velocity < positionLimit.minX) ? 0 : velocity;
                    hasScored = true;
                    break;
                case 's':
                    newBlock.position.top += (newBlock.position.top + velocity > positionLimit.maxY) ? 0 : velocity;
                    hasScored = true;
                    break;
                case 'd':
                    newBlock.position.left += (newBlock.position.left + velocity > positionLimit.maxX) ? 0 : velocity;
                    hasScored = true;
                    break;
                case "r":
                    newBlock.orientation = newBlock.orientation === 270 ? 0 : newBlock.orientation + 90;
                    newBlock.calculatePositions();
                    break;
                case "u":
                    break;
                default:
                    hasScored = false;
                    break;
            }

            crossedFinishLine = newBlock.position.top >= gameState.win_state.win_pos_y ? true : false;
            dispatch({type : 'CHANGE_SCORE', hasScored : hasScored, crossedFinishLine : crossedFinishLine});
            setTetrisBlock(newBlock);
        }

        return;
    }

    useEffect(() => {
        if (gameState.current_phase !== Game_Phase.PAUSED && tetrisRef !== null && tetrisRef.current !== null)
            tetrisRef.current.focus();
    }, [gameState.current_phase]);

    return (
        <div className='tetris-piece' ref={tetrisRef} autoFocus
        style={{left: `${(tetrisBlock) ? tetrisBlock.position.left : 0}px`, top: `${(tetrisBlock) ? tetrisBlock.position.top : 0}px`}}
        tabIndex={0} onKeyDown={(e) => handleInput(e)}>
            <div className='chesspiece' id='main' style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[0].top : 0}px`, 
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[0].left : 0}px`
                }}>
                    <img src={sources[0]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[0].top : 0}px`, 
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[0].left : 0}px`
                }} /> 
            </div>
            <div className='chesspiece' id='first' style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[1].top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[1].left : 0}px`,
                }}>
                    <img src={sources[1]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[1].top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[1].left : 0}px`,
                }} />  
            </div>
            <div className='chesspiece' id='second' style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[2].top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[2].left : 0}px`,
                }}>
                    <img src={sources[2]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[2].top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[2].left : 0}px`,
                }} />  
            </div>
            <div className='chesspiece' id='third' style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[3].top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[3].left : 0}px`,
                }}>
                    <img src={sources[3]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.groupPositions[3].top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.groupPositions[3].left : 0}px`,
                }} />  
            </div>
        </div>
    )
}

export { TetrisPiece };