import React from "react"
import './css/NavListItem.css'
import { Link } from "react-router-dom"
import PropTypes, { string } from "prop-types"

function NavListItem({children, className, linkTo}) {
    return (
        <div className={className}>
            <li className={'nav-item my-1'}>
                <Link className={'active popup-list-item'} to={linkTo}>{children}</Link>
            </li>
        </div>
    )
}

NavListItem.propTypes = {
    linkTo: PropTypes.string.isRequired,
}

export default NavListItem