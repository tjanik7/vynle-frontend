import React from "react"
import './css/NavListItem.css'

function NavListItem({children, className}) {
    return (
        <div className={className}>
            <li className={'nav-item'}>
                <a className={'nav-link active popup-list-item'}>{children}</a>
            </li>
        </div>
    )
}

export default NavListItem