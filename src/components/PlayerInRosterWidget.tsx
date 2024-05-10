import { IPlayerProps } from "./IProps";
import { Player } from "./Player";
import './PlayerInRosterWidget.css'
import './Player.css';
import './../enums/Position.css';
import { useRef } from "react";


export default function PlayerInRosterWidget ({player, key} :IPlayerProps) {

    function onDragStart(event:React.DragEvent) {
        event.dataTransfer.setData("player-data", player.toString());
      }
    

    return (
    <div draggable onDragStart={onDragStart} className={"Player PlayerInRoster " + player.getPlayerType().getKey}>
        <strong>{player.getName()}</strong>
        <p>{player.getPlayerType().getLabel}</p>
    </div>);
}