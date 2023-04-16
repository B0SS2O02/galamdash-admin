import CIcon from "@coreui/icons-react";
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { Caplitailts } from "./Util"
import { cilChevronCircleDownAlt, cilChevronCircleUpAlt } from "@coreui/icons";

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

    const SortChange = (name, setChange, change) => {
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
                if (props.del)
                    console.log(props)
                return <CButton
                    color={'danger'}
                    onClick={(e) => { DeleteButton(props.data.id, props.index, props.setID, props.setIndex, props.setVisible) }}

                >
                    Delete
                </CButton>
            }

            const Edit = (props) => {
                if (props.edit) {
                    return <CButton
                        color={'warning'}
                        onClick={(e) => {
                            window.location.href = `./#/${url}/edit?id=${props.data.id}`;
                        }}
                    >
                        Edit
                    </CButton>
                }

            }

            return <CTableDataCell style={{
                "display": "flex",
                "justifyContent": "space-evenly"
            }}>
                <Edit edit={props.edit} data={props.data}  />
                <Delete del={props.del} data={props.data} index={props.index} setID={props.setID} setIndex={props.setIndex} setVisible={props.setVisible} />
            </CTableDataCell>
        }

    }

    return <CTable hover striped style={{ "textAlign": 'center' }}>
        <CTableHead color="dark">
            <TableHeader data={datalist} sort={sort} setChange={setChange} change={change} edit={edit} del={del} />
        </CTableHead>
        <CTableBody >
            {
                datalist.map((data, index) =>
                    <CTableRow key={index} >
                        <CTableHeaderCell onClick={(e) => {
                            window.location.href = `./#/${url}/view?id=${data.id}`;
                        }} scope="row">{data.id}</CTableHeaderCell>
                        <CTableDataCell onClick={(e) => {
                            window.location.href = `./#/${url}/view?id=${data.id}`;
                        }}>{data.title}</CTableDataCell>

                        <Options edit={edit} del={del} data={data} index={index} setID={setID} setIndex={setIndex} setVisible={setVisible} />
                    </CTableRow>

                )
            }

        </CTableBody>

    </CTable>
}

export default Table