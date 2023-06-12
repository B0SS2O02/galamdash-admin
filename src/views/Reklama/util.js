import {
    CFormLabel,
    CFormInput,
    CFormTextarea,
    CImage,
    CFormSelect

} from '@coreui/react'
import setting from '../../setting.json'
import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { get } from '../../fetch'

const FormCreate = (props) => {
    const form = props.form
    const input = (data, index) => {
        return <div className="mb-3" key={index}>
            <CFormLabel htmlFor={`id${index}`}>{data.title || ''}</CFormLabel>
            <CFormInput
                required
                type={data.type}
                id={data.id || `id${index}`}
                name={data.name}
                placeholder={data.placeholder}
            />
        </div>
    }
    const textarea = (data, index) => {

        const [value, setValue] = useState('');
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

        return (<div className="mb-3" key={index}>
            <CFormLabel htmlFor={`id${index}`}>{data.title}</CFormLabel>
            <ReactQuill theme="snow"
                required
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats} />
            <CFormInput hidden={true} id={data.id || `id${index}`} name={data.name} value={value} />

        </div>)
    }
    const file = (data, index) => {
        if (data.name == 'img' || data.name == 'image') {
            return <div className="mb-3" style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "baseline"
            }} key={index}>
                <CFormLabel htmlFor={`id${index}`}>{data.title}</CFormLabel>
                <CImage onClick={(e) => {
                    let file = document.getElementById(`id${index}`)
                    file.click()
                }} className='post-image' src={`${setting.IP}/public/images/default_avatar.jpg`} id={`id${index}img`} />
                <CFormInput accept='image/*' onChange={(e) => {
                    let img = document.getElementById(`id${index}img`)
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        img.src = e.target.result
                    }
                    reader.readAsDataURL(e.target.files[0])
                }} id={`id${index}`} type='file' name={data.name} hidden={true} />
            </div>
        } else {
            return <div className="mb-3" key={index}>
                <CFormLabel htmlFor={`id${index}`}>{data.title || ''}</CFormLabel>
                <CFormInput
                    required
                    type={data.type}
                    id={data.id || `id${index}`}
                    name={data.name}
                    placeholder={data.placeholder}
                />
            </div>
        }
    }

    const select = (data, index) => {
        console.log(data.get)
        const [list, setList] = useState([])

        const GetList = async () => {
            let result = await get(data.get)
            setList(result.data)
        }

        useEffect(() => {
            GetList()
        }, [])

        return <div className="mb-3" key={index}>
            <CFormLabel htmlFor={`id${index}`}>{data.title || ''}</CFormLabel>
            <CFormSelect name={data.name} id={`id${index}`} aria-label="Default select example">
                {list.map((l, index2) => <option key={index2} value={l.id}>{l.title}</option>
                )}
            </CFormSelect>
        </div>
    }

    return (
        form.map((element, index) => {
            {
                if (element.type == 'textarea') {
                    return textarea(element, index)
                } else if (element.type == 'file') {
                    return file(element, index)
                } else if (element.type == 'select') {
                    return select(element, index)
                } else {
                    return input(element, index)
                }
            }
        })
    )

}

const Caplitailts = (word) => {
    return word[0].toUpperCase() + word.slice(1)
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
export {
    FormCreate,
    Caplitailts,
    Time
}