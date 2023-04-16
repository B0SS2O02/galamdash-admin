import {
    CFormLabel,
    CFormInput,
    CFormTextarea
} from '@coreui/react'

const FormCreate = (props) => {
    const form = props.form
    const input = (data, index) => {
        return <div className="mb-3" key={index}>
            <CFormLabel htmlFor={`id${index}`}>{data.title || ''}</CFormLabel>
            <CFormInput
                type={data.type}
                id={data.id || `id${index}`}
                name={data.name}
                placeholder={data.placeholder}
            />
        </div>
    }
    const textarea = (data, index) => {
        return <div className="mb-3" key={index}>
            <CFormLabel htmlFor={`id${index}`}>{data.title}</CFormLabel>
            <CFormTextarea name={data.name}
                id={data.id ||  `id${index}`}
                rows={data.rows || 3}
                placeholder={data.placeholder}
            ></CFormTextarea>
        </div>
    }
    return (
        form.map((element, index) => {
            {
                if (element.type == 'textarea') {
                    return textarea(element, index)
                } else {
                    return input(element, index)
                }
            }
        })
    )

}

const Caplitailts= (word)=>{
    return word[0].toUpperCase() + word.slice(1)
}
export {
    FormCreate,
    Caplitailts
}