import Players from "./Players";
import { useState } from "react";
import Gameboard from "./Gameboard";
import Log from "./Log";
import {WINNING_COMBINATIONS} from './Winning-combination'
import GameOver from "./GameOver";



const initialboard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
]


function deriveActivePlayer(gameTurns){
  let currentplayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentplayer='O';
  }
  return currentplayer;
}

function App() {
  const [gameTurns,setgameTurns]=useState([]);

    const activeplayer=deriveActivePlayer(gameTurns);

    let gameboard=[...initialboard.map(array=>[...array])];
    for(const turn of gameTurns){
      const{square,player}=turn;
      const{row,col}=square;

      gameboard[row][col]=player;
    }
     
    let winner;

    for (const combination of WINNING_COMBINATIONS){
      const firstsquaresymbol = gameboard[combination[0].row][combination[0].column];
      const secondsquaresymbol =gameboard[combination[1].row][combination[1].column];
      const thirdsquaresymbol =gameboard[combination[2].row][combination[2].column];

      if (firstsquaresymbol && firstsquaresymbol === secondsquaresymbol && firstsquaresymbol=== thirdsquaresymbol) {
        winner=firstsquaresymbol;
      }
    }

    const hasdraw=gameTurns.length===9 && !winner;


  function handleSelectSquare(rowindex, colindex){
 
    setgameTurns(preturn=>{
      const currentplayer =deriveActivePlayer(preturn);
      const updatesturns=[{square:{row:rowindex,col:colindex},player:currentplayer}, ...preturn];

      return updatesturns;
    });
  }

  function handleRestart(){
    setgameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players initialname="Player1" symbol="X" isactive={activeplayer==='X'}/>
          <Players initialname="Player2" symbol="O" isactive={activeplayer==='O'}/>
        </ol>
        {(winner || hasdraw) && <GameOver winner={winner} Restart={handleRestart}/>}
        <Gameboard onselectsquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
