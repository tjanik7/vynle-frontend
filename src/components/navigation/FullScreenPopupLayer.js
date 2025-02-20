import React, { useEffect, useState } from "react"
import './css/FullScreenPopupLayer.css'
import NavListItem from "./NavListItem"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"

function FullScreenPopupLayer(props) {
    const [className, setClassName] = useState('')
    const [linkClassName, setLinkClassName] = useState('')

    // Resets classname to deactivated state and sets shouldTearDown -> true
    const tearDown = () => {
        setClassName('')
        setLinkClassName('')
        setTimeout(() => {
            props.disable()
        }, 500) // Same amount of time as expressed in css transition (0.5s)
    }

    useEffect(() => {
        // Triggers transition once state is 'enabled'
        if (props.isEnabled) {
            setClassName('popup-layer-enabled')
            setLinkClassName('text-state-0')
        }
    }, [props.isEnabled]);

    if (!props.isEnabled) {
        return null
    }

    // TODO: cleanup these classes once functionality works as expected

    return (
        <>
            <div className={'popup-layer' + ' ' + className}>
                <Button onClick={tearDown}>X</Button>
                <div className={'link-container'}>
                    <div className={'link-box' + ' ' + linkClassName}>
                        <ul className={'nav flex-column'}>
                            <NavListItem>One</NavListItem>
                            <NavListItem>Two</NavListItem>
                            <NavListItem>How about a third</NavListItem>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

FullScreenPopupLayer.propTypes = {
    isEnabled: PropTypes.bool.isRequired, // Determines whether layer should be shown
    disable: PropTypes.func.isRequired, // Callback to disable state (owned by parent)
}

export default FullScreenPopupLayer