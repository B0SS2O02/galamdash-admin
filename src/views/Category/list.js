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
    CFormInput,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
} from '@coreui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import setting from '../../setting.json'
import { del, get } from 'src/fetch'
import CIcon from '@coreui/icons-react'
import { cilX } from '@coreui/icons'
import { Caplitailts } from './util'

const BestsList = () => {
    const [datalist, setDatalist] = useState([{ id: 0, title: "" }]);
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [ID, setID] = useState(0)
    const [index, setIndex] = useState(0)
    const [change, setChange] = useState(1)
    const [search, setSearch] = useState('')
    const [filter, Setfilter] = useState(['title', 'id'])

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
        if (page == count || count > 1) {
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

    const SearchFunc = async (e) => {
        e.preventDefault();
        const res = await get(`/admin/user/search?word=${search}&filter=${filter[0]}`)
        if (!!res) {
            setDatalist(res.data.data)
            setCount(res.data.pages)
            setPage(res.data.page)
        }
    }

    const Dropdown = (props) => {
        if (props.list.length > 0) {
            return (
                <CDropdown>
                    <CDropdownToggle color="secondary">{Caplitailts(props.list[0])}</CDropdownToggle>
                    <CDropdownMenu>
                        {
                            props.list.map((l, index) => {
                                {
                                    if (index > 0) {
                                        return <CDropdownItem key={index} onClick={(e) => Filter(l)}>{Caplitailts(l)}</CDropdownItem>
                                    }
                                }
                            })
                        }
                    </CDropdownMenu>
                </CDropdown>
            )
        }
    }
    const ClearButtonHidden = () => {
        if (search == '') {
            return true
        } else {
            return false
        }
    }

    const ClearSearch = (e) => {
        setSearch('')
        setPage(1)
        setCount(1)
        setChange(change + 1)
    }

    const Filter = (name) => {
        let list = [name]
        for (let i = 0; i < filter.length; i++) {
            if (filter[i] != name) {
                list.push(filter[i])
            }
        }
        Setfilter(list)
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
                            <CForm style={{ "display": 'flex' }} className='search-form' onSubmit={SearchFunc}>
                                <Dropdown list={filter} />
                                <div className='search-input'>
                                    <CFormInput id='search' name='search' type='text' placeholder='Search' value={search}
                                        onChange={(e) => { setSearch(e.target.value) }}></CFormInput>
                                    <CIcon onClick={ClearSearch} hidden={ClearButtonHidden()} className='search-x' icon={cilX} size='xl' ></CIcon>
                                </div>

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