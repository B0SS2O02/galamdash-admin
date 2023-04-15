import {
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CButton
} from "@coreui/react"
import axios from "axios"
import setting from '../../setting.json'
import { put } from "src/fetch"


const TypeFunc = async (id, type) => {
    await put(`/admin/user/type/${id}`, { type: type })
    document.location.reload()
}

const Type = (props) => {
    let types = { 0: "User", 1: "Yazyjy", 2: "Redaktor", 3: 'Admin' }
    return < CDropdown >
        <CDropdownToggle color="secondary">{types[props.type]}</CDropdownToggle>
        <CDropdownMenu>
            {Object.keys(types).map((type, index) => {
                return <CDropdownItem onClick={(e) => {
                    TypeFunc(props.id, type)
                }} key={index}>{types[type]}</CDropdownItem>
            })}
        </CDropdownMenu>
    </CDropdown >
}

const BanFfunc = async (id) => {
    await put(`/admin/user/ban/${id}`)
    document.location.reload()
}

const Caplitailts= (word)=>{
    return word[0].toUpperCase() + word.slice(1)
}


const Ban = (props) => {
    if (props.ban) {
        return <CButton
            onClick={(e) => {
                BanFfunc(props.id)
            }}
            color='danger'
        >
            Ban
        </CButton>
    } else {
        return <CButton
            onClick={(e) => {
                BanFfunc(props.id)
            }}
            color='success'
        >
            Ban
        </CButton>
    }
}

export {
    Type,
    Ban,
    Caplitailts
}
