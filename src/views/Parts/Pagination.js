import { CPagination, CPaginationItem } from "@coreui/react"
import { useEffect, useState } from "react"



const Pagination = (props) => {
    let count = props.count
    let page = props.page
    let fetch = props.fetch
    let paginagtion = []
    for (let i = 1; i <= count; i++) {
        paginagtion.push(i)
    }

    const PaginagtionActive = (props) => {
        if (props.num == page) {
            return <CPaginationItem onClick={(e) => { console.log(e.target.innerText) }} active >{props.num}</CPaginationItem>
        } else {
            return <CPaginationItem onClick={(e) => { console.log('Number'); fetch(e.target.innerText) }} >{props.num}</CPaginationItem>
        }
    }
    const Next = () => {
        if (page == count || count > 1) {
            return <CPaginationItem id='next' aria-label="Next" disabled>
                <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
        } else {
            return <CPaginationItem id='next' aria-label="Next" onClick={(e) => { console.log('Next'); fetch(page + 1) }}>
                <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
        }
    }
    const Back = () => {
        if (page == 1) {
            return <CPaginationItem id='next' aria-label="Next" disabled>
                <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
        } else {
            return <CPaginationItem id='next' aria-label="Next" onClick={(e) => { console.log('Back'); fetch(page - 1) }}>
                <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
        }
    }


    return <CPagination style={{
        "display": "flex",
        "justifyContent": "center"
    }}  >
        <Back page={page} fetch={fetch} />
        {paginagtion.map((pag, index) => <PaginagtionActive page={page} key={index} num={pag} fetch={fetch} />)}
        <Next page={page} count={count} fetch={fetch} />
    </CPagination>
}

export default Pagination