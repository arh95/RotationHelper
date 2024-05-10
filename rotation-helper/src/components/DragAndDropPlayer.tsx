import { Player } from "./Player";

class DragAndDropPlayer extends Player {
    source:string;

    get getSource():string {
        return this.source;
    }

    set setSource(source:string)
    {
        this.source = source;
    }
}