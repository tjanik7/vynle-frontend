import React, { useEffect, useState } from "react"
import './css/FullScreenPopupLayer.css'
import NavListItem from "./NavListItem"
import { Button } from "react-bootstrap"
import PropTypes from "prop-types"

function FullScreenPopupLayer(props) {
    const animationInterval = 50 // milliseconds
    const linkList = [ // List where each element is [<Link label>, <link route>]
        ['One', ''],
        ['Two', ''],
        ['Here\'s a third', ''],
        ['I mean we could absolutely do another', '']
    ]

    // Initializes array of empty strings with length 'len'
    const initArray = (len) => {
        const arr = []
        for (let i = 0; i < len; i++) {
            arr.push('')
        }
        return arr
    }

    const [className, setClassName] = useState('')
    const [linkClasses, setLinkClasses] = useState(initArray(linkList.length))

    // Wrapping setTimeout in function preserves local variables from loop (via function's stack frame)
    function setStateAfterDelay(newStateArr, i) {
        setTimeout(() => {
            setLinkClasses(newStateArr)
        }, animationInterval * i) // Increase delay by 'animationInterval' each time
    }

    const setLinksToFinalState = () => {
        let prevStateArr = linkClasses
        for (let i = 0; i < linkClasses.length; i++) {
            // Create copy of state array with new reference to let React know state has been updated
            prevStateArr = [...prevStateArr]
            prevStateArr[i] = 'text-final-state'
            setStateAfterDelay(prevStateArr, i)
        }
    }

    const setLinksToInitialState = () => {
        let prevStateArr = linkClasses
        for (let i = 0; i < linkClasses.length; i++) {
            // Create copy of state array with new reference to let React know state has been updated
            prevStateArr = [...prevStateArr]
            prevStateArr[i] = ''
            setStateAfterDelay(prevStateArr, i)
        }
    }

    const tearDown = () => {
        // Reset transitions to original state
        setClassName('')

        // Reset link class to initial state
        setLinksToInitialState()

        // Set parent's state variable to disabled after transition completes
        setTimeout(() => {
            props.disable()
        }, 500) // Same amount of time as expressed in css transition (0.5s)
    }

    useEffect(() => {
        // Triggers transition once state is 'enabled'
        if (props.isEnabled) {
            setClassName('popup-layer-enabled')

            // Set link class to final state
            setLinksToFinalState()
        }
    }, [props.isEnabled]);

    if (!props.isEnabled) {
        return null
    }

    const generateListItems = () => {
        const tags = []
        for (let i = 0; i < linkList.length; i++) {
            tags.push(
                <NavListItem key={i} className={'link-box' + ' ' + linkClasses[i]}>{linkList[i][0]}</NavListItem>
            )
        }
        return tags
    }

    // TODO: cleanup these classes once functionality works as expected

    return (
        <>
            <div className={'popup-layer' + ' ' + className}>
                <Button className={'x-button'} onClick={tearDown}>X</Button>
                <div className={'link-container'}>
                    <div>
                        <ul className={'nav flex-column'}>
                            {generateListItems()}
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