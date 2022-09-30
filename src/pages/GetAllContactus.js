import React from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap';
import ModalDetail from './ModalDetail'
import ModalEdit from './ModalEdit'
import ModalDelete from './ModalDelete'
import { Link } from 'react-router-dom';
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { deleteContactUs, editContactUs, getContactUs } from '../redux/actions/contactUs';
import {getLim, getPages, getSeacrhed, getSeacrhedBy, getSorted, getSortedBy} from '../redux/reducers/contactUs'

const GetAllContactUs = () => {
    const [lim, setLim] = React.useState(5)
    const [pages, setPages] = React.useState(1)
    const [seacrhed, setSearched] = React.useState('')
    const [sorted, setSorted] = React.useState('DESC')
    const [sortedBy, setSortedBy] = React.useState('id')
    const [seacrhedBy, setSearchedBy] = React.useState('fullname')
    const dispatch = useDispatch()
    const allData = useSelector(state => state.contactUs.alldata);
    const msg = useSelector(state => state.contactUs.successMsg)
    const pagesInfo = useSelector(state => state.contactUs.pageInfo);
    const editFullname = useSelector(state => state.contactUs.fullname)
    const editEmail = useSelector(state => state.contactUs.email)
    const editMessage = useSelector(state => state.contactUs.message)
    const editId = useSelector(state => state.contactUs.id)
    const handleDelete = (id) => {dispatch(
        deleteContactUs({
            id, cb: () => {
                dispatch(getContactUs({lim, pages, seacrhed, sorted, sortedBy, seacrhedBy}))
            }
        }))
    }
    
    const handleEdit = async() => {
        const id = editId
        const request = { fullname: editFullname, email: editEmail, messages: editMessage };
        await dispatch(editContactUs({id, request}));
        dispatch(getContactUs({lim, pages, seacrhed, sorted, sortedBy, seacrhedBy}))
    }

    React.useEffect(()=>{
        dispatch(getLim(lim))
        dispatch(getPages(pages))
        dispatch(getSeacrhed(seacrhed))
        dispatch(getSorted(sorted))
        dispatch(getSortedBy(sortedBy))
        dispatch(getSeacrhedBy(seacrhedBy))
        dispatch(getContactUs({lim, pages, seacrhed, sorted, sortedBy, seacrhedBy}))
    }, [dispatch, lim, pages, seacrhed, sorted, sortedBy, seacrhedBy])

    return(
        <div className='d-flex flex-col align-items-center min-vh-100 min-w-full p-40' fluid>
            <Row className='flex flex-row justify-evenly w-full'>
                <Col className='flex gap-6'>
                    <input name="keyword" onChange={(e)=>{setSearched(e.target.value); setPages(1)}} placeholder="search" className='border-2 p-2 rounded-full placeholder:text-center text-center' />
                    <select onChange={(e)=>setSearchedBy(e.target.value)}>
                        <option value="fullname" >fullname</option>
                        <option value="email" >email</option>
                    </select>
                </Col>
                <Col className='flex flex-row gap-10'>
                    <Button onClick={()=>setSorted("ASC")}><FiArrowUp/></Button>
                    <select onChange={(e)=>setSortedBy(e.target.value)}>
                        <option value="id" selected>id</option>
                        <option value="fullname" >fullname</option>
                        <option value="email" >email</option>
                    </select>
                    <Button onClick={()=>setSorted("DESC")}><FiArrowDown/></Button>
                </Col>
            </Row>
            <Table className="table">
            {/* <Table responsive className="table"> */}
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">full name</th>
                    <th scope="col">email</th>
                    <th scope="col">action</th>
                </tr>
                </thead>
                <tbody>
                {allData?.map(item=> 
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
                            handleEdit={handleEdit}
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
                {msg === 'there is no data' && 
                <tr>
                    <td style={{height: 200}} colspan={5}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <b>there is no data</b>
                        </div>
                    </td>    
                </tr>}
                </tbody>
            </Table>
            <Row className='flex justify-between align-items-center '>
                <Col><Link to="/" className='text-black'>Back to Home</Link></Col>
                <Col className='flex flex-row gap-6 align-items-center'>
                    <Button onClick={()=>setPages(pagesInfo?.prevPage)} disabled={pagesInfo?.currentPage<2 || allData?.length < 1 || msg === 'there is no data' }>Prev</Button>
                    <div>{pagesInfo?.currentPage}</div>
                    <Button onClick={()=>setPages(pagesInfo?.nextPage)} disabled={pagesInfo?.totalPage === pagesInfo?.currentPage}>Next</Button>
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