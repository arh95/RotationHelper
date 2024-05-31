import { Position } from "../enums/Position";
import { Source } from "../enums/Source";

export class Player {
    name: String;
    playerType: Position;
    //active = currently on the court

    active: boolean = false;
    location: Source = undefined;
    //playerLink now list representation to accomodate libero use case (multiple subsitutions)
    playerLink: Player[];
    playerServeIndex:number = 0;
    
    serving: boolean = true;
    dummy: boolean = false;


    // num:number;
    id:number = 1;

    //TODO: implement (optional) player number, if the field was filled out on creation, then display that info.
    //otherwise, auto-increment the player id starting from the lowest available number on the current team


    //  id:number;
    //TODO use mongoDB for player ids, like i did for chess games

    constructor(name: String, playerType: Position) {
        //todo: figure out currentPosition value, is it like player number? or is it like, rotation location?
        this.name = name;
        this.playerType = playerType;
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

    public setDummy(dummy:boolean){
        this.dummy = dummy;
    }

    public isDummy():boolean {
        return this.dummy;
    }

    public setPlayerType(playerType: Position) {
        this.playerType = playerType;
    }

    public getPlayerType(): Position {
        return this.playerType;
    }

    public getLocation():Source {
        return this.location;
    }

    public setLocation(location:Source){
        this.location = location;
    }


    public setActive(onCourt: boolean) {
        this.active = onCourt;
    }

    public isActive(): boolean {
        return this.active;
    }

    public setServing(serving: boolean) {
        this.serving = serving;
    }

    public isServing(): boolean {
        return this.serving;
    }

    public getPlayerLink():Player[] | undefined {
        return this.playerLink;
    }

    public setPlayerLink(player:Player[])
    {
        this.playerLink = player;
    }

    // public getNumber():number {
    //     return this.num;
    // }

    // public setNumber(num:number) {
    //     this.num = num;
    // }

    public setId(id:number) {
        this.id = id;
    }
    public getId():number {
        return this.id;
    }

    public toString():string {
        return JSON.stringify(this);
    }
}