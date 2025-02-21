import React, { useState } from "react"
import PropTypes from "prop-types"
import './css/HamburgerMenu.css'

function HamburgerMenu(props) {
    const [classState, setClassState] = useState('')

    const toggleState = () => {
        setClassState(
            classState === '' ? 'change' : ''
        )
    }

    const onClick = () => {
        toggleState()
    }

    return (
        <div>
            {/*<Button onClick={props.onClick}>Burger Menu Button</Button>*/}
            <div className={'menu-button' + ' ' + classState} onClick={onClick} >
                <div className={'menu-button-line bar1'}></div>
                <div className={'menu-button-line bar2'}></div>
                <div className={'menu-button-line bar3'}></div>
            </div>
        </div>
    )
}

HamburgerMenu.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default HamburgerMenu