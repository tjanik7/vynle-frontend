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
                <NavListItem linkTo={'/'} uniqueKeyString={'home'}>Home</NavListItem>
                <NavListItem isEnabled={username && props.isSpotifyAuthenticated} linkTo={`/profile/${username}`} uniqueKeyString={'profile'}>Profile</NavListItem>
                <NavListItem linkTo={'/settings'} uniqueKeyString={'settings'}>Settings</NavListItem>
            </FullScreenPopupLayer>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
})

export default connect(mapStateToProps)(HamburgerMenu)