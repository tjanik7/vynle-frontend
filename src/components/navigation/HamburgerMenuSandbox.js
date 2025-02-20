import React, { useState } from "react"
import HamburgerMenu from "./HamburgerMenu"
import FullScreenPopupLayer from "./FullScreenPopupLayer"

function HamburgerMenuSandbox() {
    const [menuEnabled, setMenuEnabled] = useState(false)

    return (
        <>
            <FullScreenPopupLayer isEnabled={menuEnabled}
                                  disable={() => {setMenuEnabled(false)}}/>
            <HamburgerMenu onClick={() => {setMenuEnabled(true)}}/>
        </>
    )
}

export default HamburgerMenuSandbox