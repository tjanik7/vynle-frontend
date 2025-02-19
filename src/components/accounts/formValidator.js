export default function formHasError(fields, setErrors) {
    // Catch obvious form errors here before submitting

    const errorMessages = {}
    let errorFound = false

    if (!fields.email) {
        errorMessages['email'] = ['This field is required']
        errorFound = true
    }

    if (!fields.username) {
        errorMessages['username'] = ['This field is required']
        errorFound = true
    }

    if (!fields.password) {
        errorMessages['password'] = ['This field is required']
        errorFound = true
    }

    if (!fields.re_password) {
        errorMessages['re_password'] = ['This field is required']
        errorFound = true
    } else if (fields.password !== fields.re_password) {
        errorMessages['re_password'] = ['Passwords do not match']
        errorFound = true
    }

    // Update state with the errors found
    if (errorFound) {
        setErrors({
            status: 400,
            msg: errorMessages,
        })

        return true
    }


    return false
}