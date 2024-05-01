import React from 'react';
import './PlayerOnCourtComponent.css';
import { IPlayerProps } from './IProps';
import { Position,getPositionKey } from '../enums/Position';



function PlayerOnCourtComponent({player, key} :IPlayerProps) {
  return (
    <div className={"Player "+ getPositionKey(player.getPlayerType)}>
        <strong className='PlayerType'> {player.getPlayerType}</strong>
        <p className='PlayerName'>{player.getName}</p>
    </div>
  );
}

export default PlayerOnCourtComponent;
