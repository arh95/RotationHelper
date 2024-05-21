import { Source } from "../enums/Source"
import { Player } from "./Player"

export interface IPlayerProps {
    player: Player
    //maybe this required key value could be used as court position (i.e. 6,1,2 (Back row) 3,4,5(Front Row) 6 (Libero) 7+ subsitutes)
    key: number
}

export interface IDragAndDropProps {
    player: Player
    key: number
    source: Source
}

export interface IModalProps {
    isOpen: boolean,
    cancelAction:(val:boolean)=>void, 
    submitAction:(val:Player)=>void,
}
