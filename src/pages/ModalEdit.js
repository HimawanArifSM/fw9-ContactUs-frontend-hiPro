import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import * as Yup from 'yup';

const contactUsSchema = Yup.object().shape({
    fullname: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email format").required('Required'),
    messages: Yup.string().required('Required')
})

function ContactUsForm(props){
    // console.log(props.values);
        return(
            <Form noValidate onSubmit={props.handleSubmit} className="flex flex-col gap-10">
                <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                    <Form.Control isInvalid={!!props.errors.fullname} value={props.values.fullname} onChange={props.handleChange} name="fullname" className=" no-border outline-none w-full shadow-none" placeholder="Name" />
                    <Form.Control.Feedback type="invalid">{props.errors.fullname}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                    <Form.Control isInvalid={!!props.errors.email} value={props.values.email} onChange={props.handleChange} name="email" className="no-border outline-none w-full shadow-none" placeholder="E-mail" />
                    <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                    <Form.Control as="textarea" isInvalid={!!props.errors.email} onChange={props.handleChange} value={props.values.messages} name="messages" className="w-full h-full outline-none no-border shadow-none" form="messages" placeholder="Messages" />
                    <Form.Control.Feedback type="invalid">{props.errors.messages}</Form.Control.Feedback>
                </Form.Group>
                <div className="flex justify-center"><Button type='submit' className="btn-green text-center">SEND</Button></div>
            </Form>
        )
    }

function MyVerticallyCenteredModal(props) {
    const onSubmit = (value, e) => {
        // console.log(e);
        // setFullname(value.fullname)
        // setEmail(value.email)
        // setMessages(value.messages)
        // const data = { fullname: value.fullname, email: value.email, messages: value.messages };
        // console.log(data);
        // dispatch(postContactUs(data));
        // e.resetForm({values:{fullname: '', email: '', messages:''}})
        // navigate("/get-all-contactus");
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='no-border2' closeButton>
            <Modal.Title  id="contained-modal-title-vcenter">
                Edit Feedback
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container fluid>
        <Row>
        <Col className='card-list'>
            <div>
                <Formik 
                    onSubmit={onSubmit}
                    initialValues={{fullname: '', email: '', messages:''}} validationSchema={contactUsSchema}>
                    {(props)=><ContactUsForm {...props}/>}
                </Formik>
            </div>
        </Col>
        </Row>
        </Container>
        </Modal.Body>
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