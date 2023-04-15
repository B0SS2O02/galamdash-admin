import React, { useEffect, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CForm,
    CFormLabel,
    CFormInput,
    CButton

} from '@coreui/react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import setting from '../../setting.json'
import { FormCreate } from './util';

import { element } from 'prop-types';
import { post } from 'src/fetch';


const Craete = () => {
    const form = [
        { type: 'input', title: 'Category name', name: 'title' }
    ]

    const parse = (form) => {
        const inputs = [form.getElementsByTagName('input'), form.getElementsByTagName('textarea')]
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
        await post(`/admin/category`, body)
        window.location.href = `./#/category`;
    }


    return (
        <CCard className="mb-4" >
            <CCardHeader component="h5">Years create</CCardHeader>
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