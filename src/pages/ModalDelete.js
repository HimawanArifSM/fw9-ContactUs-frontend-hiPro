import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='border-none' closeButton>
          <Modal.Title  id="contained-modal-title-vcenter">
            Delete Feedback
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='border-none'>
        <Container fluid>
        <Row>
        <Col className='card-list'>
            <div>
                <h5>Are you sure want to delete this feedback?</h5>
            </div>
        </Col>
        </Row>
        </Container>
        </Modal.Body>
        <Modal.Footer className='border-none'>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function Modals() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  
  export default Modals