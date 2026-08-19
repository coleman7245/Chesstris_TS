// import { useState, useRef, useEffect, useContext } from 'react';
// import { styled } from 'styled-components';

// import { Block } from '../../classes/BlockClasses.ts';
// import { GameContext } from '../../App.tsx';
// import { Game_Phase } from '../../utilities.ts';
// import Vector2 from '../../classes/Vector2.ts';

// const StyledChessImage = styled.img`
//     position: absolute;
//     width: 30px;
//     height: 30px;
//     border: 1px solid black;
// `;

// const StyledTetrisPiece = styled.div`
//     position: absolute;
// `;

// function TetrisPiece({sources, type} : {sources : string[], type : string}) {
//     const [gameState, dispatch] = useContext(GameContext);
//     const defaultBlock : Block | null = Block.createTetrisBlock(type, gameState['default_group_positions'][type], 
//         gameState['default_start_position'], 0, new Vector2(30, 30));
//     // Note: Commented lines below are for testing purposes.
//     // const defaultBlock : Block | null = new LBlock(gameState['default_group_positions']['reverse_l'], gameState['default_start_position'], 
//     //     0, true, new Vector2(30, 30));
//     const tetrisRef = useRef<HTMLDivElement>(null);
//     const [tetrisBlock, setTetrisBlock] = useState(defaultBlock);
//     const velocity : number = 30;

//     function handleInput(event : React.KeyboardEvent) : void {
//         event.preventDefault();
//         let newBlock : Block | null;

//         if (tetrisBlock !== null) {
//             newBlock = tetrisBlock.copy();
//         }
//         else
//             return;

//         if (newBlock !== null && newBlock.isControlled) {
//             let hasScored : boolean = false;
//             let crossedFinishLine : boolean = false;

//             switch (event.key) {
//                 case 'a':
//                     newBlock.move(-velocity, 'x');
//                     hasScored = true;
//                     break;
//                 case 's':
//                     newBlock.move(velocity, 'y');
//                     hasScored = true;
//                     break;
//                 case 'd':
//                     newBlock.move(velocity, 'x');
//                     hasScored = true;
//                     break;
//                 case "r":
//                     newBlock.rotate();
//                     break;
//                 default:
//                     hasScored = false;
//                     break;
//             }

//             for (let collider of newBlock.colliders) {
//                 if (collider.hasCollided(gameState.stage_collider)) {
//                     if (collider.collisionInfo.direction.bottom)
//                         newBlock.isControlled = false;
//                     newBlock.correctCollision(collider, gameState.stage_collider);
//                 }
//             }

//             // crossedFinishLine = newBlock.position.top >= gameState.win_state.win_pos_y ? true : false;
//             dispatch({type : 'CHANGE_SCORE', hasScored : hasScored, crossedFinishLine : crossedFinishLine});
//             setTetrisBlock(newBlock);
//         }
//     }

//     useEffect(() => {
//         const id : NodeJS.Timeout = setInterval(() => {
            
//             if (tetrisBlock !== null && tetrisRef !== null && tetrisRef.current !== null) {
//                 if (gameState.current_phase !== Game_Phase.PAUSE || tetrisBlock.isControlled)
//                     tetrisRef.current.focus();

//                 if (!tetrisBlock.isControlled)
//                     tetrisRef.current.blur();

//                 tetrisBlock.move(30, 'y');

//                 for (let collider of tetrisBlock.colliders) {
//                     if (collider.hasCollided(gameState.stage_collider)) {
//                         if (collider.collisionInfo.direction.bottom)
//                             tetrisBlock.isControlled = false;
//                         tetrisBlock.correctCollision(collider, gameState.stage_collider);
//                     }
//                 }
//             }
//         }, 750);

//          return () => clearInterval(id);
//     });

//     return (
//         <StyledTetrisPiece ref={tetrisRef} autoFocus
//         style={{left: `${(tetrisBlock) ? tetrisBlock.position.x : 0}px`, top: `${(tetrisBlock) ? tetrisBlock.position.y : 0}px`}}
//         tabIndex={0} onKeyDown={(e : React.KeyboardEvent) => {handleInput(e);}}>
//             <StyledChessImage id='main' src={sources[0]} style={{
//                 top: `${(tetrisBlock) ? tetrisBlock.colliders[0].position.y : 0}px`, 
//                 left: `${(tetrisBlock) ? tetrisBlock.colliders[0].position.x : 0}px`
//                 }}>
//             </StyledChessImage>
//             <StyledChessImage id='first' src={sources[1]} style={{
//                 top: `${(tetrisBlock) ? tetrisBlock.colliders[1].position.y : 0}px`,
//                 left: `${(tetrisBlock) ? tetrisBlock.colliders[1].position.x : 0}px`,
//                 }}>  
//             </StyledChessImage>
//             <StyledChessImage id='second' src={sources[2]} style={{
//                 top: `${(tetrisBlock) ? tetrisBlock.colliders[2].position.y : 0}px`,
//                 left: `${(tetrisBlock) ? tetrisBlock.colliders[2].position.x : 0}px`,
//                 }}>  
//             </StyledChessImage>
//             <StyledChessImage id='third' src={sources[3]} style={{
//                 top: `${(tetrisBlock) ? tetrisBlock.colliders[3].position.y : 0}px`,
//                 left: `${(tetrisBlock) ? tetrisBlock.colliders[3].position.x : 0}px`,
//                 }}>  
//             </StyledChessImage>
//         </StyledTetrisPiece>
//     )
// }

// export { TetrisPiece };