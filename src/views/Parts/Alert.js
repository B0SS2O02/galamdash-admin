import { CToast, CToastBody, CToastClose } from "@coreui/react"

const Alert = (props) => {
    const visible2 = props.visible2
    const setVisible2 = props.setVisible2
    const alert=props.alert
    return <CToast className="alert-message" autohide={false} visible={visible2}>
            <div className="d-flex">
                <CToastBody>{alert}</CToastBody>
                <CToastClose className="me-2 m-auto" onClick={(e) => { setVisible2(false) }} />
            </div>
        </CToast>
    
}

export default Alert