import React from 'react'
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

export default function MyVerticallyCenteredModal(props) {

    return (<div className="modal">
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Title id="contained-modal-title-vcenter">
                sign in AddAlertIcon
            </Modal.Title> */}
            <Modal.Body >
                {props.content}
            </Modal.Body>
            <div className="buttons-pop">
                <Button className="btn btn-secondary close" variant="primary" onClick={props.onHide}>
                    Close
                </Button>
            </div>
        </Modal>
    </div>
    );
}
