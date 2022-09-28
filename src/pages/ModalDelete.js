// import axios from "axios";
import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";

function MyVerticallyCenteredModal(props) {
    console.log(props);
    // const onSubmit = async()=>{
    //     await axios.delete(`http://localhost:3300/contact-us/${props.id}`)
    // }

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
            <button type="button" onClick={()=>props.handleClose()} class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="submit" onClick={()=>{props.handleDelete(props.id); props.handleClose()}} class="btn btn-primary">Delete</button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  function Modals({id, lim, pages, seacrhed, sorted, sortedBy, seacrhedBy, handleDelete }) {
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        setModalShow(false)
    }
    return (
      <>
        <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete
        </Button>
  
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                handleDelete={handleDelete}
                handleClose={handleClose}
            />
      </>
    );
  }
  
  export default Modals