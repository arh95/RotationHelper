import { IDragAndDropProps, IPlayerProps } from "./IProps";
import { Player } from "./Player";
import './PlayerWidget.css'
import './Player.css';
import './../enums/Position.css';
import { DragAndDropPlayer } from "./DragAndDropPlayer";
import { useRef } from "react";
import {Source } from '../enums/Source';


export default function PlayerWidget ({player,location, key} :IDragAndDropProps) {

    function onDragStart(event:React.DragEvent) {
        console.log(Source.ROSTER.toString());
        console.log(location.toString());

        let playerInfo = new DragAndDropPlayer(player);
        playerInfo.setSource(Source[location].toString());
        event.dataTransfer.setData("player-data", player.toString());
      }
    

      //TODO: add Delete button, conditional to location of player widget??
    return (

    <div draggable onDragStart={onDragStart} className={"Player "+  Source[location].toString() + " "  + player.getPlayerType().getKey}>
        {Source.ROSTER.toString() === location.toString() &&
            <strong>{player.getPlayerType().getLabel}</strong>
        }
        <p>{player.getName()}</p>
    </div>);
}