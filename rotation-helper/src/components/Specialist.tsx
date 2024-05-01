import { Player } from "./Player";
import { Position } from "../enums/Position";

class Specialist extends Player {
    //This class will serve for the specialization substitutions (Service, defense)


    //serving specialist vs defensive specialist flag
    onlyServe:boolean = false;

    get isOnlyServe() : boolean
    {
        return this.onlyServe;
    }

    set setOnlyServe(isOnlyServing:boolean) {
        this.onlyServe = isOnlyServing;
    }
}