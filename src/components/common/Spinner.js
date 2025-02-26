import React from "react"
import './css/Spinner.css'
import PropTypes from "prop-types"
import { Image } from "react-bootstrap"
import { buildStaticUrl } from "../../api/serverLocations"

function Spinner(props) {
    if (!props.isEnabled) {
        return null
    }

    return (
        <span className={'vynle-spinner'}>
            <Image src={buildStaticUrl('img/vynle-spinner.svg')}/>
        </span>
    )
}

Spinner.propTypes = {
    isEnabled: PropTypes.bool,
}

export default Spinner