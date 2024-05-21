import { MutableRefObject, useRef, useState } from 'react';
import { Player } from './Player';
import { Source } from '../enums/Source';
import { Position } from '../enums/Position';
import Button from '@mui/material/Button';

import './RosterWidget.css';
import AddPlayerModal from './AddPlayerModal';
import PlayerWidget from './PlayerWidget';

function Roster() {

    const [rosterList, setRosterList] = useState(new Array<Player>());
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const nextValidPlayerNumber: MutableRefObject<number> = useRef(1);

    //TODO: add collapse/expand roster section controls (introduce accordion panel?)

    function sortRosterList(list: Player[]) {
        list.sort((a: Player, b: Player) => a.getNumber() - b.getNumber());
    }

    //this function is intended to run after a player has been created but BEFORE that player gets assigned a number and added to the roster list
    function generatePlayerNumber(): number {
        if (rosterList.length === 0) {
            //if no other players are in the roster list, then we can start at 1 for the player number
            return 1;
        }
        else {
            console.log("iterating through existing players to find their number");
            let rosterListCopy: Player[] = [];
            for (let player of rosterList) {
                rosterListCopy.push(player);
            }
            sortRosterList(rosterListCopy);
            let lowestAvailableNumber: number = 1;
            for (let i = 0; i < rosterListCopy.length; i++) {
                if (rosterListCopy[i].getNumber() === lowestAvailableNumber) {
                    lowestAvailableNumber++;
                }
                else {
                    //if in the array sorted by player number, we find a Player whose number does not equal our incremental
                    //tracker, that means that we can use our tracker's value as the number
                    return lowestAvailableNumber;
                }
            }
            //if we reach the end of the array without finding a number that is free for use, use the incremented value which 
            //should not be present in the array
            return lowestAvailableNumber;
        }
    }



function addPlayerToRoster(newPlayer: Player) {


    newPlayer.setNumber(generatePlayerNumber());
    let rosterListCopy: Player[] = [];
    Position.getValidPositions().forEach((position) => {
        console.log(position.getLabel);
        let playersOfType: Player[] = [];
        for (let player of rosterList) {
            if (player.getPlayerType().key == position.key) {
                playersOfType.push(player);
            }
        }
        if (newPlayer.getPlayerType() == position) {
            console.log("MATCH in position type");
            playersOfType.push(newPlayer);
        }
        rosterListCopy = rosterListCopy.concat(playersOfType);
    });
    console.log(rosterListCopy);
    // rosterListCopy = sortRosterList(rosterListCopy);
    setRosterList(rosterListCopy);
    displayAddPlayerModal(false);
}

//TODO: detection function to make sure that auto increment of player numbers goes smoothly, and takes into account team members that already exist

function displayAddPlayerModal(showModal: boolean) {
    setShowAddPlayerModal(showModal);
}

function resetAddPlayerModal() {

}





return (
    <div className="RosterWidget">

        <div className='RosterDisplay'>

            {rosterList.filter((player: Player) => !player.isOnCourt()).map((player: Player, index) => (
                <PlayerWidget key={player.getNumber()} player={player} source={Source.ROSTER} />
            ))}
        </div>
        <Button id='showModal' onClick={() => displayAddPlayerModal(true)}>
            Add Player
        </Button>
        <AddPlayerModal isOpen={showAddPlayerModal} cancelAction={(value: boolean) => { displayAddPlayerModal(value) }} submitAction={(value: Player) => { addPlayerToRoster(value) }} />
    </div>
);
}

export default Roster;
