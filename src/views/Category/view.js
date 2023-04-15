import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardSubtitle,
    CCardText,
    CCardTitle,
    CCardHeader,
    CAvatar,
    CTable,
    CTableBody,
    CTableRow,
    CTableDataCell

} from '@coreui/react'
import { useLocation } from 'react-router-dom';
import { get } from 'src/fetch';


const YearView = () => {
    const [data, setData] = useState({})
    let { search } = useLocation();

    const query = new URLSearchParams(search);
    const id = query.get('id');

    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        let res = await get(`/admin/category/${id}`)
        setData(res.data)
    }
    const Time = (props) => {
        let t = new Date(props.time)
        const zero = (number) => {
            if (number.toString().length < 2) {
                return '0' + number.toString()
            } else {
                return number.toString()
            }
        }
        return (`${zero(t.getHours())}:${zero(t.getMinutes())}:${zero(t.getSeconds())} ${zero(t.getDay())}.${zero(t.getMonth())}.${t.getFullYear()}`)
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
        <CCard className="mb-4" >
            <CCardHeader component="h5">Years view</CCardHeader>
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
    )
}

export default YearView;