import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardText,
    CCardTitle,
    CCardHeader,
    CAvatar,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell,
    CButton

} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom';
import { get } from '../../fetch';
import { Caplitailts, Time } from './util';
import Delete from '../Parts/DeleteView';
import sets from './sets.json'
import setting from '../../setting.json'

const CategoryView = () => {
    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false)
    let { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get('id');
    const redirect = useNavigate()

    useEffect(() => {
        fetch()
    }, [])

    const edit = sets.edit
    const del = sets.delete

    const fetch = async () => {
        let res = await get(`${sets.path.view}${id}`)
        setData(res.data)
    }




    const Options = (props) => {
        if (props.edit || props.del) {
            const Delete = (props) => {
                if (props.del)
                    return <CButton
                        color={'danger'}
                        onClick={(e) => { setVisible(true) }}
                    >
                        Delete
                    </CButton>
            }

            const Edit = (props) => {
                if (props.edit) {
                    return <CButton
                        color={'warning'}
                        onClick={(e) => {
                            redirect(`${sets.rout.edit}?id=${props.id}`)
                        }}
                    >
                        Edit
                    </CButton>
                }

            }

            return <div style={{
                "display": "flex",
                "justifyContent": "space-evenly"
            }}>
                <Edit edit={props.edit} id={props.id} />
                <Delete del={props.del} id={props.id} />
            </div>
        }

    }

    const Content = (props) => {
        let { content } = props
        if (content == 'img') {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Image</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <CAvatar src={`${setting.IP}/${data[content]}`} size="xl" />
                </CTableDataCell>
            </CTableRow>
            )
        } else if (content == 'ban') {
            const Ban = (props) => {
                const ban = props.ban
                const id = props.id
                const path = props.path
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
                return <CButton color={Color(ban)}
                            onClick={() => { Ban(id) }}
                        >{Caplitailts('ban')}</CButton>
                   
            }

            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Ban</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <Ban ban={data[content]} id={data.id} />
                </CTableDataCell>
            </CTableRow>
            )
        } else if (content == 'type') {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Type</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <Type type={data[content]} id={data.id} />
                </CTableDataCell>
            </CTableRow>
            )
        } else if (content == 'time') {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>Time</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <Time time={data[content]} />
                </CTableDataCell>
            </CTableRow>
            )
        } else {
            return (<CTableRow color="light">
                <CTableDataCell>
                    <CCardTitle>{content[0].toUpperCase() + content.substring(1)}</CCardTitle>
                </CTableDataCell>
                <CTableDataCell>
                    <CCardText>
                        {data[content]}
                    </CCardText>
                </CTableDataCell>
            </CTableRow>
            )
        }

    }
    return (
        <div>
            <Delete
                visible={visible}
                setVisible={setVisible}
                path={sets.path.delete}
                url={sets.rout.list}
                ID={id}
                title={data.title}
            />
            <CCard className="mb-4" >
                <CCardHeader className='card-header' component="h5">{Caplitailts(sets.title)} view
                    <Options edit={edit} del={del} id={id} />
                </CCardHeader>
                <CCardBody >
                    <CTable>
                        <CTableBody>
                            {
                                Object.keys(data).map((d, index) =>
                                    <Content key={index} content={d} />
                                )
                            }
                        </CTableBody>
                    </CTable>
                </CCardBody>
            </CCard >
        </div>

    )
}

export default CategoryView;