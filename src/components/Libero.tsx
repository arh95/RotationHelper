import { Player } from "./Player";
import { Position } from "../enums/Position";

class Libero extends Player {
    swapPosition: Position = Position.MIDDLE;

    //note:a libero's PlayerLink is the player that they will serve for. If that playerLink is not set, libero will not serve
    //this is because libero uses a Position reference to decide whether or not they'll be subbing in, instead of PlayerLink

    get getSwapPosition() : Position
    {
        return this.swapPosition;
    }
    set setSwapPosition(position:Position)
    {
        if (position === Position.LIBERO) {
                console.error("Cannot libero for a libero.");
        } else 
        {
            this.swapPosition = position;
        }
    }
}