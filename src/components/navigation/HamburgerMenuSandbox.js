import React, { useState } from "react"
import HamburgerMenu from "./HamburgerMenu"
import FullScreenPopupLayer from "./FullScreenPopupLayer"
import NavListItem from "./NavListItem"

function HamburgerMenuSandbox() {
    const [menuEnabled, setMenuEnabled] = useState(false)

    return (
        <>
            <HamburgerMenu onClick={() => {setMenuEnabled(true)}}/>
            <FullScreenPopupLayer isEnabled={menuEnabled}
                                  disable={() => {setMenuEnabled(false)}}>
                <NavListItem linkTo={'/settings'}>Settings</NavListItem>
                <NavListItem linkTo={'/'}>Your feed</NavListItem>
            </FullScreenPopupLayer>
        </>
    )
}

export default HamburgerMenuSandbox