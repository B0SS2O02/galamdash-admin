import CIcon from "@coreui/icons-react";
import { CAvatar, CButton, CCardText, CCardTitle, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { Caplitailts } from "./Util"
import { cilChevronCircleDownAlt, cilChevronCircleUpAlt } from "@coreui/icons";
import { useNavigate } from "react-router-dom";
import setting from '../../setting.json'
import { put } from "src/fetch";
import Dropdown from "./Dropdown";

const Table = (props) => {
    let datalist = props.datalist
    let sort = props.sort
    let setSort = props.setSort
    let setChange = props.setChange
    let change = props.change
    let setID = props.setID
    let ID = props.ID
    let setIndex = props.setIndex
    let setVisible = props.setVisible
    let url = props.url
    let edit = props.edit
    let del = props.del
    let path = props.path
    const redirect = useNavigate()

    const SortChange = (name, setChange, change) => {
        if (name == "Category") {
            name = name + 'Id'
        }
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
        let sort = props.sort
        if (props.data.length > 0) {
            data = Object.keys(props.data[0])
            const Icon_change = (props) => {
                if (sort[0] == props.name) {
                    if (sort[1] == "DESC") {
                        return <CIcon icon={cilChevronCircleUpAlt}></CIcon>
                    } else {
                        return <CIcon icon={cilChevronCircleDownAlt}></CIcon>
                    }
                }
            }

            const Options = (props) => {
                if (props.edit || props.del) {
                    return <CTableHeaderCell className='table-header'>Option</CTableHeaderCell>
                }
            }

            return (
                <CTableRow>{
                    data.map((d, index) => <CTableHeaderCell className='table-header' key={index} scope="col"
                        onClick={e => SortChange(d, props.setChange, props.change)}>{Caplitailts(d)}
                        <Icon_change name={d} />
                    </CTableHeaderCell>
                    )}
                    <Options edit={props.edit} del={props.del} />

                </CTableRow>

            )
        }

    }

    const DeleteButton = (id, index, setID, setIndex, setVisible) => {
        setID(id)
        setIndex(index)
        setVisible(true)
    }

    const Options = (props) => {
        if (props.edit || props.del) {
            const Delete = (props) => {
                if (props.del) {
                    return <CButton
                        color={'danger'}
                        onClick={(e) => { DeleteButton(props.data.id, props.index, props.setID, props.setIndex, props.setVisible) }}
                    >
                        Delete
                    </CButton>
                }


            }

            const Edit = (props) => {
                if (props.edit) {
                    return <CButton
                        color={'warning'}
                        onClick={(e) => {
                            redirect(`${url.edit}?id=${props.data.id}`)
                        }}
                    >
                        Edit
                    </CButton>
                }

            }

            return <CTableDataCell style={{
                // "display": "flex",
                "justifyContent": "space-evenly"
            }}>
                <Edit edit={props.edit} data={props.data} />
                <Delete del={props.del} data={props.data} index={props.index} setID={props.setID} setIndex={props.setIndex} setVisible={props.setVisible} />
            </CTableDataCell>
        }

    }

    const Content = (props) => {
        try {

            const data = props.data
            const d = props.d
            const id = props.id
            const url = props.url
            const path = props.path
            let setChange = props.setChange
            let change = props.change

            if (typeof (data[d]) == 'object') {

                if (d == 'Category') {
                    return <CTableDataCell onClick={(e) => {
                        redirect(`${url.view}?id=${id}`)
                    }}>
                        {data[d].title}
                    </CTableDataCell>
                }
                if (d == 'User') {
                    return <CTableDataCell><div onClick={(e) => {
                        if (data[d].id != 1) {
                            console.log(`${url.user}/?id=${data[d].id}`)
                            redirect(`${url.user}/?id=${data[d].id}`)
                        }
                    }}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                        }}
                    >

                        <CAvatar src={`${setting.IP}/${data[d].img}`} />
                        <CCardText >
                            {Caplitailts(data[d].nick)}
                        </CCardText>

                    </div>
                    </CTableDataCell >
                }

            } else if (d == 'img') {
                return <CTableDataCell onClick={(e) => {
                    redirect(`${url.view}?id=${id}`)
                }}>
                    <CAvatar src={`${setting.IP}/${data[d]}`} />

                </CTableDataCell>
            } else if (d == 'ban') {
                const Color = (value) => {
                    if (value) {
                        return 'danger'
                    } else {
                        return 'info'
                    }
                }
                const Ban = async (id) => {
                    await put(`${path.ban}/${id}`)
                    setChange(change + 1)
                }
                return <CTableDataCell>
                    <CButton color={Color(data[d])}
                        onClick={() => { Ban(id) }}
                    >{Caplitailts(d)}</CButton>
                </CTableDataCell>
            } else if (d == 'Utype') {
                let l = ['ulanyjy', 'yazyjy', 'redaktor']
                let list = [l[data[d]]]
                for (let i in l) {
                    if (data[d] != i) {
                        list.push(l[i])
                    }
                }
                const edit = async (value) => {
                    const l = ['ulanyjy', 'yazyjy', 'redaktor']
                    await put(`${path.type}/${id}`, { type: l.indexOf(value) })
                    setChange(change + 1)
                }
                return <CTableDataCell>
                    <Dropdown list={list} func={edit} />
                </CTableDataCell>
            } else {
                return <CTableDataCell onClick={(e) => {
                    redirect(`${url.view}?id=${id}`)
                }}>
                    {data[d]}
                </CTableDataCell>
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    const TableBody = (props) => {
        let datalist = props.datalist
        let url = props.url
        let path = props.path
        let setChange = props.setChange
        let change = props.change


        if (datalist.length == 0) {
            return <div>
                Empty
            </div>
        } else {
            return < CTableBody >
                {datalist.map((data, index) => {
                    {
                        if (data.Utype != 3) {
                            return <CTableRow key={index} >
                                {
                                    Object.keys(data).map((d, index2) => {
                                        return <Content url={url} key={index2} data={data} d={d} id={data.id} path={path} change={change} setChange={setChange} />
                                    })
                                }
                                <Options edit={edit} del={del} data={data} index={index} setID={setID} setIndex={setIndex} setVisible={setVisible} />
                            </CTableRow>
                        }
                    }
                }
                )}
            </CTableBody >
        }
    }

    return <CTable hover striped style={{ "textAlign": 'center' }}>
        <CTableHead color="dark">
            <TableHeader data={datalist} sort={sort} setChange={setChange} change={change} edit={edit} del={del} />
        </CTableHead>
        <TableBody datalist={datalist} url={url} path={path} change={change} setChange={setChange} />



    </CTable>
}

export default Table