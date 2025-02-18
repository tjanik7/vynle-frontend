import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthField from "./AuthField"
import { getFieldHasErrorObj } from "../helperFunctions"
import PropTypes from "prop-types"
import { register } from "../../actions/auth"
import { connect } from "react-redux"

// TODO: add 'is required' star for required form fields

function Register(props) {
    function formHasError(fields) {
        // Catch obvious form errors here before submitting

        const errorMessages = {}
        let errorFound = false

        if(!fields.email) {
            errorMessages['email'] = ['This field is required']
            errorFound = true
        }

        if(!fields.username) {
            errorMessages['username'] = ['This field is required']
            errorFound = true
        }

        if(!fields.password) {
            errorMessages['password'] = ['This field is required']
            errorFound = true
        }

        if(!fields.re_password) {
            errorMessages['re_password'] = ['This field is required']
            errorFound = true
        } else if(fields.password !== fields.re_password) {
            errorMessages['re_password'] = ['Passwords do not match']
            errorFound = true
        }

        // Update state with the errors found
        if(errorFound) {
            setErrors({
                status: 400,
                msg: errorMessages,
            })

            return true
        }


        return false
    }

    function handleSubmit(e) {
        e.preventDefault()

        const form = e.target
        const formJson = Object.fromEntries(new FormData(form).entries())

        if(formHasError(formJson)) {
            return
        }

        props.register(formJson.email, formJson.password, formJson.username, formJson.first, formJson.last,
            setIsLoading, setErrors)
    }

    const navigate = useNavigate()
    useEffect(() => {
        // Navigate to feed if logged in
        if (props.isAuthenticated) {
            navigate('/', {replace: true})
        }
    }, [props.isAuthenticated]);

    // Init local state
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        msg: {},
        status: null,
    })

    const fieldHasError = getFieldHasErrorObj(
        ['email', 'username', 'first', 'last', 'password', 're_password'],
        errors
    )

    return (
        <>
            <div className={'col-md-6 m-auto'}>
                <div className={'card card-body mt-5'}>
                    <h2 className={'text-center'}>Register</h2>
                    <form method={'post'} onSubmit={handleSubmit}>
                        {/*email field*/}
                        <AuthField fieldHasError={fieldHasError['email']} label={'Email'} name={'email'}
                        errorMessage={errors.msg.email}/>
                        {/*username field*/}
                        <AuthField fieldHasError={fieldHasError['username']} label={'Username'} name={'username'}
                        errorMessage={errors.msg.username}/>
                        {/*first name field*/}
                        <AuthField fieldHasError={fieldHasError['first']} label={'First Name'} name={'first'}
                        errorMessage={errors.msg['first']}/>
                        {/*last name field*/}
                        <AuthField fieldHasError={fieldHasError['last']} label={'Last Name'} name={'last'}
                        errorMessage={errors.msg.last}/>
                        {/*password field*/}
                        <AuthField fieldHasError={fieldHasError['password']} label={'Password'} name={'password'}
                        errorMessage={errors.msg.password}/>
                        {/*re_password field*/}
                        <AuthField fieldHasError={fieldHasError['re_password']} label={'Confirm Password'}
                        name={'re_password'} fieldType={'password'} errorMessage={errors.msg.re_password}/>
                        {/*Register button and spinner*/}
                        <div className={'form-group'}>
                            <button type={'submit'} className={'btn btn-primary mb-2'}>
                                {isLoading ? <span className={'spinner-border spinner-border-sm'}
                                                   role='status' aria-hidden={'true'}/> : null}
                                <span className={'px-1'}>Register</span>
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to={'/login'}>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    register: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {register})(Register)