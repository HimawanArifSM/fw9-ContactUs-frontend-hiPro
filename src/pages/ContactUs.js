import React, { useState } from "react";
import {FiMapPin,FiMail,FiPhone} from "react-icons/fi"
import { Alert, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {  postContactUs } from "../redux/actions/contactUs";
import { Link } from "react-router-dom";
import { resetmsg } from "../redux/reducers/contactUs";

const contactUsSchema = Yup.object().shape({
    fullname: Yup.string().min(4, 'Name length minimal 4').required('Required'),
    email: Yup.string().email("Invalid email format").required('Required'),
    messages: Yup.string().max(255, 'Maximum message 255 character').required('Required')
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

function ContactUs() {
    const dispatch = useDispatch()
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState('');
    const successMsg = useSelector(state => state.contactUs.successMsg)
    // const navigate = useNavigate()
    const onSubmit = (value, e) => {
        console.log(e);
        setFullname(value.fullname)
        setEmail(value.email)
        setMessages(value.messages)
        const data = { fullname: value.fullname, email: value.email, messages: value.messages };
        console.log(data);
        dispatch(postContactUs(data));
        e.resetForm({values:{fullname: '', email: '', messages:''}})
        // navigate("/get-all-contactus");
    };
    if(successMsg){
        setTimeout(()=> dispatch(resetmsg()), 2000)
    }
    React.useEffect(() => {
        if (fullname!=null && email!=null && messages!=null){
            setFullname('')
            setEmail('')
            setMessages('')
        }
    }, [fullname, email, messages]);
    return(
        <div className="lp-background min-h-screen ">
            <div className="bg-black/75 min-h-screen flex flex-col items-center justify-center">
            {successMsg? <Alert variant='success'>
            Successfully send your message!
            </Alert> : <div className="h-[74px]"></div>}
            <div className="flex justify-evenly p-5 items-center gap-[20em]">
                <div className="flex flex-col gap-28">
                    <div className="flex flex-row gap-3 items-center h-full">
                        <FiMapPin size={60} color="white" />
                        <div className="flex flex-col h-full">
                            <h3 className="text-white items-center h-full">ADDRESS</h3>
                            <span className="text-white items-center h-full">71 Pilgrim Avenue Chevy Chase, MD 20815</span>
                        </div>
                    </div>
                    <div className="flex-row flex gap-3 align-items-center">
                        <FiPhone size={60} color="white" />
                        <div>
                            <h3 className="text-white">PHONE</h3>
                            <span className="text-white">+713-621-7636</span>
                        </div>
                    </div>
                    <div className="flex-row flex gap-3 align-items-center">
                        <FiMail size={60} color="white" />
                        <div>
                            <h3 className="text-white align-items-center">EMAIL</h3>
                            <span className="text-white">thompson@dayrep.com</span>
                        </div>
                    </div>
                    <Link to="/get-all-contactus" className="text-white">Go to data list</Link>
                </div>
                <div className="bg-white p-16 flex flex-col gap-10">
                    <h1 className="text-green-600 font-bold flex justify-center">LEAVE US MESSAGES</h1>
                    <Formik 
                    onSubmit={onSubmit}
                    initialValues={{fullname: '', email: '', messages:''}} validationSchema={contactUsSchema}>
                    {(props)=><ContactUsForm {...props}/>}
                    </Formik>
                </div>
            </div>
            </div>
        </div>
    )
}
export default ContactUs