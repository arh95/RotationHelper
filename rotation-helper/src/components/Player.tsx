import { Position } from "../enums/Position";

export class Player {
    name: String;
    playerType: Position;
    currentPosition: number;
    usedInRotation: boolean = false;
    playerLink: Player | undefined = undefined;
    serve: boolean = true;

    //  id:number;
    //TODO use mongoDB for player ids, like i did for chess games

    constructor(name: String, playerType: Position, currentPosition: number) {
        this.name = name;
        this.playerType = playerType;
        this.currentPosition = currentPosition;
    }

    /**
     * hasPlayerLink defines a substitution connection between this player and a different player. The type of the player object
     * will be used to determine what occurs when this player rotates/transitions between the front and back rows
     */
    public hasPlayerLink(): boolean {
        return this.playerLink !== undefined;
    }

    set setName(name: String) {
        this.name = name;
    }
    get getName(): String {
        return this.name;
    }

    set setPlayerType(playerType: Position) {
        this.playerType = playerType;
    }

    get getPlayerType(): Position {
        return this.playerType;
    }

    set setCurrentPosition(currentPosition: number) {
        this.currentPosition = currentPosition;
    }

    get getCurrentPosition(): number {
        return this.currentPosition;
    }

    set setInRotation(value: boolean) {
        this.usedInRotation = value;
    }

    get isInRotation(): boolean {
        return this.usedInRotation;
    }

    set setServe(willServe: boolean) {
        this.serve = willServe;
    }

    get isServing(): boolean {
        return this.serve;
    }

    get getPlayerLink():Player | undefined {
        return this.playerLink;
    }

    set setPlayerLink(player:Player)
    {
        this.playerLink = player;
    }


}