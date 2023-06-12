import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { del } from "../../fetch";

const Delete = (props) => {
    const visible = props.visible
    const setVisible = props.setVisible
    const path = props.path
    const ID = props.ID
    const title = props.title
    const url=props.url

    const redirect = useNavigate()

    const deleteFunc = async () => {
        let res = await del(`${path}${ID}`,  {})
        redirect(url)
    }

    return <div>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
                <CModalTitle>Delete</CModalTitle>
            </CModalHeader>
            <CModalBody>
                You have delete : {title}
            </CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={(e) => { deleteFunc() }}>delete</CButton>
                <CButton color="secondary" onClick={() => { setVisible(false) }}>
                    cancel
                </CButton>
            </CModalFooter>
        </CModal>
    </div>
}

export default Delete