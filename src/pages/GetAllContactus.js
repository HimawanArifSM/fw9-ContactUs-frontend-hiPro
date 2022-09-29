import axios from 'axios'
import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
// import {Container,Row, Col} from "react-bootstrap"
import ModalDetail from './ModalDetail'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { getContactUs } from '../redux/actions/contactUs';

const GetAllContactUs = () => {
    // const [data, setData] = React.useState([]);
    // const [pageInfo, setPageInfo] = React.useState({})
    const [lim, setLim] = React.useState(5)
    const [pages, setPages] = React.useState(1)
    const [seacrhed, setSearched] = React.useState('')
    const [sorted, setSorted] = React.useState('DESC')
    const [sortedBy, setSortedBy] = React.useState('id')
    const [seacrhedBy, setSearchedBy] = React.useState('fullname')
    const dispatch = useDispatch()

    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:3300/contact-us/${id}`)
        // page = parseInt(page)
        const qs = new URLSearchParams({limit:lim, page:pages, keyword:seacrhed, sorting:sorted, sortBy:sortedBy, seacrhBy:seacrhedBy}).toString()
        axios.get('http://localhost:3300/contact-us?'+qs).then(({data})=>{
            // setData(data?.results)
            // setPageInfo(data.pageInfo)
            // console.log(data + ' ini res.res');
        })

    }

    const allData = useSelector(state => state.contactUs.alldata);
    const pagesInfo = useSelector(state => state.contactUs.pageInfo);

    React.useEffect(()=>{
        dispatch(getContactUs({lim, pages, seacrhed, sorted, sortedBy, seacrhedBy}))
    }, [dispatch, lim, pages, seacrhed, sorted, sortedBy, seacrhedBy])

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
                {allData.map(item=> 
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
                            handleDelete={handleDelete}
                            />
                        </div>
                    </td>
                </tr>
                )}
                {allData.length < 1 && 
                <tr>
                    <td style={{height: 200}} colspan={5}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <b>there is no data</b>
                        </div>
                    </td>    
                </tr>}
                </tbody>
            </table>
            <Row className='flex justify-between align-items-center '>
                <Col><Link to="/" className='text-black'>Back to Home</Link></Col>
                <Col className='flex flex-row gap-6 align-items-center'>
                    <Button onClick={()=>setPages(pagesInfo.prevPage)} disabled={pagesInfo.currentPage<2 || allData.length < 1 }>Prev</Button>
                    <div>{pagesInfo.currentPage}</div>
                    <Button onClick={()=>setPages(pagesInfo.nextPage)} disabled={pagesInfo.totalPage === pagesInfo.currentPage}>Next</Button>
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