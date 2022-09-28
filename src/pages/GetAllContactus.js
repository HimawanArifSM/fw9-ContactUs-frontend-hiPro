import axios from 'axios'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
// import {Container,Row, Col} from "react-bootstrap"
import ModalDetail from './ModalDetail'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowDown } from "react-icons/fi";

const GetAllContactUs = () => {
    const [data, setData] = React.useState([]);
    const [pageInfo, setPageInfo] = React.useState({})
    const [lim, setLim] = React.useState(5)
    const [pages, setPages] = React.useState(1)
    const [seacrhed, setSearched] = React.useState('')
    const [sorted, setSorted] = React.useState('DESC')
    const [sortedBy, setSortedBy] = React.useState('id')
    const [seacrhedBy, setSearchedBy] = React.useState('fullname')

    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:3300/contact-us/${id}`)
        // page = parseInt(page)
        const qs = new URLSearchParams({limit:lim, page:pages, keyword:seacrhed, sorting:sorted, sortBy:sortedBy, seacrhBy:seacrhedBy}).toString()
        axios.get('http://localhost:3300/contact-us?'+qs).then(({data})=>{
            setData(data?.results)
            setPageInfo(data.pageInfo)
            // console.log(data + ' ini res.res');
        })

    }

    const getAllData = (limit, page, keyword, sorting, sortBy, seacrhBy)=> {
        // limit = parseInt(lim)

        page = parseInt(page)
        const qs = new URLSearchParams({limit, page, keyword, sorting, sortBy, seacrhBy}).toString()
        axios.get('http://localhost:3300/contact-us?'+qs).then(({data})=>{
            setData(data?.results)
            setPageInfo(data.pageInfo)
            // console.log(data + ' ini res.res');
        })
    }

    React.useEffect(()=>{
        // if (seacrhed){
        //     // setPages(1)
        //     getAllData(lim, pages, seacrhed)
        // } else{
        //     getAllData(lim, pages, seacrhed)
        // }
        getAllData(lim, pages, seacrhed, sorted, sortedBy, seacrhedBy)
    }, [lim, pages, seacrhed, sorted, sortedBy, seacrhedBy])

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
            <div className='flex flex-row justify-evenly w-full'>
                <div className='flex gap-6'>
                    <input name="keyword" onChange={(e)=>{setSearched(e.target.value); setPages(1)}} placeholder="search" className='border-2 p-2 rounded-full placeholder:text-center text-center' />
                    <select onChange={(e)=>setSearchedBy(e.target.value)}>
                        <option value="fullname" >fullname</option>
                        <option value="email" >email</option>
                    </select>
                </div>
                <div className='flex flex-row gap-10'>
                    <Button onClick={()=>setSorted("ASC")}><FiArrowUp/></Button>
                    <select onChange={(e)=>setSortedBy(e.target.value)}>
                        <option value="id" selected>id</option>
                        <option value="fullname" >fullname</option>
                        <option value="email" >email</option>
                    </select>
                    <Button onClick={()=>setSorted("DESC")}><FiArrowDown/></Button>
                </div>
            </div>
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
                            fullname={item.fullname}
                            email={item.email}
                            message={item.messages}
                            lim={lim}
                            pages={pages}
                            seacrhed={seacrhed}
                            sorted={sorted}
                            sortedBy={sortedBy}
                            seacrhedBy={seacrhedBy}
                            handleDelete={handleDelete}
                            />
                        </div>
                    </td>
                </tr>
                )}
                </tbody>
            </table>
            <Row className='flex justify-between align-items-center '>
                <Col><Link to="/" className='text-black'>Back to Home</Link></Col>
                <Col className='flex flex-row gap-6 align-items-center'>
                    <Button onClick={()=>setPages(pageInfo.prevPage)} disabled={pageInfo.currentPage<2}>Prev</Button>
                    <div>{pageInfo.currentPage}</div>
                    <Button onClick={()=>setPages(pageInfo.nextPage)} disabled={pageInfo.totalPage === pageInfo.currentPage}>Next</Button>
                    <select onChange={(e)=>setLim(e.target.value)}>
                        <option value={5} selected>5</option>
                        <option value={10} >10</option>
                    </select>
                </Col>
            </Row>
        </div>
    )
}

export default GetAllContactUs