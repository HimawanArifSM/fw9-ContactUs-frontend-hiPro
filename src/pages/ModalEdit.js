import React from "react";
import { Button, Modal } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='no-border2' closeButton>
          <Modal.Title  id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }
  
  function Modals() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="success" onClick={() => setModalShow(true)}>
        Edit
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
  export default Modals