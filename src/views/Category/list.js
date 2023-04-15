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
    CForm,
    CFormInput
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import setting from '../../setting.json'
import { del, get } from 'src/fetch'

const BestsList = () => {
    const [datalist, setDatalist] = useState([{ id: 0, title: "" }]);
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [ID, setID] = useState(0)
    const [index, setIndex] = useState(0)
    const [change, setChange] = useState(1)
    const [search, setSearch] = useState('')

    let paginagtion = []
    for (let i = 1; i <= count; i++) {
        paginagtion.push(i)
    }

    const searchFunc = async () => {
        const res = await get(`/admin/category?page=${number}`)
        setDatalist(res.data.data)
        setCount(res.data.pages)
        setPage(res.data.page)
    }

    const DeleteButton = (id, index) => {
        setID(id)
        setIndex(index)
        setVisible(true)
    }

    const fetch = async (number) => {
        const res = await get(`/admin/category?page=${number}`)
        setDatalist(res.data.data)
        setCount(res.data.pages)
        setPage(res.data.page)
    }
    useEffect(() => {
        if (search == '') {
            fetch(1)
        }

    }, [change])

    const deleteFunc = async () => {
        let res = await del(`/admin/category/${ID}`, {}, {})
        setVisible(false)
        setDatalist(datalist.filter((age, i) => { return i != index }))
        setChange(change + 1)
        setID(0)
        setIndex(0)
    }

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



    return (
        <div>

            <>
                <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                        <CModalTitle>Delete</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        You have delete : {datalist[index].title}
                    </CModalBody>
                    <CModalFooter>

                        <CButton color="danger" onClick={(e) => { deleteFunc() }}>delete</CButton>
                        <CButton color="secondary" onClick={() => { setVisible(false); setID(0) }}>
                            cancel
                        </CButton>
                    </CModalFooter>
                </CModal>
            </>
            <CCol xs={12}>
                <CCard className="mb-4 mapping-list">
                    <CCardHeader style={{
                        "display": "flex",
                        "justifyContent": "space-between"
                    }}>
                        <strong>Catgeory list</strong>
                        <CButton
                            color={'primary'}
                            onClick={(e) => { window.location.href = `./#/category/create`; }}
                        >
                            Create
                        </CButton>
                    </CCardHeader>
                    <CCard>
                        <CCardBody>
                            <CForm style={{ "display": 'flex' }} onSubmit={(e) => { e.defaultPrevented() }}>
                                <CFormInput id='search' name='search' type='text' placeholder='Search'></CFormInput>
                                <CButton type='submit' >Search</CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                    <CCardBody>

                        <CTable hover striped style={{ "textAlign": 'center' }}>
                            <CTableHead color="dark">
                                <CTableRow>
                                    <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                                    <CTableHeaderCell scope="col">Options</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    datalist.map((data, index) =>

                                        <CTableRow key={index} >

                                            <CTableHeaderCell onClick={(e) => {
                                                window.location.href = `./#/category/view?id=${data.id}`;
                                            }} scope="row">{data.id}</CTableHeaderCell>


                                            <CTableDataCell onClick={(e) => {
                                                window.location.href = `./#/category/view?id=${data.id}`;
                                            }}>{data.title}</CTableDataCell>

                                            <CTableDataCell style={{
                                                "display": "flex",
                                                "justifyContent": "space-evenly"
                                            }}

                                            >
                                                <CButton
                                                    color={'danger'}
                                                    onClick={(e) => { DeleteButton(data.id, index) }}

                                                >
                                                    Delete
                                                </CButton>
                                                <CButton
                                                    color={'warning'}
                                                    onClick={(e) => {
                                                        window.location.href = `./#/category/edit?id=${data.id}`;
                                                    }}
                                                >
                                                    Edit
                                                </CButton>
                                            </CTableDataCell>

                                        </CTableRow>

                                    )
                                }

                            </CTableBody>

                        </CTable>
                        <CPagination style={{
                            "display": "flex",
                            "justifyContent": "center"
                        }}  >
                            <Back />
                            {paginagtion.map((pag, index) => <PaginagtionActive key={index} num={pag} />)}
                            <Next />
                        </CPagination>


                    </CCardBody>
                </CCard>
            </CCol >
        </div>

    )
}

export default BestsList;