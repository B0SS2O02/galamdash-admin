import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton
} from '@coreui/react'
import { del, get } from 'src/fetch'
import { Caplitailts } from './util'
import Pagination from '../Parts/Pagination'
import Table from '../Parts/Table'
import Search from '../Parts/Search'
import Alert from '../Parts/Alert'
import Delete from '../Parts/DeleteList'
import sets from './sets'
import { useNavigate } from 'react-router-dom'

const CategoryList = () => {
    const [datalist, setDatalist] = useState([{ id: 0, title: "" }]);
    const [count, setCount] = useState(1)
    const [page, setPage] = useState(1)
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [ID, setID] = useState(0)
    const [index, setIndex] = useState(0)
    const [change, setChange] = useState(1)
    const [search, setSearch] = useState('')
    const [filter, Setfilter] = useState(['title', 'id'])
    const [sort, setSort] = useState(['id', 'ASC'])
    const [alert, setAlert] = useState('')

    let paginagtion = []
    for (let i = 1; i <= count; i++) {
        paginagtion.push(i)
    }
    const redirect = useNavigate()


    const fetch = async (number) => {
        if (search == '') {
            const res = await get(`${sets.path.list}?page=${number}&sort=${sort[0]},${sort[1]}`)
            if (!!res) {
                setDatalist(res.data.data)
                setCount(res.data.pages)
                setPage(res.data.page)

            }
        } else {
            const res = await get(`${sets.path.search}?word=${search}&page=${number}&filter=${filter[0]}&sort=${sort[0]},${sort[1]}`)
            if (!!res) {
                setDatalist(res.data.data)
                setCount(res.data.pages)
                setPage(res.data.page)

            } else {
                if (res.data.data.length == 0) {
                    setVisible2(`${Caplitailts(filter[0])} "${search}" not define`)
                }
            }

        }
    }
    useEffect(() => {
        if (search == '') {
            fetch(1)
        }
    }, [change])





    if (!datalist) {
        return (
            <Error404 />
        )
    }
    return (
        <div>
            <Delete visible={visible}
                datalist={datalist}
                setVisible={setVisible}
                setDatalist={setDatalist}
                path={sets.path.delete}
                index={index}
                ID={ID}
                setChange={setChange}
                change={change}
                setID={setID}
                setIndex={setIndex}
            />
            <CCol xs={12}>
                <CCard className="mb-4 mapping-list">
                    <CCardHeader style={{
                        "display": "flex",
                        "justifyContent": "space-between"
                    }}>
                        <strong>{Caplitailts(sets.title)} list</strong>
                        <CButton
                            color={'primary'}
                            onClick={(e) => { redirect(`${sets.rout.create}`) }}
                        >
                            Create
                        </CButton>
                    </CCardHeader>
                    <CCard>
                        <Search
                            filter={filter}
                            Setfilter={Setfilter}
                            search={search}
                            setSearch={setSearch}
                            setDatalist={setDatalist}
                            setCount={setCount}
                            setPage={setPage}
                            setVisible2={setVisible2}
                            setAlert={setAlert}
                            setChange={setChange}
                            change={change}
                            path={sets.path}
                        />
                    </CCard>
                    <CCardBody>
                        <div className='table-container'>
                            <Table datalist={datalist}
                                sort={sort} setSort={setSort}
                                setChange={setChange}
                                change={change}
                                setID={setID}
                                ID={ID}
                                setIndex={setIndex}
                                setVisible={setVisible}
                                url={sets.rout}
                                edit={sets.edit}
                                del={sets.delete}
                            />
                        </div>

                        <Pagination count={count} page={page} fetch={fetch} />
                    </CCardBody>
                </CCard>
            </CCol >
            <Alert
                setVisible2={setVisible2}
                visible2={visible2}
                alert={alert} />

        </div>

    )
}

export default CategoryList;