import axios from 'axios'
import React, { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap';
// import {Container,Row, Col} from "react-bootstrap"
import ModalDetail from './ModalDetail'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import { Link } from 'react-router-dom';

const GetAllContactUs = () => {
    const [data, setData] = React.useState([]);
    const [pageInfo, setPageInfo] = React.useState({})
    // console.log(data);

    React.useEffect(()=>{
        axios.get('http://localhost:3300/contact-us').then(({data})=>{
            setData(data?.results)
            setPageInfo(data.pageInfo)
            // console.log(data + ' ini res.res');
        })
    }, [])
    return(
        // <Container fluid>
        // <Row>
        // {data?.map(item=> 
        // <Col className='col-4 col-md-3 card-list'>
        //     <div>
        //         <h5>id : {item.id}</h5>
        //         <h5>nama : {item.fullname}</h5>
        //         <h5>email : {item.email}</h5>
        //         <p>message : {item.messages}</p>
        //     </div>
        // </Col>
        // )}
        // </Row>
        // </Container>
        <div className='d-flex flex-col align-items-center min-vh-100 p-40' fluid>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">full name</th>
                    <th scope="col">email</th>
                    <th scope="col">action</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item=> 
                    <tr>
                    <th scope="row">{item.id}</th>
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td className='flex gap-3'>
                        <div>
                            <ModalDetail 
                            id={item.id}
                            fullname={item.fullname}
                            email={item.email}
                            message={item.messages}
                            />
                        </div>
                        <div>
                            <ModalEdit
                            id={item.id}
                            fullname={item.fullname}
                            email={item.email}
                            message={item.messages}
                            />
                        </div>
                        <div>
                            <ModalDelete
                            id={item.id}
                            />
                        </div>
                    </td>
                </tr>
                )}
                </tbody>
            </table>
            <Row className='flex justify-between align-items-center '>
                <Col><Link to="/">Back to Home</Link></Col>
                <Col className='flex flex-row gap-6 align-items-center'>
                    <Button>Prev</Button>
                    <div>1</div>
                    <Button>Next</Button>
                    <select>
                        <option>5</option>
                        <option>10</option>
                    </select>
                </Col>
            </Row>
        </div>
    )
}

export default GetAllContactUs