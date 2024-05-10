import React, { MutableRefObject, useRef } from 'react';
import './Player.css';
import { Player } from './Player';
import { IPlayerProps } from './IProps';
import { Position } from '../enums/Position';

 
//TODO: consolidate with PlayerInRosterwidget

//TODO: fix drag and drop bugs

function PlayerOnCourtWidget({player, key} :IPlayerProps) {
  console.log(player);
  debugger;
  const storedPlayer:MutableRefObject<Player> = useRef(player);

  //TODO: consider source of player when player is being dragged and dropped. (i.e. roster, or court)
  function onDragStart(event:React.DragEvent) {
    event.dataTransfer.setData("player-data", storedPlayer.current.toString());
  }

  return (
    <div draggable onDragStart={onDragStart} className={"Player " + player.getPlayerType().getKey}>
        <strong className='PlayerType'> {player.getPlayerType().getLabel}</strong>
        <p className='PlayerName'>{player.getName()}</p>
    </div>
  );
}

export default PlayerOnCourtWidget;
