import Button from '@mui/material/Button';
import './AddPlayerModal.css';
import Modal from 'react-modal';
import { IModalProps } from './IProps';
import { Player } from './Player';
import { Position } from '../enums/Position';
import { ChangeEventHandler, useState, useRef, MutableRefObject } from 'react';

export default function AddPlayerModal({ isOpen, cancelAction, submitAction }: IModalProps) {

    const [options, setOptions]= useState(Position.getValidPositions());
    const playerName:MutableRefObject<string> = useRef("");
    const playerPosition:MutableRefObject<Position> = useRef(Position.NONE);


    function createNewPlayer(): Player {
        let newPlayer: Player = new Player(playerName.current, playerPosition.current, -1);
        resetWidgetState();
        return newPlayer;
    }

    function resetWidgetState(): void {
        playerName.current = "";
        playerPosition.current = Position.NONE;
    }

    function changePlayerPosition(event:React.ChangeEvent<HTMLSelectElement>)
    {
        let newPosition:Position = Position.getPositionByKey(event.target.value);
        playerPosition.current = newPosition;
    }

    function changePlayerName(event:React.ChangeEvent<HTMLInputElement>)
    {
        playerName.current = event.target.value;
    }

    return (
        //TODO: accessibility needs, need appEl set
        <Modal className='AddPlayerModal' isOpen={isOpen} ariaHideApp={false}>

            <div id="ModalBody">
                <form className='AddPlayerForm'>
                    <label>Enter the player's name:
                        <input type='text' placeholder='name' onChange={(event) => changePlayerName(event)}/>
                    </label>
                    <br />
                    <label>Select the player's position:
                        <select id='PositionSelect' defaultValue={Position.NONE.getKey} onChange={(event) => changePlayerPosition(event)}>
                            <option value={Position.NONE.getKey} disabled>Select a position:</option>
                            {options.map((item: Position, index) => (
                                <option value={item.getKey}>
                                    {item.getLabel}
                                </option>
                            ))}
                        </select>
                    </label>

{/* TODO: conditional form fields based on player type? (i.e. specialist, libero, have required player ) 
or prompt this when attemtping to add to court*/}
                </form>

                <div className='ModalControls'>
                    <Button id='CancelNewPlayer' onClick={() =>  {
                        resetWidgetState();
                        cancelAction(false);
                    }}>
                        Cancel
                    </Button>
                    <Button id='SubmitNewPlayer' onClick={() => submitAction(createNewPlayer())}>
                        Submit
                    </Button>
                </div>
            </div>
        </Modal >
    );
}