import React from 'react'
import Modal from "react-bootstrap/Modal";
import './modal.css';
import CloseIcon from '@mui/icons-material/Close';

export default function MyVerticallyCenteredModal(props) {

    return (<div className="modal">
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-pop-up"
        >
            {/* <Modal.Title id="contained-modal-title-vcenter">
                sign in AddAlertIcon
            </Modal.Title> */}
            <Modal.Body  >
                <div className="modal-content">
                {props.content}
                </div>
            </Modal.Body>
            <div className="buttons-pop">
                {/* <Button className="btn btn-secondary close" variant="primary" onClick={props.onHide}>
                    Close
                </Button> */}
                <CloseIcon className="modal-close-icon" onClick={props.onHide}/>
            </div>
        </Modal>
    </div>
    );
}
