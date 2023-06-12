import React, { useEffect, useRef, useState } from 'react'
import {
    CCard,
    CCardBody,
    CCardText,
    CCardTitle,
    CCardHeader,
    CFormInput,
    CButton,
    CForm,
    CAvatar,
    CImage,

} from '@coreui/react'
import { useNavigate, useLocation } from 'react-router-dom';
import { get, put } from '../../fetch';
import { Caplitailts, Time } from './util';
import sets from './sets.json'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import setting from '../../setting.json'
import Dropdown from '../Parts/Dropdown';


const Edit = () => {
    const [data, setData] = useState({})
    const [form, setForm] = useState()
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
        if (d == 'id' || d == 'ball') {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CCardText>
                    {data[d]}
                </CCardText>
            </div>)
        } else if (d == 'ban') {
            const [ban, setBan] = useState(data[d])
            const Color = (value) => {
                if (value) {
                    return 'danger'
                } else {
                    return 'info'
                }
            }
            const Ban = async (id) => {
                setBan(!ban)
            }
            return <div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CButton color={Color(ban)}
                    onClick={() => { Ban() }}
                >{Caplitailts(d)}</CButton>
                <CFormInput hidden value={ban} name={d} />
            </div>

        } else if (d == 'img') {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CImage onClick={(e) => {
                    let file = document.getElementById(d)
                    file.click()
                }} className='post-image' src={`${setting.IP}/${data[d]}`} id={d + 'img'} />
                <CFormInput accept='image/*' onChange={(e) => {
                    let img = document.getElementById(d + 'img')
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        img.src = e.target.result
                    }
                    reader.readAsDataURL(e.target.files[0])
                }} id={d} type='file' name={d} hidden={true} />
            </div>)
        } else if (d == 'time') {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CCardText>
                    <Time time={data[d]} />
                </CCardText>
            </div>)
        } else if (d == 'content' || d == 'info') {
            const [value, setValue] = useState(data[d]);
            const modules = {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], 
                    ['clean']
                ],
            }
            const formats = [
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image'
            ]

            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <ReactQuill theme="snow"
                    value={value}
                    onChange={setValue}
                    modules={modules}
                    formats={formats} />
                <CFormInput hidden={true} name={d} value={value} />

            </div>)

        } else if (typeof (data[d]) == 'object') {
            if (d == 'Category') {
                const [id, setId] = useState(data[d].id)
                const [list, setList] = useState([])
                const [list2, setList2] = useState([])
                useEffect(() => {
                    Fetch()
                }, [])
                const Fetch = async () => {
                    await get(`/admin/${d.toLowerCase()}`).then((res) => {
                        const data = res.data.data
                        let l = [0]
                        setList2(data)
                        for (const key in data) {
                            if (data[key].id == id) {
                                l[0] = data[key].title
                            } else {
                                l.push(data[key].title)
                            }

                        }
                        setList(l)
                    })
                }
                if (list.length > 0) {
                    return <div>
                        <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                        <Dropdown list={list} func={(id) => {
                            let ID = 0
                            for (const key in list2) {
                                if (list2[key].title == id) {
                                    setId(list2[key].id)
                                    ID = list2[key].id
                                }
                            }
                            let l = [0]
                            for (const key in list2) {
                                if (list2[key].id == ID) {
                                    l[0] = list2[key].title
                                } else {
                                    l.push(list2[key].title)
                                }

                            }
                            setList(l)
                        }} />
                        <CFormInput hidden name={d.toLowerCase() + 'Id'} value={id} />
                    </div>
                }
            } else if (d == 'User') {
                return <div onClick={(e) => {
                    if (data[d].id != 1) {
                        redirect(`${sets.rout.user}/?id=${data[d].id}`)
                    }
                }}>
                    <CCardTitle >Post creator</CCardTitle>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }}>
                        <CAvatar src={`${setting.IP}/${data[d].img}`} />
                        <CCardText >
                            {Caplitailts(data[d].nick)}
                        </CCardText>

                    </div>

                </div>
            }


        } else {
            return (<div>
                <CCardTitle>{d[0].toUpperCase() + d.substring(1)}</CCardTitle>
                <CFormInput
                    type="text"
                    name={d}
                    defaultValue={data[d]}
                />
            </div>)
        }
    }

    const parse = (form) => {
        let elements = form.getElementsByTagName('input')
        let body = {}
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].name == 'img') {
                if (!!elements[i].files[0]) {
                    body[elements[i].name] = elements[i].files[0]
                }
            } else {
                if (!!elements[i].value) {
                    body[elements[i].name] = elements[i].value
                }

            }

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