import axios from 'axios'
import React, { useState } from 'react'
import {Container,Row, Col} from "react-bootstrap"

const GetAllContactUs = () => {
    const [data, setData] = useState([]);
    console.log(data);
    React.useEffect(()=>{
        axios.get('http://localhost:3300/contact-us').then(({data})=>{
            setData(data?.results)
            console.log(data + ' ini res.res');
        })
    }, [])
    return(
        <Container fluid>
        <Row>
        {data?.map(item=> 
        <Col className='col-4 col-md-3 card-list'>
            <div>
                <h5>id : {item.id}</h5>
                <h5>nama : {item.fullname}</h5>
                <h5>email : {item.email}</h5>
                <p>message : {item.messages}</p>
            </div>
        </Col>
        )}
        </Row>
        </Container>
    )
}

export default GetAllContactUs