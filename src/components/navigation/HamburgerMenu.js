import React, { useState } from "react"
import './css/HamburgerMenu.css'
import NavListItem from "./NavListItem"
import FullScreenPopupLayer from "./FullScreenPopupLayer"

// TODO: maybe just combine these (button and popup layer) into one component for now; this would allow for disabling the hamburger button while transitions are happening

function HamburgerMenu() {
    const [menuEnabled, setMenuEnabled] = useState(false)
    const [classState, setClassState] = useState('')

    const toggleClassState = () => {
        setClassState(
            classState === '' ? 'change' : ''
        )
    }

    const toggleMenuEnabledState = () => {
        setMenuEnabled(!menuEnabled)
    }

    const onClick = () => {
        toggleClassState()
        toggleMenuEnabledState()
    }

    if(menuEnabled === true) {
        console.log('Enabled on the top level')
    } else {
        console.log('Disabled on the top level')
    }

    return (
        <>
            <div className={'menu-button' + ' ' + classState} onClick={onClick}>
                <div className={'menu-button-line bar1'}></div>
                <div className={'menu-button-line bar2'}></div>
                <div className={'menu-button-line bar3'}></div>
            </div>
            {/*<Button onClick={props.onClick}>Burger Menu Button</Button>*/}
            <FullScreenPopupLayer isEnabled={menuEnabled}>
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