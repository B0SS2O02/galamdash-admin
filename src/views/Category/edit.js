import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardText,
    CCardTitle,
    CCardHeader,
    CFormInput,
    CButton,
    CForm

} from '@coreui/react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import setting from '../../setting.json'

const YearView = () => {
    const [data, setData] = useState({})
    let { search } = useLocation();

    const query = new URLSearchParams(search);
    const id = query.get('id')
    useEffect(() => {

        fetch()

    }, [])

    const fetch = async () => {

        let res = await axios.get(`${setting.serverIP}/admin/majors/${id}`)
        setData(res.data)
    }

    const Idskip = (props) => {
        const d = props.d
        if (d == 'id') {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CCardText>
                    {data[d]}
                </CCardText>
            </div>)
        } else {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CFormInput
                    type="text"
                    name='title'
                    defaultValue={data[d]}
                />
            </div>)
        }
    }

    const parse = (form) => {
        const elements = form.getElementsByTagName('input')
        let body = {}
        for (let i = 0; i < elements.length; i++) {
            body[elements[i].name] = elements[i].value

        }
        return body
    }



    const update = async (e) => {
        e.preventDefault()
        const body = parse(e.target)
        let res = await axios.put(`${setting.serverIP}/admin/majors/${id}`, body)
        window.location.href = `./#/majors/list`;
    }

    return (
        <CCard className="mb-4" >
            <CCardHeader component="h5">Years view</CCardHeader>
            <CCardBody>
                <CForm onSubmit={(e) => update(e)}>
                    {
                        Object.keys(data).map((d, index) =>
                            <div key={index}>
                                <Idskip d={d} />
                            </div>
                        )
                    }
                    <CButton color='primary'
                        type='submit'
                    >
                        Save
                    </CButton>
                </CForm>

            </CCardBody>
        </CCard>
    )
}

export default YearView;