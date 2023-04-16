import { cilX } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CButton, CCardBody, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput } from "@coreui/react";
import { Caplitailts } from "./Util";
import { get } from "src/fetch";


const Search = (props) => {
    const filter = props.filter
    const Setfilter = props.Setfilter
    const search = props.search
    const setSearch = props.setSearch
    const setDatalist = props.setDatalist
    const setCount = props.setCount
    const setPage = props.setPage
    const setVisible2 = props.setVisible2
    const setAlert = props.setAlert
    const setChange= props.setChange
    const change=props.change
    const path=props.path


    const ClearButtonHidden = () => {
        if (search == '') {
            return true
        } else {
            return false
        }
    }
    const Filter = (name) => {
        let list = [name]
        for (let i = 0; i < filter.length; i++) {
            if (filter[i] != name) {
                list.push(filter[i])
            }
        }
        Setfilter(list)
    }
    const ClearSearch = (e) => {
        setSearch('')
        setPage(1)
        setCount(1)
        setChange(change + 1)
        setVisible2(false)
    }
    const Dropdown = (props) => {
        if (props.list.length > 0) {
            return (
                <CDropdown>
                    <CDropdownToggle color="secondary">{Caplitailts(props.list[0])}</CDropdownToggle>
                    <CDropdownMenu>
                        {
                            props.list.map((l, index) => {
                                {
                                    if (index > 0) {
                                        return <CDropdownItem key={index} onClick={(e) => Filter(l)}>{Caplitailts(l)}</CDropdownItem>
                                    }
                                }
                            })
                        }
                    </CDropdownMenu>
                </CDropdown>
            )
        }
    }
    const SearchFunc = async (e) => {
        e.preventDefault();
        const res = await get(`${path}search?word=${search}&filter=${filter[0]}`)
        if (!!res) {
            setDatalist(res.data.data)
            setCount(res.data.pages)
            setPage(res.data.page)
            if (res.data.data.length == 0) {
                setVisible2(true)
                setAlert(`${Caplitailts(filter[0])} "${search}" not define`)
            }
        } else {
            if (res.data.data.length == 0) {
                setVisible2(true) 
                setAlert(`${Caplitailts(filter[0])} "${search}" not define`)
            }
        }

    }

    return <CCardBody>
        <CForm style={{ "display": 'flex' }} className='search-form' onSubmit={SearchFunc}>
            <Dropdown list={filter} />
            <div className='search-input'>
                <CFormInput id='search' name='search' type='text' placeholder='Search' value={search}
                    onChange={(e) => { setSearch(e.target.value) }}></CFormInput>
                <CIcon onClick={ClearSearch} hidden={ClearButtonHidden()} className='search-x' icon={cilX} size='xl' ></CIcon>
            </div>
            <CButton type='submit' >Search</CButton>
        </CForm>
    </CCardBody>

}
export default Search;