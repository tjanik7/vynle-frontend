import React, { useState } from "react"
import './css/FullScreenPopupLayer.css'

function FullScreenPopupLayer(props) {
    // Ensures children is of type 'array' in all cases
    // Passed as object when only single element
    const children = React.Children.toArray(props.children)

    const secondsToDelay = 25 // milliseconds between each new link sliding in from left
    const animationTime = 750 // Time of animation set in css file

    // Initializes array of empty strings with length 'len'
    const initArray = (len, value) => {
        const arr = []
        for (let i = 0; i < len; i++) {
            arr.push(value)
        }
        return arr
    }

    // State variable setup
    const [menuEnabled, setMenuEnabled] = useState(false)
    const [linkClasses, setLinkClasses] = useState(initArray(children.length, false))
    const [transitionInFinalState, setTransitionInFinalState] = useState(false)

    // Wrapping setTimeout in function preserves local variables from loop (via function's stack frame)
    function setStateAfterDelay(setter, newValue, delayLength) {
        setTimeout(() => {
            setter(newValue)
        }, delayLength) // Increase delay by 'secondsToDelay' each time
    }

    const setLinksToFinalState = () => {
        let prevStateArr = [...linkClasses]

        for (let i = 0; i < linkClasses.length; i++) {
            // Create copy of state array with new reference to let React know state has been updated
            prevStateArr = [...prevStateArr]
            prevStateArr[i] = true
            setStateAfterDelay(setLinkClasses, prevStateArr, i * secondsToDelay)
        }
    }

    const setLinksToInitialState = () => {
        let prevStateArr = linkClasses
        for (let i = 0; i < linkClasses.length; i++) {
            // Create copy of state array with new reference to let React know state has been updated
            prevStateArr = [...prevStateArr]
            prevStateArr[i] = false
            setStateAfterDelay(setLinkClasses, prevStateArr, i * secondsToDelay)
        }
        // Disable the menu so that this component returns 'null'
        setStateAfterDelay(setMenuEnabled, false, animationTime)
    }

    const tearDown = () => {
        // Reset link class to initial state
        setLinksToInitialState()
        setTransitionInFinalState(false)
    }

    const onClick = () => {
        if (menuEnabled === true) { // Activate hamburger menu
            tearDown() // Sets menuEnabled -> false when animation completes
        } else { // Close hamburger menu
            setMenuEnabled(true)
            setLinksToFinalState()
            setTransitionInFinalState(true)
        }
    }

    // Wrap each child component in div, so we can edit className
    // (avoids editing child elements which is not recommended)
    const generateListItems = () => {
        const tags = []
        let child

        for (let i = 0; i < children.length; i++) {
            child = children[i]
            tags.push(
                <li key={child.props.uniqueKeyString} onClick={onClick} className={'my-1 link-box' + ' ' + (linkClasses[i] ? 'text-final-state' : '')}>
                    {child}
                </li>
            )
        }
        return tags
    }

    const popupLayer = (
        <div className={'popup-layer' + ' ' + (transitionInFinalState ? 'popup-layer-enabled' : '')}>
            <div className={'link-container'}>
                <div>
                    <ul className={'nav flex-column'}>
                        {generateListItems()}
                    </ul>
                </div>
            </div>
        </div>
    )

    // TODO: cleanup these classes once functionality works as expected (make them all 'change' or something)

    return (
        <>
            {/*Button to toggle hamburger menu*/}
            <div className={'menu-button' + ' ' + (transitionInFinalState ? 'change' : '')} onClick={onClick}>
                <div className={'menu-button-line bar1'}></div>
                <div className={'menu-button-line bar2'}></div>
                <div className={'menu-button-line bar3'}></div>
            </div>
            {/*Full screen hamburger menu layer*/}
            {menuEnabled ? popupLayer : null}
        </>
    )
}

export default FullScreenPopupLayer