import React, { useRef } from 'react';
import { Player } from './Player';
import PlayerOnCourtComponent from './PlayerOnCourtComponent';
import { Position } from '../enums/Position';
import './CourtComponent.css';
import Button from '@mui/material/Button';
import Roster from './RosterWidget';

function CourtComponent() {

  let frontRow: Player[] = (new Array<Player>(3));
  let backRow: Player[] = new Array<Player>(3);


  //TODO:
  //need a list of 'standby' players (liberos, specialists)
  //need a list of 'backup' players (substitutes)
  let frontRowRender;
  let backRowRender;


  function initPlayers(): void {
    for (let i: number = 0; i < 3; i++) {
      let player: Player = new Player("Player " + (i + 1), Position.OH, 1);
      let playerBack: Player = new Player("Player " + (i + 4), Position.OPP, 1);
      frontRow[i] = player;
      backRow[i] = playerBack;
    }
  }

  function renderPlayerLocations() {
    frontRowRender = frontRow.map(currentPlayer =>
      (<PlayerOnCourtComponent key={frontRow.indexOf(currentPlayer)} player={currentPlayer} />));
    backRowRender = backRow.map(currentPlayer => (<PlayerOnCourtComponent key={backRow.indexOf(currentPlayer) + 3} player={currentPlayer} />));
  }

  function rotatePlayers() {

  }

  function showAllPlayersView() {

  }

  function showOnlyOnCourtPlayersView() {

  }

  initPlayers();
  renderPlayerLocations();




  return (
    <div id="rotation-widget">
      <Roster/>
      <div className='Court' id='court-widget'>
        <div className='FrontRow'>
          {frontRowRender}
        </div>
        <div className='BackRow'>
          {backRowRender}
        </div>
        {/* 
TODO: this button will be a toggle, to display ALL subsitution links, or to display ONLY the players on the court in a given rotation
 */}
      </div>
      <Button onClick={rotatePlayers}>
          Rotate
        </Button>
      <Button onClick={showAllPlayersView}>
        Show All Players (including subsitutions)
      </Button>
      <Button onClick={showOnlyOnCourtPlayersView}>
        Show Only On-Court Players
      </Button>
    </div>
  );
}

export default CourtComponent;
