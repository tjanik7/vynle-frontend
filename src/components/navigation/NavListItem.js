import React from "react"
import './css/NavListItem.css'
import { Link } from "react-router-dom"
import { string } from "prop-types"

function NavListItem({children, className, linkTo}) {
    return (
        <div className={className}>
            <li className={'nav-item'}>
                <Link className={'nav-link active popup-list-item'} to={linkTo}>{children}</Link>
            </li>
        </div>
    )
}

NavListItem.propTypes = {
    linkTo: string.isRequired,
}

export default NavListItem