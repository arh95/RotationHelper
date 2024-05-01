import React, { useRef, useState } from 'react';
import { Player } from './Player';
import PlayerOnCourtComponent from './PlayerOnCourtComponent';
import { Position, getPositionKey } from '../enums/Position';
import Button from '@mui/material/Button';
import './CourtComponent.css';
import Modal from 'react-modal';
import AddPlayerModal from './AddPlayerModal';

function Roster() {
    const rosterList = useRef(new Array());
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);


    function sortRosterListByPosition() {
        let rosterListCopy: Player[] = [];
        Object.keys(Position).forEach((key, index) => {
            let playersOfType: Player[] = [];
            for (let player of rosterList.current) {
                if (getPositionKey(player.getPlayerType) === key) {
                    playersOfType.push(player);
                }
            }
            rosterListCopy.concat(playersOfType);
        });
        rosterList.current = rosterListCopy;
    }

    function displayAddPlayerModal(showModal: boolean) {
        setShowAddPlayerModal(showModal);
    }

    function resetAddPlayerModal() {

    }





    return (
        <div className="RosterWidget">
            <div className='RosterDisplay'>
                <h3>My Roster</h3>

            </div>
            <div className='AddPlayerButton'>

            </div>
            <Button id='showModal' onClick={() => displayAddPlayerModal(true)}>
                Add Player
            </Button>
            <AddPlayerModal isOpen={showAddPlayerModal} cancelAction={(value:boolean) => {displayAddPlayerModal(value)}} submitAction={(value:boolean) => {displayAddPlayerModal(value)}}/>
        </div>
    );
}

export default Roster;
