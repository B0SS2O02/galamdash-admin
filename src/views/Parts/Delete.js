import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { del } from "src/fetch";

const Delete = (props) => {
    const visible = props.visible
    const datalist = props.datalist
    const setVisible = props.setVisible
    const setDatalist = props.setDatalist
    const path = props.path
    const index = props.index
    const ID = props.ID
    const setChange = props.setChange
    const change = props.change
    const setID = props.setID
    const setIndex = props.setIndex

    const deleteFunc = async () => {
        let res = await del(`${path}${ID}`, {}, {})
        setVisible(false)
        setDatalist(datalist.filter((age, i) => { return i != index }))
        setChange(change + 1)
        setID(0)
        setIndex(0)
    }

    const DeletedName = () => {
        if (datalist.length > 0) {
            return datalist[index].title
        }
    }

    return <div>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
                <CModalTitle>Delete</CModalTitle>
            </CModalHeader>
            <CModalBody>
                You have delete : {DeletedName()}
            </CModalBody>
            <CModalFooter>
                <CButton color="danger" onClick={(e) => { deleteFunc() }}>delete</CButton>
                <CButton color="secondary" onClick={() => { setVisible(false); setID(0) }}>
                    cancel
                </CButton>
            </CModalFooter>
        </CModal>
    </div>
}

export default Delete