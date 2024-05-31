import React,{ MutableRefObject, useRef, useState }  from 'react';
import logo from './logo.svg';
import './App.css';
import Court from './components/CourtWidget';
import Roster from './components/RosterWidget';
import Button from '@mui/material/Button';
import html2canvas from "html2canvas";
import { Player } from './components/Player';

function App() {

  const [playerList, setPlayerList] = useState(new Array<Player>());
  

  //TODO: link standby player types with their on-court replacements
  //    cont: standby link should also indicate serve or no serve
  //    cont: with special consideratoin for liberos, who can swap out for another player type


  //TODO: design idea: make rotation state retreivable based on team name/unique identifier
  //-> mongoDB connection, or make it simple username/password profile access
  function exportRotation(): void {
    const rotation = document.getElementById("court-widget")!;
    exportAsImage(rotation, "rotation.png")

  }

  function addPlayer(player:Player) {
    let playerListCopy:Player[] = [];
    for (let existingPlayer of playerList){
      playerListCopy.push(existingPlayer);
    }
    playerListCopy.push(player);
    setPlayerList(playerListCopy);
  }

  function updatePlayer(updatedPlayer:Player) {
    removePlayerById(updatedPlayer.getId());
  }

  function removePlayerById(id:number):Player{
      let player:Player = undefined;
      for (let i = 0; i < playerList.length; i++ ) {
        if (playerList[i].getId() === id) {
          player = playerList.splice(i, 1)[0];
          break;
        }
      }
      return player;
  }

  //from https://blog.logrocket.com/export-react-components-as-images-html2canvas/#what-is-html2-canvas
  async function exportAsImage(el:HTMLElement, imageFileName:string) {
    const canvas = await html2canvas(el);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  }; 

  function downloadImage(blob:string, fileName:string){
    const fakeLink = window.document.createElement("a");
    
    fakeLink.download = fileName;

    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
  };

  return (
    <div className="App">
      <h2>
        Rotation Tool
      </h2>
      <p className='description'>
        Welcome to the interactive volleyball rotation tool! In the roster section, you can create players with specified positions to fill out your roster,
        and drag and drop them onto the court section to set up your rotation. 
      </p>
      <Roster players={playerList} addPlayer={addPlayer} deletePlayer={() => {}} editPlayer={updatePlayer} key={1} />
      <Court />
      <Button onClick={exportRotation}>
        Save Rotation Snapshot
      </Button>
      {
        /*
        Introduce serve/receive view toggle
        */
      }
    </div>

  );
}

export default App;
