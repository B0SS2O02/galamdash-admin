import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CButton

} from '@coreui/react'
import { Caplitailts, FormCreate } from './util';
import { post } from 'src/fetch';
import sets from './sets.json'
import { useNavigate } from 'react-router-dom';

const Craete = () => {
    const form = sets.createForm
    const redirect = useNavigate()
    const parse = (form) => {
        const forms_types = ['input', 'textarea']
        let inputs = []
        for (let type in forms_types) {
            inputs.push(form.getElementsByTagName(forms_types[type]))
        }
        let elements = []
        for (let i in inputs) {
            for (let j in inputs[i]) {
                if (Number.isInteger(parseInt(j))) {
                    elements.push(inputs[i][j])
                }
            }
        }
        let body = {}
        for (let i = 0; i < elements.length; i++) {
            body[elements[i].name] = elements[i].value
        }
        return body
    }
    const send = async (e) => {
        e.preventDefault()
        const body = parse(e.target)
        await post(sets.path.create, body)
        redirect(sets.rout.list)
    }
    return (
        <CCard className="mb-4" >
            <CCardHeader component="h5">{Caplitailts(sets.title)} create</CCardHeader>
            <CCardBody>
                <CForm onSubmit={send}>
                    <FormCreate form={form} />
                    <CButton style={{ "padding": "5px 10px " }} color='primary'
                        type='submit'
                    >
                        Submit
                    </CButton>

                </CForm>
            </CCardBody>
        </CCard>
    )
}

export default Craete;