import React from "react"
import PropTypes from "prop-types"

function AuthField(props) {
    const fieldHasError = props.fieldHasError
    const errorMessage = props.errorMessage ? props.errorMessage[0] : ''
    const label = props.label
    const name = props.name

    return (
        <div className={'form-group mb-3' + (fieldHasError ? ' has-danger' : '')}>
            <label>{label}</label>
            <input className={'form-control' + (fieldHasError ? ' is-invalid' : '')}
                   type={name} name={name}/>
            {fieldHasError ? (
                <div className={'invalid-feedback'}>{errorMessage}</div>
            ) : null}
        </div>
    )
}

AuthField.propTypes = {
    fieldHasError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.array,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default AuthField