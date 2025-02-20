import React from "react"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"

function HamburgerMenu(props) {
    return (
        <>
            <Button onClick={props.onClick}>Burger</Button>
        </>
    )
}

HamburgerMenu.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default HamburgerMenu