import { Position } from "../enums/Position";

export class Player {
    name: String;
    playerType: Position;
    currentPosition: number;
    onCourt: boolean = false;
    playerLink: Player;
    serving: boolean = true;
    num:number;

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

    public setOnCourt(onCourt: boolean) {
        this.onCourt = onCourt;
    }

    public isOnCourt(): boolean {
        return this.onCourt;
    }

    public setServing(serving: boolean) {
        this.serving = serving;
    }

    public isServing(): boolean {
        return this.serving;
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

    public toString():string {
        return JSON.stringify(this);
    }
}