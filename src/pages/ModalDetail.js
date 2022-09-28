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
        <Modal.Header className='no-border2' closeButton>
          <Modal.Title  id="contained-modal-title-vcenter">
            Detail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container fluid>
        <Row>
        <Col className='card-list'>
            <div>
                <h5>id : {props.id}</h5>
                <h5>nama : {props.fullname}</h5>
                <h5>email : {props.email}</h5>
                <h5>message : {props.message}</h5>
            </div>
        </Col>
        </Row>
        </Container>
        </Modal.Body>
      </Modal>
    );
  }
  
  function Modals({id, fullname, email, message}) {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
        Detail
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
          fullname={fullname}
          email={email}
          message={message}
        />
      </>
    );
  }
  
  export default Modals