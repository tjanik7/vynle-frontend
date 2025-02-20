import React, { useEffect, useState } from "react"
import './css/FullScreenPopupLayer.css'
import NavListItem from "./NavListItem"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"

function FullScreenPopupLayer(props) {
    const [className, setClassName] = useState('')
    const [linkClassName0, setLinkClassName0] = useState('')
    const [linkClassName1, setLinkClassName1] = useState('')
    const [linkClassName2, setLinkClassName2] = useState('')

    const tearDown = () => {
        // Reset transitions to original state
        setClassName('')
        setTimeout(() => {setLinkClassName0('')}, 0)
        setTimeout(() => {setLinkClassName1('')}, 25)
        setTimeout(() => {setLinkClassName2('')}, 50)

        setTimeout(() => {
            props.disable()
        }, 500) // Same amount of time as expressed in css transition (0.5s)
    }

    useEffect(() => {
        // Triggers transition once state is 'enabled'
        if (props.isEnabled) {
            setClassName('popup-layer-enabled')
            // setLinkClassName('text-final-state')
            setTimeout(() => {setLinkClassName0('text-final-state')}, 0)
            setTimeout(() => {setLinkClassName1('text-final-state')}, 25)
            setTimeout(() => {setLinkClassName2('text-final-state')}, 50)
        }
    }, [props.isEnabled]);

    if (!props.isEnabled) {
        return null
    }

    // TODO: cleanup these classes once functionality works as expected

    return (
        <>
            <div className={'popup-layer' + ' ' + className}>
                <Button className={'x-button'} onClick={tearDown}>X</Button>
                <div className={'link-container'}>
                    <div>
                        <ul className={'nav flex-column'}>
                            <NavListItem className={'link-box' + ' ' + linkClassName0}>One</NavListItem>
                            <NavListItem className={'link-box' + ' ' + linkClassName1}>Two</NavListItem>
                            <NavListItem className={'link-box' + ' ' + linkClassName2}>How about a third</NavListItem>
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