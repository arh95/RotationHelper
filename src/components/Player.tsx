import { Position } from "../enums/Position";

export class Player {
    name: String;
    playerType: Position;
    currentPosition: number;
    usedInRotation: boolean = false;
    playerLink: Player;
    serve: boolean = true;
    num:number;
    numberProvided: boolean = false;
    //TODO: implement (optional) player number, if the field was filled out on creation, then display that info.
    //otherwise, auto-increment the player id starting from the lowest available number on the current team


    //  id:number;
    //TODO use mongoDB for player ids, like i did for chess games

    constructor(name: String, playerType: Position, currentPosition: number) {
        //todo: figure out currentPosition value, is it like player number? or is it like, rotation location?
        this.name = name;
        this.playerType = playerType;
        this.currentPosition = currentPosition;
    }

    /**
     * hasPlayerLink defines a substitution connection between this player and a different player. The Position type of the player object
     * will be used to determine what occurs when this player rotates/transitions between the front and back rows
     */
    public hasPlayerLink(): boolean {
        return this.playerLink !== undefined;
    }

    public setName(name: String) {
        this.name = name;
    }
    public getName(): String {
        return this.name;
    }

    public setPlayerType(playerType: Position) {
        this.playerType = playerType;
    }

    public getPlayerType(): Position {
        return this.playerType;
    }


    //rotation position
    public setCurrentPosition(currentPosition: number) {
        this.currentPosition = currentPosition;
    }

    public getCurrentPosition(): number {
        return this.currentPosition;
    }

    public setInRotation(value: boolean) {
        this.usedInRotation = value;
    }

    public isInRotation(): boolean {
        return this.usedInRotation;
    }

    public setServe(willServe: boolean) {
        this.serve = willServe;
    }

    public isServing(): boolean {
        return this.serve;
    }

    public getPlayerLink():Player | undefined {
        return this.playerLink;
    }

    public setPlayerLink(player:Player)
    {
        this.playerLink = player;
    }

    public getNumber():number {
        return this.num;
    }

    public setNumber(num:number) {
        this.num = num;
    }


    public setPlayerNumber(num:number, providedByUser:boolean)
    {
        this.num = num;
        this.numberProvided = providedByUser;
    }

    public toString():string {
        return JSON.stringify(this);
    }


    public static revive(playerToRevive:Player):Player {

        return this.reviveRecursive(playerToRevive, false);
    }

    private static reviveRecursive(playerToRevive:Player, isPlayerLink:boolean):Player
    {
        let revivedPosition = Position.revive(playerToRevive.playerType);
        let revivedPlayer = new Player(playerToRevive.name, revivedPosition, playerToRevive.currentPosition);
        revivedPlayer.setInRotation(playerToRevive.usedInRotation);
        revivedPlayer.setNumber(playerToRevive.num);
        revivedPlayer.setServe(playerToRevive.serve);
        if (!isPlayerLink && playerToRevive.playerLink !== undefined) {
            revivedPlayer.setPlayerLink(this.reviveRecursive(playerToRevive.playerLink, true));
        }
        return revivedPlayer;
    }



}