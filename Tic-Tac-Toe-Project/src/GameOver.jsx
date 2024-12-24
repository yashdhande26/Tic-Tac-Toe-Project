export default function GameOver({winner,Restart}){
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} Won!</p>}
      {!winner && <p>It&apos;s a draw </p>}
      <p>
        <button onClick={Restart}>Rematch!</button>
      </p>
    </div>
  )
}