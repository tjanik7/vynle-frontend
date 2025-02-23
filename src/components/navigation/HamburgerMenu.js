import React from "react"
import './css/HamburgerMenu.css'
import NavListItem from "./NavListItem"
import FullScreenPopupLayer from "./FullScreenPopupLayer"

// TODO: maybe just combine these (button and popup layer) into one component for now; this would allow for disabling the hamburger button while transitions are happening

function HamburgerMenu() {
    return (
        <>
            <FullScreenPopupLayer>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/'}>Your feed</NavListItem>
            </FullScreenPopupLayer>
        </>
    )
}

export default HamburgerMenu