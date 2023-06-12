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
                required
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
                required
                id={data.id || `id${index}`}
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