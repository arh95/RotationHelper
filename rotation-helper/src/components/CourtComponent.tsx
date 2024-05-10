import React, { MutableRefObject, useRef, useState } from 'react';
import { Player } from './Player';
import PlayerOnCourtWidget from './PlayerOnCourtWidget';
import { Position } from '../enums/Position';
import './CourtComponent.css';
import './Player.css';
import './../enums/Position.css';
import Button from '@mui/material/Button';
import Roster from './RosterWidget';
import { List } from '@mui/material';

function CourtComponent() {

  //TODO: save configurations by name in database?
  const [playersOnCourt, setPlayersOnCourt] = useState<Array<Player>>([undefined, undefined, undefined, undefined, undefined, undefined]);
  const [standbyPlayers, setStandbyPlayers] = useState<Array<Player>>([]);
  const isServeReceive: MutableRefObject<boolean> = useRef(false);


  function rotatePlayers() {
    let rotatedPlayers: Player[] = new Array<Player>(6);
    rotatedPlayers[0] = playersOnCourt[1];
    rotatedPlayers[1] = playersOnCourt[2];
    rotatedPlayers[2] = playersOnCourt[3];
    rotatedPlayers[3] = playersOnCourt[4];
    rotatedPlayers[4] = playersOnCourt[5];
    rotatedPlayers[5] = playersOnCourt[0];
    setPlayersOnCourt(rotatedPlayers);
  }

  function swapPlayerLinks() {

  }
  function showAllPlayersView() {

  }

  function showOnlyOnCourtPlayersView() {

  }

  function isBackRow(position: number): boolean {
    return position === 0 || position === 5 || position === 4;
  }

  function isPlayerActive(newPlayer: Player): boolean {
    let activePlayers: Player[] = playersOnCourt.concat(standbyPlayers);
    let isActive: boolean = false;
    activePlayers.forEach(player => {
      if (player === newPlayer) {
        isActive = true;
      }
    });
    return isActive;
  }



  function dropOntoCourt(event: React.DragEvent, position: number) {

    console.log(event);
    debugger;
    let player: Player = Player.revive(JSON.parse(event.dataTransfer.getData('player-data')));

    console.log("playersOnCourt value at index: " + playersOnCourt[position]);
    if (isPlayerActive(player)) {
      alert("Player is already on the court or on standby")
    } else if (playersOnCourt[position] !== undefined) {
      alert("This position is already taken. Shift the existing player somewhere else if you'd like to set a new player to this spot.");
    }
    else if (playersOnCourt[position] === undefined) {
      let arrayToSet: Player[] = [];
      for (let i = 0; i < 6; i++) {
        arrayToSet[i] = playersOnCourt[i];
      }

      arrayToSet[position] = player;
      setPlayersOnCourt(arrayToSet);
    }
    else {
      alert("Something went wrong; please try again");
    }
  }

  function handleDragOver(ev: React.DragEvent) {
    //have to prevent default in order to allow 
    ev.preventDefault();
  }




  //TODO: add 'Do it For me!' option where you can just drag the players you want to use (or tag them as S1/S2/S3 etc etc etc)
  //and then using the prioritization and the default of "setter serves first" populate the court

  //TODO: add helpful tooltip for "What is M1/M2 etc etc" to explain the differences in ordering


  //TODO: S/OPP/M1/M2/OH1/OH2 type placeholders until user has dropped a player into a given position
  return (
    //TODO: implement sidelines to display substitute players while they are not on court
    <div id="rotation-widget">
      <Roster />
      <div className='Court' id='court-widget'>
        <div className='Row'>
          <div className='AlignedColumn'>
            <div className='PlayerBlock' id="Position4" onDrop={drag => dropOntoCourt(drag, 3)} onDragOver={handleDragOver}>
              {playersOnCourt[3] !== undefined &&
                <div>

                  <PlayerOnCourtWidget player={playersOnCourt[3] as Player} key={3} />

                </div>
              }
              {playersOnCourt[3] === undefined &&
                <p>Position 4</p>
              }
            </div>

            <div className='PlayerBlock' id="Position5" onDrop={drag => dropOntoCourt(drag, 4)} onDragOver={handleDragOver}>
              {playersOnCourt[4] !== undefined &&
                <div>
                  <PlayerOnCourtWidget player={playersOnCourt[4]} key={4} />

                </div>
              }
              {playersOnCourt[4] === undefined &&
                <p>Position 5</p>
              }
            </div>
          </div>

          <div className='AlignedColumn'>
            <div className='PlayerBlock'  id="Position3" onDrop={drag => dropOntoCourt(drag, 2)} onDragOver={handleDragOver}>
              {playersOnCourt[2] !== undefined &&
                <div>
                  <PlayerOnCourtWidget player={playersOnCourt[2]} key={2} />

                </div>
              }
              {playersOnCourt[2] === undefined &&
                <p>Position 3</p>
              }
            </div>
            <div className='PlayerBlock' id="Position6" onDrop={drag => dropOntoCourt(drag, 5)} onDragOver={handleDragOver}>
              {playersOnCourt[5] !== undefined &&
                <div>
                  <PlayerOnCourtWidget player={playersOnCourt[5]} key={5} />

                </div>
              }
              {playersOnCourt[5] === undefined &&
                <p className=''>Position 6</p>
              }
            </div>
          </div>

          <div className='AlignedColumn'>
            <div className='PlayerBlock' id="Position2" onDrop={drag => dropOntoCourt(drag, 1)} onDragOver={handleDragOver}>
              {playersOnCourt[1] !== undefined &&
                <div>
                  <PlayerOnCourtWidget player={playersOnCourt[1]} key={1} />

                </div>
              }

              {playersOnCourt[1] === undefined &&
                <p>Position 2</p>
              }
            </div>
            <div id="Position1" className='PlayerBlock Service' onDrop={drag => dropOntoCourt(drag, 0)} onDragOver={handleDragOver}>
              {playersOnCourt[0] !== undefined &&
                <div>
                  <PlayerOnCourtWidget player={playersOnCourt[0]} key={0} />

                </div>
              }
              {playersOnCourt[0] === undefined &&
                <p>Position 1</p>
              }
            </div>
          </div>
        </div>
        {/* 
TODO: this will  be a toggle button, to display ALL subsitution links, or to display ONLY the players on the court in a given rotation
 */}
      </div>
      <Button onClick={rotatePlayers}>
        Rotate
      </Button>
      {/* TODO: introduce checkbox toggle for viewing linked players for backrow members*/}
      {/* TODO: introduce  toggle for serve vs receive */}
    </div>
  );
}

export default CourtComponent;
