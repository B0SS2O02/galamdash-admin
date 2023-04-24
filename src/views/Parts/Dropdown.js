import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from "@coreui/react";
import { Caplitailts } from "../Users/util";

const Dropdown = (props) => {
    let list = props.list
    let func = props.func
    return <CDropdown>
        <CDropdownToggle color="secondary">{Caplitailts(list[0])}</CDropdownToggle>
        <CDropdownMenu>
            {
                list.map((l, index) => {
                    if (list.indexOf(l) != 0) {
                        return <CDropdownItem key={index} onClick={(e) => {
                            func(l)
                        }} >{Caplitailts(l)}</CDropdownItem>
                    }
                })
            }
        </CDropdownMenu>
    </CDropdown>
}

export default Dropdown;