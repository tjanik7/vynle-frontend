import React from "react";
import PropTypes from "prop-types";

function AuthField({ fieldHasError, label, name, errorMessage, fieldType }) {
    const errorMessageStr = errorMessage ? errorMessage[0] : "";

    // Currently only needed to set re_password to type 'password'
    const type = fieldType ? fieldType : name;

    return (
        <div
            className={"form-group mb-3" + (fieldHasError ? " has-danger" : "")}
        >
            <label>{label}</label>
            <input
                className={
                    "form-control" + (fieldHasError ? " is-invalid" : "")
                }
                type={type}
                name={name}
            />
            {fieldHasError ? (
                <div className={"invalid-feedback"}>{errorMessage}</div>
            ) : null}
        </div>
    );
}

AuthField.propTypes = {
    fieldHasError: PropTypes.bool.isRequired,
    errorMessage: PropTypes.array,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    fieldType: PropTypes.string,
};

export default AuthField;
