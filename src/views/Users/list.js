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
import { useNavigate } from 'react-router-dom'
import setting from '../../setting.json'
import Error404 from '../pages/page404/Page404'
import { Ban, Caplitailts, Type } from './utils'
import { get } from '../../fetch'

const BestsList = () => {
    const [datalist, setDatalist] = useState(null);
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(1)
    const [change, setChange] = useState(1)
    let paginagtion = []
    for (let i = 1; i <= count; i++) {
        paginagtion.push(i)
    }
    const redirect = useNavigate()
    const TableTitle = 'Users'
    const View = (url) => {
        redirect(url)
    }

    let split = { from: 'name', to: 'surname', name: 'User name', data: [] }


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

    const TableHeader = (props) => {
        return (
            props.data.map((d) => <CTableHeaderCell scope="col">{Caplitailts(d)}</CTableHeaderCell>
            )
        )
    }

    const TableBody = (props) => {
        console.log(props.data)
        return (
            Object.keys(props.data).map((key, index) => {
                console.log(key)
                if (key == 'img') {
                    return <CTableDataCell key={index} onClick={e => View(`/user/view?id=${props.data.id}`)} >
                        <CAvatar src={`${setting.IP}/${props.data[key]}`} size="xl" />
                    </CTableDataCell>
                } else if (key == 'ban') {
                    return <CTableDataCell key={index}>
                        <Ban ban={props.data[key]} id={props.data.id} />
                    </CTableDataCell>
                } else if (key == 'type') {
                    return <CTableDataCell key={index} >
                        <Type type={props.data[key]} id={props.data.id} />
                    </CTableDataCell>
                } {
                    return <CTableDataCell key={index} onClick={e => View(`/user/view?id=${props.data.id}`)} >
                        {props.data[key]}
                    </CTableDataCell>
                }
            })
        )

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
                        <strong>{TableTitle}</strong>
                    </CCardHeader>
                    <CCardBody className='mapping-list' >
                        <CTable hover striped style={{ "textAlign": 'center' }}>
                            <CTableHead color="dark">
                                <CTableRow>
                                    <TableHeader data={Object.keys(datalist[0])} />
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    datalist.map((data, index) =>
                                        <CTableRow key={index} >
                                            <TableBody data={data} />
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