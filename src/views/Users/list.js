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
    CAvatar,
    CForm,
    CFormInput,
    CDropdown,
    CDropdownMenu,
    CDropdownItem,
    CDropdownToggle,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import setting from '../../setting.json'
import Error404 from '../pages/page404/Page404'
import { Ban, Caplitailts, Type } from './utils'
import { get } from '../../fetch'
import CIcon from '@coreui/icons-react'
import { cilChevronCircleDownAlt, cilChevronCircleUpAlt, cilX } from '@coreui/icons'

const UserList = () => {
    const [datalist, setDatalist] = useState(null);
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(1)
    const [change, setChange] = useState(1)
    const [search, setSearch] = useState('')
    const [filter, Setfilter] = useState(['nick', "name", 'surname', 'id'])
    const [sort, setSort] = useState(['id', 'ASC'])
    let paginagtion = []
    for (let i = 1; i <= count; i++) {
        paginagtion.push(i)
    }
    const redirect = useNavigate()
    const TableTitle = 'Users'

    const View = (url) => {
        redirect(url)
    }

    const fetch = async (number) => {
        if (search == '') {
            const res = await get(`/admin/user/all?page=${number}&sort=${sort[0]},${sort[1]}`)
            if (!!res) {
                setDatalist(res.data.data)
                setCount(res.data.pages)
                setPage(res.data.page)

            }
        } else {
            const res = await get(`/admin/user/search?word=${search}&page=${number}&filter=${filter[0]}&sort=${sort[0]},${sort[1]}`)
            if (!!res) {
                setDatalist(res.data.data)
                setCount(res.data.pages)
                setPage(res.data.page)

            }
        }


    }
    useEffect(() => {
        fetch(1)
    }, [change])


    const SearchFunc = async (e) => {
        e.preventDefault();
        const res = await get(`/admin/user/search?word=${search}&filter=${filter[0]}&sort=${sort[0]},${sort[1]}`)
        if (!!res) {
            setDatalist(res.data.data)
            setCount(res.data.pages)
            setPage(res.data.page)
        }
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

    const SortChange = (name) => {
        if (name == sort[0]) {
            if (sort[1] == 'ASC') {
                setSort([name, 'DESC'])
            } else {
                setSort([name, 'ASC'])
            }

        } else {
            setSort([name, 'ASC'])
        }
        setChange(change + 1)
    }

    const TableHeader = (props) => {
        let data = []
        if (props.data.length > 0) {
            data = Object.keys(props.data[0])
        }
        const Icon_change = (props) => {
            if (sort[0] == props.name) {
                if (sort[1] == "DESC") {
                    return <CIcon icon={cilChevronCircleUpAlt}></CIcon>
                } else {
                    return <CIcon icon={cilChevronCircleDownAlt}></CIcon>
                }
            }
        }
        return (
            data.map((d, index) => <CTableHeaderCell key={index} scope="col" onClick={e => SortChange(d)}>{Caplitailts(d)}
                <Icon_change name={d} />
            </CTableHeaderCell>
            )
        )
    }

    const TableBody = (props) => {
        return (
            Object.keys(props.data).map((key, index) => {
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
                    <CCardBody className='mapping-list' >
                        <CTable hover striped style={{ "textAlign": 'center' }}>
                            <CTableHead color="dark">
                                <CTableRow>
                                    <TableHeader data={datalist} />
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    datalist.map((data, index) =>
                                        <CTableRow key={'b' + index} >
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
        </div >

    )
}

export default UserList;