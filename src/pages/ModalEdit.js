import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { editContactUs, getContactUs } from "../redux/actions/contactUs";
import qs from 'qs';
const contactUsSchema = Yup.object().shape({
    fullname: Yup.string({min:1}).required('Required'),
    email: Yup.string().email("Invalid email format").required('Required'),
    messages: Yup.string().required('Required')
})

// function ContactUsForm(props){
//     // console.log(props.values);
//         return(
//             <Form noValidate onSubmit={props.handleSubmit} className="flex flex-col gap-10">
//                 <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
//                     <Form.Control isInvalid={!!props.errors.fullname} value={props.values.fullname} onChange={props.handleChange} name="fullname" className=" no-border outline-none w-full shadow-none" placeholder="Name" />
//                     <Form.Control.Feedback type="invalid">{props.errors.fullname}</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
//                     <Form.Control isInvalid={!!props.errors.email} value={props.values.email} onChange={props.handleChange} name="email" className="no-border outline-none w-full shadow-none" placeholder="E-mail" />
//                     <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
//                 </Form.Group>
//                 <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
//                     <Form.Control as="textarea" isInvalid={!!props.errors.email} onChange={props.handleChange} value={props.values.messages} name="messages" className="w-full h-full outline-none no-border shadow-none" form="messages" placeholder="Messages" />
//                     <Form.Control.Feedback type="invalid">{props.errors.messages}</Form.Control.Feedback>
//                 </Form.Group>
//                 <div className="flex justify-center"><Button type='submit' className="btn-green text-center">SEND</Button></div>
//             </Form>
//         )
//     }

function MyVerticallyCenteredModal(props) {
    const dispatch = useDispatch()
    const id = props.id
    // const successMsg = useSelector(state => state.contactUs.successMsg)
    const onSubmit = (value) => {
        console.log(value);
        const request = { fullname: value.fullname, email: value.email, messages: value.messages };
        console.log(qs.stringify(request) + 'ini data di modal');
        console.log(id+" id di modal");
        dispatch(editContactUs({id, request}));
        // const lim = props.lim
        // const pages = props.pages
        // const seacrhed = props.seacrhed
        // const sorted = props.sorted
        // const sortedBy = props.sortedBy
        // const seacrhedBy = props.seacrhedBy
        // if(successMsg){
        //     dispatch(getContactUs({lim, pages, seacrhed, sorted, sortedBy, seacrhedBy}))
        // }
    }

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
                    enableReinitialize 
                    onSubmit={onSubmit}
                    initialValues={{fullname: props.fullname, email: props.email, messages:props.message}} validationSchema={contactUsSchema}>
                    {/* {(props)=><ContactUsForm {...props}/>} */}
                    {({errors, handleChange, handleSubmit, handleEdit, id, handleClose, setModalShow}) => (
                        <Form noValidate onSubmit={handleSubmit} className="flex flex-col gap-10">
                        <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                            <Form.Control isInvalid={!!errors.fullname} defaultValue={props.fullname} onChange={handleChange} name="fullname" className=" no-border outline-none w-full shadow-none" placeholder="Name" />
                            <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                            <Form.Control isInvalid={!!errors.email} defaultValue={props.email} onChange={handleChange} name="email" className="no-border outline-none w-full shadow-none" placeholder="E-mail" />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                            <Form.Control as="textarea" isInvalid={!!errors.email} onChange={handleChange} defaultValue={props.message} name="messages" className="w-full h-full outline-none no-border shadow-none" form="messages" placeholder="Messages" />
                            <Form.Control.Feedback type="invalid">{errors.messages}</Form.Control.Feedback>
                        </Form.Group>
                        <div className="flex justify-center"><Button type="submit" onClick={()=>{props.handleDelete(props.id); props.handleClose()}} className="btn-green text-center">SEND</Button></div>
                        </Form>
                    )}
                </Formik>
            </div>
        </Col>
        </Row>
        </Container>
        </Modal.Body>
      </Modal>
    );
  }
  
  function Modals({id, fullname, email, message, lim, pages, seacrhed, sorted, sortedBy, seacrhedBy, handleEdit}) {
    const [modalShow, setModalShow] = React.useState(false);
    const handleClose = () => {
        setModalShow(false)
    }
    return (
      <>
        <Button variant="success" onClick={() => setModalShow(true)}>
        Edit
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={id}
          fullname={fullname}
          email={email}
          message={message}
          handleClose={handleClose}
          lim={lim}
          pages={pages}
          seacrhed={seacrhed}
          sorted={sorted}
          sortedBy={sortedBy}
          seacrhedBy={seacrhedBy}
          handleEdit={handleEdit}
        />
      </>
    );
  }
  
  export default Modals