import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CButton,
    CPagination,
    CPaginationItem,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CAvatar,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import setting from '../../setting.json'
import Error404 from '../pages/page404/Page404'
import { Ban, Type } from './utils'
import { get } from '../../fetch'

const BestsList = () => {
    const [datalist, setDatalist] = useState(null);
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [ID, setID] = useState(0)
    const [index, setIndex] = useState(0)
    const [change, setChange] = useState(1)

    let paginagtion = []
    for (let i = 1; i <= count; i++) {
        paginagtion.push(i)
    }

    const DeleteButton = (id, index) => {
        setID(id)
        setIndex(index)
        setVisible(true)
    }

    const fetch = async (number) => {
        const res = await get(`/admin/user/all?page=${number}`)
        if (!!res) {
            setDatalist(res.data.data)
            setCount(res.data.pages)
            setPage(res.data.page)
        }

    }
    useEffect(() => {
        fetch(1)
    }, [change])



    const PaginagtionActive = (props) => {
        if (props.num == page) {
            return <CPaginationItem onClick={(e) => { console.log(e.target.innerText) }} active >{props.num}</CPaginationItem>
        } else {
            return <CPaginationItem onClick={(e) => { fetch(e.target.innerText) }} >{props.num}</CPaginationItem>
        }
    }

    const Next = () => {
        if (page == count) {
            return <CPaginationItem id='next' aria-label="Next" disabled>
                <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
        } else {
            return <CPaginationItem id='next' aria-label="Next" onClick={(e) => { fetch(page + 1) }}>
                <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
        }
    }
    const Back = () => {
        if (page == 1) {
            return <CPaginationItem id='next' aria-label="Next" disabled>
                <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
        } else {
            return <CPaginationItem id='next' aria-label="Next" onClick={(e) => { fetch(page - 1) }}>
                <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
        }
    }






    if (!datalist) {
        return (
            <Error404 />
        )
    }
    return (
        <div>



            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader style={{
                        "display": "flex",
                        "justifyContent": "space-between"
                    }}>
                        <strong>Student's academic datalist</strong>

                    </CCardHeader>
                    <CCardBody className='mapping-list' >
                        <CTable hover striped style={{ "textAlign": 'center' }}>
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Nick</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Image</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Ban</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    datalist.map((data, index) =>

                                        <CTableRow key={index} >

                                            <CTableHeaderCell onClick={(e) => {
                                                window.location.href = `./#/user/view?id=${data.id}`;
                                            }} scope="row">
                                                {data.id}
                                            </CTableHeaderCell>


                                            <CTableDataCell onClick={(e) => {
                                                window.location.href = `./#/user/view?id=${data.id}`;
                                            }} >
                                                {data.nick}
                                            </CTableDataCell>

                                            <CTableDataCell onClick={(e) => {
                                                window.location.href = `./#/user/view?id=${data.id}`;
                                            }} >
                                                {`${data.name} ${data.surname}`}
                                            </CTableDataCell>


                                            <CTableDataCell onClick={(e) => { window.location.href = `./#/user/view?id=${data.id}`; }} >
                                                <CAvatar src={`${setting.IP}/${data.img}`} size="xl" />
                                            </CTableDataCell>

                                            <CTableDataCell >
                                                <Ban ban={data.ban} id={data.id} />
                                            </CTableDataCell>

                                            <CTableDataCell  >
                                                <Type type={data.type} id={data.id} />
                                            </CTableDataCell>



                                        </CTableRow>

                                    )
                                }

                            </CTableBody>

                        </CTable>
                       


                    </CCardBody>
                    <CPagination style={{
                            "display": "flex",
                            "justifyContent": "center"
                        }}  >
                            <Back />
                            {paginagtion.map((pag, index) => <PaginagtionActive key={index} num={pag} />)}
                            <Next />
                        </CPagination>
                </CCard>
            </CCol >
        </div>

    )
}

export default BestsList;