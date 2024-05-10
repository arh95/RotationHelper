import React, { useRef, useState } from 'react';
import { Player } from './Player';
import PlayerOnCourtWidget from './PlayerOnCourtWidget';
import { Position } from '../enums/Position';
import Button from '@mui/material/Button';

import './RosterWidget.css';
import Modal from 'react-modal';
import AddPlayerModal from './AddPlayerModal';
import PlayerInRosterWidget from './PlayerInRosterWidget';

function Roster() {
    //TODO: this roster list gets 
    const [rosterList, setRosterList] = useState(new Array<Player>());
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

    //TODO: add collapse/expand roster section controls (introduce accordion panel?)

    function sortedRosterList() {

    }

    function addPlayerToRoster(newPlayer: Player) {

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
                console.log("MATCH");
                playersOfType.push(newPlayer);
            }
            rosterListCopy = rosterListCopy.concat(playersOfType);
        });
        console.log(rosterListCopy);
        setRosterList(rosterListCopy);
        console.log(rosterList);
        displayAddPlayerModal(false);
    }

    function displayAddPlayerModal(showModal: boolean) {
        setShowAddPlayerModal(showModal);
    }

    function resetAddPlayerModal() {

    }





    return (
        <div className="RosterWidget">

            <div className='RosterDisplay'>

                {rosterList.map((player: Player, index) => (
                    <PlayerInRosterWidget key={index} player={player} />
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
