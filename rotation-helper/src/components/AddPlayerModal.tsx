import Button from '@mui/material/Button';
import './CourtComponent.css';
import Modal from 'react-modal';
import { IModalProps } from './IProps';

export default function AddPlayerModal({ isOpen, cancelAction, submitAction }: IModalProps) {
    return (
        < Modal className='AddPlayerModal' isOpen={isOpen} >
            <div className='modalControls'>
                <Button id='CancelNewPlayer' onClick={() => cancelAction(false)}>
                    Cancel
                </Button>
                <Button id='SubmitNewPlayer' onClick={() => submitAction(false)}>
                    Submit
                </Button>
            </div>
        </Modal >
    );
}