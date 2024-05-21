import { IDragAndDropProps, IPlayerProps } from "./IProps";
import { Player } from "./Player";
import './PlayerWidget.css'
import './Player.css';
import './../enums/Position.css';
import { DragAndDropPlayer } from "./DragAndDropPlayer";
import { useRef } from "react";
import {Source } from '../enums/Source';


export default function PlayerWidget ({player, key, source} :IDragAndDropProps) {

    function onDragStart(event:React.DragEvent) {
        let playerInfo = new DragAndDropPlayer(player);
        playerInfo.setSource(source.toString());
        event.dataTransfer.setData("player-data", player.toString());
      }
    

    return (
    <div draggable onDragStart={onDragStart} className={"Player " + player.getPlayerType().getKey}>
        <strong>{player.getPlayerType().getLabel}</strong>
        <p>{player.getName()}</p>
    </div>);
}