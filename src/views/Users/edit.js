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
import { useNavigate, useLocation } from 'react-router-dom';
import { get, put } from 'src/fetch';
import { Caplitailts, Time } from './util';
import sets from './sets.json'


const Edit = () => {
    const [data, setData] = useState({})
    let { search } = useLocation();
    const redirect = useNavigate()
    const query = new URLSearchParams(search);
    const id = query.get('id')
    useEffect(() => {
        fetch()
    }, [])

    const fetch = async () => {
        let res = await get(`${sets.path.view}${id}`)
        setData(res.data)
    }

    const Content = (props) => {
        const d = props.d
        if (d == 'id') {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CCardText>
                    {data[d]}
                </CCardText>
            </div>)
        } else if (d == 'time') {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CCardText>
                    <Time time={data[d]} />
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
        let res = await put(`${sets.path.edit}${id}`, body)
        redirect(sets.rout.list)

    }

    return (
        <CCard className="mb-4" >
            <CCardHeader component="h5">{Caplitailts(sets.title)} edit</CCardHeader>
            <CCardBody>
                <CForm onSubmit={(e) => update(e)}>
                    {
                        Object.keys(data).map((d, index) =>
                            <div key={index}>
                                <Content d={d} />
                            </div>
                        )
                    }
                    <CButton
                        color='primary'
                        type='submit'
                    >
                        Save
                    </CButton>
                </CForm>

            </CCardBody>
        </CCard>
    )
}

export default Edit;