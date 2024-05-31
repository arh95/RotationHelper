import { Player } from "./Player";
import { Position } from "../enums/Position";

export class DragAndDropPlayer extends Player {
    source:string;

    constructor (player:Player) {
        super(player.name, player.playerType);
        this.setId(player.id);
        this.setPlayerLink(player.playerLink);
        this.setActive(player.active);
        this.setServing(player.serving);
        this.setLocation(player.location);
        console.log(this);
    }

    public getSource():string {
        return this.source;
    }

    public setSource(source:string): void
    {
        this.source = source;
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    

    // public static revive(playerToRevive:DragAndDropPlayer):DragAndDropPlayer {
        
    //     let revivedPlayer: DragAndDropPlayer = new DragAndDropPlayer(this.reviveRecursive(playerToRevive as Player, false));
    //     revivedPlayer.setSource(playerToRevive.source);
    //     return revivedPlayer;
    // }

    // private static reviveRecursive(playerToRevive:Player, isPlayerLink:boolean):Player
    // {
    //     let revivedPosition = Position.revive(playerToRevive.playerType);
    //     let revivedPlayer = new DragAndDropPlayer(playerToRevive);
    //     revivedPlayer.setOnCourt(playerToRevive.onCourt);
    //     revivedPlayer.setPlayerType(revivedPosition);
    //     revivedPlayer.setNumber(playerToRevive.num);
    //     revivedPlayer.setServing(playerToRevive.serving);
    //     if (!isPlayerLink && playerToRevive.playerLink !== undefined) {
    //         revivedPlayer.setPlayerLink(this.reviveRecursive(playerToRevive.playerLink, true));
    //     }
    //     return revivedPlayer;
    // }


}