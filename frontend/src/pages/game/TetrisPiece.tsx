import { useState, useRef, useEffect, useContext } from 'react';

import './TetrisPiece.css';
import { Block } from '../../classes/BlockClasses.ts';
import { PositionLimit } from '../../types.ts';
import { GameContext } from '../../App.tsx';
import { Game_Phase } from '../../utilities.ts';
import Vector2 from '../../classes/Vector2.ts';
import Collider from '../../classes/Collider.ts';

function TetrisPiece({sources, type, gameBoardCollider} : {sources : string[], type : string, gameBoardCollider : Collider}) {
    const [gameState, dispatch] = useContext(GameContext);
    const defaultBlock : Block | null = Block.createTetrisBlock(type, gameState['default_group_positions'][type], 
        gameState['default_start_position'], 0, new Vector2(30, 30));
    const tetrisRef = useRef<HTMLDivElement>(null);
    const [tetrisBlock, setTetrisBlock] = useState(defaultBlock);
    const positionLimit : PositionLimit = {minX: 0, minY: 0, maxX: gameState.board_size.left, 
        maxY: gameState.board_size.top};
    const velocity : number = 30;

    function handleInput(event : React.KeyboardEvent) : void {
        event.preventDefault();
        let newBlock : Block | null;

        if (tetrisBlock !== null) {
            newBlock = tetrisBlock.copy();
        }
        else
            return;

        if (newBlock !== null)
        {
            let hasScored : boolean = false;
            let crossedFinishLine : boolean = false;

            switch (event.key) {
                case 'w':
                    if (newBlock.position.top > positionLimit.minY)
                        newBlock.move(-velocity, 'top');
                    hasScored = true;
                    break;
                case 'a':
                    if (newBlock.position.left > positionLimit.minX)
                        newBlock.move(-velocity, 'left');
                    hasScored = true;
                    break;
                case 's':
                    if (newBlock.position.top < positionLimit.maxY)
                        newBlock.move(velocity, 'top');
                    hasScored = true;
                    break;
                case 'd':
                    if (newBlock.position.left < positionLimit.maxX)
                        newBlock.move(velocity, 'left');
                    hasScored = true;
                    break;
                case "r":
                    newBlock.rotate();
                    break;
                case "u":
                    break;
                default:
                    hasScored = false;
                    break;
            }

            for (let collider of newBlock.colliders) {
                if (collider.hasCollided(gameBoardCollider, 'board')) {
                    if (collider.collisionInfo.direction.bottom)
                        newBlock.move(gameBoardCollider.position.top - collider.position.top, 'top');
                    break;
                }
            }

            // crossedFinishLine = newBlock.position.top >= gameState.win_state.win_pos_y ? true : false;
            dispatch({type : 'CHANGE_SCORE', hasScored : hasScored, crossedFinishLine : crossedFinishLine});
            setTetrisBlock(newBlock);
        }
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
                top: `${(tetrisBlock) ? tetrisBlock.colliders[0].position.top : 0}px`, 
                left: `${(tetrisBlock) ? tetrisBlock.colliders[0].position.left : 0}px`
                }}>
                    <img src={sources[0]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.colliders[0].position.top : 0}px`, 
                left: `${(tetrisBlock) ? tetrisBlock.colliders[0].position.left : 0}px`
                }} /> 
            </div>
            <div className='chesspiece' id='first' style={{
                top: `${(tetrisBlock) ? tetrisBlock.colliders[1].position.top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.colliders[1].position.left : 0}px`,
                }}>
                    <img src={sources[1]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.colliders[1].position.top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.colliders[1].position.left : 0}px`,
                }} />  
            </div>
            <div className='chesspiece' id='second' style={{
                top: `${(tetrisBlock) ? tetrisBlock.colliders[2].position.top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.colliders[2].position.left : 0}px`,
                }}>
                    <img src={sources[2]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.colliders[2].position.top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.colliders[2].position.left : 0}px`,
                }} />  
            </div>
            <div className='chesspiece' id='third' style={{
                top: `${(tetrisBlock) ? tetrisBlock.colliders[3].position.top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.colliders[3].position.left : 0}px`,
                }}>
                    <img src={sources[3]} style={{
                top: `${(tetrisBlock) ? tetrisBlock.colliders[3].position.top : 0}px`,
                left: `${(tetrisBlock) ? tetrisBlock.colliders[3].position.left : 0}px`,
                }} />  
            </div>
        </div>
    )
}

export { TetrisPiece };