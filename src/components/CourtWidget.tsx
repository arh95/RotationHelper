import React, { MutableRefObject, useRef, useState } from 'react';
import { Player } from './Player';
import { Position } from '../enums/Position';
import './CourtWidget.css';
import './Player.css';
import './../enums/Position.css';
import Button from '@mui/material/Button';
import Roster from './RosterWidget';
import { List } from '@mui/material';
import { DragAndDropPlayer } from './DragAndDropPlayer';
import PlayerWidget from './PlayerWidget';
import { Source } from '../enums/Source';

function Court() {

  //USE ONE LIST OF PLAYERS FOR BOTH AREAS
  //COURT: CAN DRAG AND DROP FROM STANDBY TO COURT
  //ROSTER: NO DRAG AND DROP, JUST LISTS PLAYERS AND ALLOWS YOU TO EDIT THEM

  //TODO: save configurations by name in database?
  const [playersOnCourt, setPlayersOnCourt] = useState<Array<Player>>([undefined, undefined, undefined, undefined, undefined, undefined]);
  //TODO: implement display of standby players (blocked by player links);
  const [standbyPlayers, setStandbyPlayers] = useState<Array<Player>>([]);
  const isServeReceive: MutableRefObject<boolean> = useRef(false);

  const rotations = ["4-2", "5-1", "6-2", "Other"];
  const setFromLocations = ["L", "M", "R"];
  //'set from' locations determines the positions you need to fill on the court
  //Impl note: for first iteration, will take effect for ALL setters on the court


  //IDEA FOR DERAG AND DROP
  //rotation must be selected before dragging is allowed
  //once rotation is selected, slots of appropriate player types are designated
  //how to implement? --> also, how to incorporate styling indicating the slots


  function rotatePlayers(isForwards: boolean) {

    let rotatedPlayers: Player[] = new Array<Player>(6);
    if (isForwards) {
      rotatedPlayers[0] = playersOnCourt[1];
      rotatedPlayers[1] = playersOnCourt[2];
      rotatedPlayers[2] = playersOnCourt[3];
      rotatedPlayers[3] = playersOnCourt[4];
      rotatedPlayers[4] = playersOnCourt[5];
      rotatedPlayers[5] = playersOnCourt[0];
    } else {
      rotatedPlayers[0] = playersOnCourt[5];
      rotatedPlayers[1] = playersOnCourt[0];
      rotatedPlayers[2] = playersOnCourt[1];
      rotatedPlayers[3] = playersOnCourt[2];
      rotatedPlayers[4] = playersOnCourt[3];
      rotatedPlayers[5] = playersOnCourt[4];
    }

    setPlayersOnCourt(rotatedPlayers);
  }

  function setRotation(event:React.ChangeEvent<HTMLSelectElement>)
  {
    let rotation = event.target.value;
    let dummiesToAdd:Player[] = [];
    if (rotation === rotations[0]) {
      let dummySetter:Player = new Player("", Position.SETTER);
      let dummyOutside:Player = new Player("", Position.OUTSIDE);
      let dummyMiddle:Player = new Player("", Position.MIDDLE);
      dummiesToAdd.push(dummySetter);
      dummiesToAdd.push(dummyOutside);
      dummiesToAdd.push(dummyMiddle);
      dummiesToAdd.push(dummySetter);
      dummiesToAdd.push(dummyOutside);
      dummiesToAdd.push(dummyMiddle);
    } else if (rotation === rotations[1]) {
      let dummySetter:Player = new Player("", Position.SETTER);
      let dummyOutside:Player = new Player("", Position.OUTSIDE);
      let dummyMiddle:Player = new Player("", Position.MIDDLE);
      let dummyOpposite:Player = new Player("", Position.OPPO);
      dummiesToAdd.push(dummySetter);
      dummiesToAdd.push(dummyOutside);
      dummiesToAdd.push(dummyMiddle);
      dummiesToAdd.push(dummyOpposite);
      dummiesToAdd.push(dummyOutside);
      dummiesToAdd.push(dummyMiddle);
    }

    prepDummyPlayers(dummiesToAdd);
    setPlayersOnCourt(dummiesToAdd);
  }

  function prepDummyPlayers(players:Player[])
  {
    players.forEach((player:Player) => {
      player.setDummy(true);
      player.setId(-1);
    });
  }

  //TOOD: implement method to swap standby players wiht on court counterparts at appropriate moments
  function swapPlayerLinks() {

  }
  //TODO
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
    if (activePlayers.length === 0) return false;
    activePlayers.filter((player: Player) => player !== undefined).forEach((player: Player) => {
      if (player.getId() === newPlayer.getId()) {
        isActive = true;
      }
    });
    return isActive;
  }



  function dropOntoCourt(event: React.DragEvent, position: number) {

    console.log(event);
    let playerJson: DragAndDropPlayer = JSON.parse(event.dataTransfer.getData('player-data'));
    let player: Player = new DragAndDropPlayer(playerJson);
    player.setLocation(Source.COURT);
    player.setPlayerType(Position.revive(playerJson.playerType));

    console.log("playersOnCourt value at index: " + playersOnCourt[position]);
    if (isPlayerActive(player)) {
      alert("Player is already on the court or on standby");
    } else if (playerJson.source === Source.COURT.toString()) {
      //TODO: this case could be a swap function implemented down the line
      //would need to clear out libero connections IF affected b/c that is determined by rotational logic
      //(look up rules around libero coming in for different player)
      alert("Cannot duplicate players already on the court");

    } else if (playersOnCourt[position] !== undefined) {
      if (!playersOnCourt[position].isDummy()) {
        alert("This position is already taken. Shift the existing player somewhere else if you'd like to set a new player to this spot.");
      } else {

      }
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


  //TODO: S/OPP/M1/M2/OH1/OH2 type placeholders until user has dropped a player into a given position
  return (
    //TODO: implement sidelines to display substitute players while they are not on court

    //TODO: implement reset functionality

    //TODO: implement select with rotation types (4-2, 5-1, 6-2, other)
    //when other selected, just let drag and drop as norma;
    //otherwise, add placeholder players of specific types
    //allow drag+drop to delete those placeholder players, but only with a specific type selected


    //TODO: Setter location switch for when there is a setter in front row (impacts above)
    //so can set it that setter sets from right, middle, or left
    <div id="rotation-widget">
      <h2>On The Court</h2>
      <label>Choose a rotation:
        <select id='PositionSelect' defaultValue={Position.NONE.getKey} onChange={(event) => setRotation(event)}>
          <option value={Position.NONE.getKey} disabled>Rotation</option>
          {rotations.map((item:string) => ( 
            <option value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div className='Court' id='court-widget'>

        <div className='Row'>

          <div className='PlayerBlock' id="Position4" onDrop={drag => dropOntoCourt(drag, 3)} onDragOver={handleDragOver}>
            {playersOnCourt[3] !== undefined &&
              <div>

                <PlayerWidget player={playersOnCourt[3] as Player} key={3} location={Source.COURT} draggable={playersOnCourt[3] !== undefined &&  !playersOnCourt[3].isDummy()} />

              </div>
            }
            {playersOnCourt[3] === undefined &&
              <p>Position 4</p>
            }
          </div>

          <div className='PlayerBlock' id="Position3" onDrop={drag => dropOntoCourt(drag, 2)} onDragOver={handleDragOver}>
            {playersOnCourt[2] !== undefined &&
              <div>
                <PlayerWidget player={playersOnCourt[2]} key={2} location={Source.COURT} draggable={playersOnCourt[2] !== undefined &&  !playersOnCourt[2].isDummy()} />

              </div>
            }
            {playersOnCourt[2] === undefined &&
              <p>Position 3</p>
            }
          </div>
          <div className='PlayerBlock' id="Position2" onDrop={drag => dropOntoCourt(drag, 1)} onDragOver={handleDragOver} >
            {playersOnCourt[1] !== undefined &&
              <div>
                <PlayerWidget player={playersOnCourt[1]} key={1} location={Source.COURT} draggable={playersOnCourt[1] !== undefined &&  !playersOnCourt[1].isDummy()}/>

              </div>
            }

            {playersOnCourt[1] === undefined &&
              <p>Position 2</p>
            }
          </div>
        </div>
        <div className='Row'>

          <div className='PlayerBlock' id="Position5" onDrop={drag => dropOntoCourt(drag, 4)} onDragOver={handleDragOver}>
            {playersOnCourt[4] !== undefined &&
              <div>
                <PlayerWidget player={playersOnCourt[4]} key={4} location={Source.COURT} draggable={playersOnCourt[4] !== undefined &&  !playersOnCourt[4].isDummy()}/>

              </div>
            }
            {playersOnCourt[4] === undefined &&
              <p>Position 5</p>
            }
          </div>


          <div className='PlayerBlock' id="Position6" onDrop={drag => dropOntoCourt(drag, 5)} onDragOver={handleDragOver}>
            {playersOnCourt[5] !== undefined &&
              <div>
                <PlayerWidget player={playersOnCourt[5]} key={5} location={Source.COURT} draggable={playersOnCourt[5] !== undefined &&  !playersOnCourt[5].isDummy()}/>

              </div>
            }
            {playersOnCourt[5] === undefined &&
              <p className=''>Position 6</p>
            }
          </div>




          <div id="Position1" className='PlayerBlock Service' onDrop={drag => dropOntoCourt(drag, 0)} onDragOver={handleDragOver}>
            {playersOnCourt[0] !== undefined &&
              <div>
                <PlayerWidget player={playersOnCourt[0]} key={0} location={Source.COURT} draggable={playersOnCourt[0] !== undefined &&  !playersOnCourt[0].isDummy()}/>

              </div>
            }
            {playersOnCourt[0] === undefined &&
              <p>Position 1</p>
            }
          </div>

        </div>
        {/* 
TODO: this will  be a toggle button, to display ALL subsitution links, or to display ONLY the players on the court in a given rotation
 */}
      </div>
      <Button onClick={() => rotatePlayers(true)}>
        Rotate Forwards
      </Button>
      <Button onClick={() => rotatePlayers(false)}>
        Rotate Backwards
      </Button>
      {/* TODO: introduce checkbox toggle for viewing linked players for backrow members*/}
      {/* TODO: introduce  toggle for serve vs receive */}
    </div>
  );
}

export default Court;
