import React from "react"
import './css/HamburgerMenu.css'
import NavListItem from "./NavListItem"
import FullScreenPopupLayer from "./FullScreenPopupLayer"
import { connect } from "react-redux"

function HamburgerMenu(props) {
    const user = props.user
    const username = user?.username

    return (
        <>
            <FullScreenPopupLayer>
                <NavListItem linkTo={'/'}>Home</NavListItem>
                {username ? <NavListItem linkTo={`/profile/${username}`}>Profile</NavListItem> : null}
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
            </FullScreenPopupLayer>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps)(HamburgerMenu)