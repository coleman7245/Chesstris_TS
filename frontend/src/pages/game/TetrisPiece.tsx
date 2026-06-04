import { useState, useRef, useEffect, useContext } from 'react';

import './TetrisPiece.css';
// import { createBlockConfig, BlockConfiguration } from '../../tetris_block_moves.ts';
import { Block, TBlock, LBlock, SquigglyBlock, SquareBlock, LineBlock } from '../../classes/Block.ts';
import PositionLimit from '../../types.ts';

import { GameContext } from '../../App.tsx';
import { Game_Phase } from '../../utilities.ts';

function TetrisPiece({sources, type} : {sources : string[], type : string}) {
    const [gameState, dispatch] = useContext(GameContext);
    // const defaultConfig : BlockConfiguration | null = createBlockConfig(type);
    const defaultBlock : Block | null = Block.createTetrisBlock(type, gameState['default_start_position'], 0);
    const tetrisRef = useRef<HTMLDivElement>(null);
    // const [blockConfig, setBlockConfig] = useState(defaultConfig);
    const [tetrisBlock, setTetrisBlock] = useState(defaultBlock);
    const positionLimit : PositionLimit = {minX: 0, minY: -60, maxX: gameState.board_size.width - 60, maxY: gameState.board_size.height - 120};
    const velocity : number = 30;

    function handleInput(event : React.KeyboardEvent) : void {
        event.preventDefault();
        let newBlock : Block | null;

        if (tetrisBlock !== null) {
            newBlock = {
                position: blockConfig.position,
                group_positions: blockConfig.group_positions,
                orientation: blockConfig.orientation,
                rotate_function: blockConfig.rotate_function
            };
        }
        else
            return;

        let hasScored : boolean = false;
        let crossedFinishLine : boolean = false;

        switch (event.key) {
            case 'w':
                newConfig.position.top -= (newConfig.position.top - velocity < positionLimit.minY) ? 0 : velocity;
                hasScored = true;
                break;
            case 'a':
                newConfig.position.left -= (newConfig.position.left - velocity < positionLimit.minX) ? 0 : velocity;
                hasScored = true;
                break;
            case 's':
                newConfig.position.top += (newConfig.position.top + velocity > positionLimit.maxY) ? 0 : velocity;
                hasScored = true;
                break;
            case 'd':
                newConfig.position.left += (newConfig.position.left + velocity > positionLimit.maxX) ? 0 : velocity;
                hasScored = true;
                break;
            case "r":
                newConfig.orientation =
                newConfig.orientation === 270 ? 0 : newConfig.orientation + 90;
                newConfig.group_positions = newConfig.rotate_function(
                    newConfig.orientation
                );
                break;
            default:
                hasScored = false;
                break;
        }

        crossedFinishLine = newConfig.position.top >= gameState.win_state.win_pos_y ? true : false;
        dispatch({type : 'CHANGE_SCORE', hasScored : hasScored, crossedFinishLine : crossedFinishLine});
        setBlockConfig(newConfig);
    }

    useEffect(() => {
        if (gameState.current_phase !== Game_Phase.PAUSED && tetrisRef !== null && tetrisRef.current !== null)
            tetrisRef.current.focus();
    }, [gameState.current_phase]);

    return (
        <div className='tetris-piece' ref={tetrisRef} autoFocus
        style={{left: `${(blockConfig) ? blockConfig.position.left : 0}px`, top: `${(blockConfig) ? blockConfig.position.top : 0}px`}}
        tabIndex={0} onKeyDown={(e) => handleInput(e)}>
            <div className='chesspiece' id='main' style={{
                top: `${(blockConfig) ? blockConfig.group_positions[0].top : 0}px`, 
                left: `${(blockConfig) ? blockConfig.group_positions[0].left : 0}px`
                }}>
                    <img src={sources[0]} style={{
                top: `${(blockConfig) ? blockConfig.group_positions[0].top : 0}px`, 
                left: `${(blockConfig) ? blockConfig.group_positions[0].left : 0}px`
                }} /> 
            </div>
            <div className='chesspiece' id='first' style={{
                top: `${(blockConfig) ? blockConfig.group_positions[1].top : 0}px`,
                left: `${(blockConfig) ? blockConfig.group_positions[1].left : 0}px`,
                }}>
                    <img src={sources[1]} style={{
                top: `${(blockConfig) ? blockConfig.group_positions[1].top : 0}px`,
                left: `${(blockConfig) ? blockConfig.group_positions[1].left : 0}px`,
                }} />  
            </div>
            <div className='chesspiece' id='second' style={{
                top: `${(blockConfig) ? blockConfig.group_positions[2].top : 0}px`,
                left: `${(blockConfig) ? blockConfig.group_positions[2].left : 0}px`,
                }}>
                    <img src={sources[2]} style={{
                top: `${(blockConfig) ? blockConfig.group_positions[2].top : 0}px`,
                left: `${(blockConfig) ? blockConfig.group_positions[2].left : 0}px`,
                }} />  
            </div>
            <div className='chesspiece' id='third' style={{
                top: `${(blockConfig) ? blockConfig.group_positions[3].top : 0}px`,
                left: `${(blockConfig) ? blockConfig.group_positions[3].left : 0}px`,
                }}>
                    <img src={sources[3]} style={{
                top: `${(blockConfig) ? blockConfig.group_positions[3].top : 0}px`,
                left: `${(blockConfig) ? blockConfig.group_positions[3].left : 0}px`,
                }} />  
            </div>
        </div>
    )
}

export { TetrisPiece };