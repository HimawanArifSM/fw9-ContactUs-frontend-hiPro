import React, { useState } from "react";
import {FiMapPin,FiMail,FiPhone} from "react-icons/fi"
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { getContactUs } from "../redux/actions/contactUs";

const contactUsSchema = Yup.object().shape({
    fullname: Yup.string().required('Required'),
    email: Yup.string().email("Invalid email format").required('Required'),
    messages: Yup.string().required('Required')
})

function ContactUsForm(props){
console.log(props.values);
    return(
        <Form noValidate onSubmit={props.handleSubmit} className="flex flex-col gap-10">
            <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                <Form.Control isInvalid={!!props.errors.fullname} value={props.values.fullname} onChange={props.handleChange} name="fullname" className="outline-none w-full" placeholder="Name" />
                <Form.Control.Feedback type="invalid">{props.errors.fullname}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
                <Form.Control isInvalid={!!props.errors.email} value={props.values.email} onChange={props.handleChange} name="email" className="outline-none w-full"placeholder="E-mail" />
                <Form.Control.Feedback type="invalid">{props.errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="border-b-[1px] border-black pb-2 outline-hidden">
            <textarea  onChange={props.handleChange} value={props.values.messages} name="messages" className="w-full h-full outline-none" form="messages" placeholder="Messages" ></textarea>
                <Form.Control.Feedback type="invalid">{props.errors.messages}</Form.Control.Feedback>
            </Form.Group>
            <div className="flex justify-center "><Button type='submit' className="bg-green-600 pl-20 pr-20 pt-3 pb-3">SEND</Button></div>
        </Form>
    )
}

function ContactUs() {
    const dispatch = useDispatch()
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [messages, setMessages] = useState('');
    const onSubmit = (value, e) => {
        console.log(e);
        setFullname(value.fullname)
        setEmail(value.email)
        setMessages(value.messages)
        const data = { fullname: value.fullname, email: value.email, messages: value.messages };
        console.log(data);
        dispatch(getContactUs(data));
        e.resetForm({values:{fullname: '', email: '', messages:''}})
    };
    React.useEffect(() => {
        if (fullname!=null && email!=null && messages!=null){
            setFullname('')
            setEmail('')
            setMessages('')
        }
    }, [fullname, email, messages]);
    console.log(fullname);
    console.log(email);
    console.log(messages);
    return(
        <div className="lp-background min-h-screen ">
            <div className="flex justify-evenly bg-black/75 min-h-screen p-5 items-center">
                <div className="flex flex-col gap-10">
                    <div  className="flex-row flex gap-3">
                        <FiMapPin size={36} color="white" />
                        <div>
                            <h1 className="text-white">ADDRESS</h1>
                            <p className="text-white">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                        </div>
                    </div>
                    <div className="flex-row flex gap-3">
                        <FiPhone size={36} color="white" />
                        <div>
                            <h1 className="text-white">PHONE</h1>
                            <p className="text-white">+713-621-7636</p>
                        </div>
                    </div>
                    <div className="flex-row flex gap-3">
                        <FiMail size={36} color="white" />
                        <div>
                            <h1 className="text-white">EMAIL</h1>
                            <p className="text-white">thompson@dayrep.com</p>
                    </div>
                    </div>
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
    )
}
export default ContactUs