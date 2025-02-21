import React, { useEffect, useState } from "react"
import './css/FullScreenPopupLayer.css'
import PropTypes from "prop-types"

function FullScreenPopupLayer(props) {
    // Ensures has type 'array'
    // Passed as object when only single element
    const children = React.Children.toArray(props.children)

    const secondsToDelay = 25 // milliseconds between each new link sliding in from left
    const animationTime = 500 // Time of animation set in css file

    // Initializes array of empty strings with length 'len'
    const initEmptyStrArray = (len) => {
        const arr = []
        for (let i = 0; i < len; i++) {
            arr.push('')
        }
        return arr
    }

    const [popupClassName, setPopupClassName] = useState('')
    const [linkClasses, setLinkClasses] = useState(initEmptyStrArray(children.length))
    // Local copy of props.isEnabled that is only toggled off after transition completes
    const [isEnabled, setIsEnabled] = useState(false)

    // Wrapping setTimeout in function preserves local variables from loop (via function's stack frame)
    function setStateAfterDelay(newStateArr, i) {
        setTimeout(() => {
            setLinkClasses(newStateArr)
        }, secondsToDelay * i) // Increase delay by 'secondsToDelay' each time
    }

    const setLinksToFinalState = () => {
        let prevStateArr = [...linkClasses]

        //setStateAfterDelay(prevStateArr, 0)

        for (let i = 0; i < linkClasses.length; i++) {
            // Create copy of state array with new reference to let React know state has been updated
            prevStateArr = [...prevStateArr]
            prevStateArr[i] = 'text-final-state'
            setStateAfterDelay(prevStateArr, i + 1)
        }
    }

    const setLinksToInitialState = () => {
        let prevStateArr = linkClasses
        for (let i = 0; i < linkClasses.length; i++) {
            // Create copy of state array with new reference to let React know state has been updated
            prevStateArr = [...prevStateArr]
            prevStateArr[i] = ''
            setStateAfterDelay(prevStateArr, i + 1)
        }
    }

    const tearDown = () => {
        // Reset transitions to original state
        setPopupClassName('')

        // Reset link class to initial state
        setLinksToInitialState()

        console.log(`${secondsToDelay}, ${children.length}, ${animationTime} = ${(secondsToDelay * children.length) + animationTime}`)

        // Set parent's state variable to disabled after transition completes
        setTimeout(() => {
            // Make sure parent still wants menu disabled after timeout
            // necessary if user spams button
            if (props.isEnabled === false) {
                setIsEnabled(false)
            }
        }, (secondsToDelay * children.length) + animationTime) // Same amount of time as expressed in css transition (0.5s)
    }

    useEffect(() => {
        if (isEnabled === true) {
            setPopupClassName('popup-layer-enabled')

            // Set link class to final state
            setLinksToFinalState()
        }
    }, [isEnabled]);

    useEffect(() => {
        // Triggers transition once state is 'enabled'
        if (props.isEnabled) {
            setIsEnabled(true)

        } else if (props.isEnabled === false && isEnabled === true) {
            console.log('yeah lets just tear it down')
            tearDown()
        }
    }, [props.isEnabled]);

    if (isEnabled) {
        console.log('Child state enabled')
    } else {
        console.log('Child state disabled')
    }

    if (!isEnabled) {
        console.log('Returning nothing')
        return null
    }

    // Wrap each child component in div, so we can edit className
    // (avoids editing child elements which is not recommended)
    const generateListItems = () => {
        const tags = []
        for (let i = 0; i < children.length; i++) {
            tags.push(
                <div key={i} className={'link-box' + ' ' + linkClasses[i]}>
                    {children[i]}
                </div>
            )
        }
        return tags
    }

    // TODO: cleanup these classes once functionality works as expected

    return (
        <>
            <div className={'popup-layer' + ' ' + popupClassName}>
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
}

export default FullScreenPopupLayer