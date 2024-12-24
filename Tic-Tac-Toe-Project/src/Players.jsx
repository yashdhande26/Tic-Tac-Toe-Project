import { useState } from "react";
export default function Players({ initialname, symbol ,isactive}) {
    const [playerName, setPlayer] = useState(initialname);
    const [isEditing,setIsEditing]=useState(false);
    function handlechange(event){
      console.log(event);
      setPlayer(event.target.value);
    }
    function handleEditclick(){
      setIsEditing((editing)=>!editing);
    }
    let editplayername=<span className="player-name">{playerName}</span>
    if(isEditing){
      editplayername=<input type="text" required value={playerName} onChange={handlechange}/>
    }
  return (
    <li className={isactive?'active':undefined}>
      <span className="player">
        {editplayername}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditclick}>{isEditing ? 'Save':'Edit'}</button>
    </li>
  );
}
