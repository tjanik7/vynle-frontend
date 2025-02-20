import React from "react"
import './css/NavListItem.css'

function NavListItem({children}) {
    return (
        <>
            <li className={'nav-item'}>
                <a className={'nav-link active popup-list-item'}>{children}</a>
            </li>
        </>
    )
}

export default NavListItem