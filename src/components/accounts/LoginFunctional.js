import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { login } from '../../actions/auth'
import { getFieldHasErrorObj } from "../helperFunctions"

function LoginFunctional(props) {
    function handleSubmit(e) {
        // Prevents browser from reloading the page
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        props.login(formJson.email, formJson.password, setIsLoading, setErrors)
    }

    const [isLoading, setIsLoading] = useState(false) // For local use while fetching auth status
    const [errors, setErrors] = useState({
        msg: {},
        status: null
    })

    const navigate = useNavigate()

    useEffect(() => {
        // Navigate to feed if logged in
        if (props.isAuthenticated) {
            navigate('/', {replace: true})
        }
    }, [props.isAuthenticated]);

    useEffect(() => {
        console.log(errors)
    }, [errors]);

    const fieldHasError = getFieldHasErrorObj(['email', 'password', 'non_field_errors'], errors)
    console.log(`field has err:`)
    console.log(fieldHasError['non_field_errors'])

    return (
        <>
            <div className={'col-md-6 m-auto'}>
                <div className={'card card-body mt-5'}>
                    <h2 className={'text-center'}>New Login</h2>
                    <form method={'post'} onSubmit={handleSubmit}>
                        {/*Non-field errors*/}
                        {fieldHasError['non_field_errors'] ? (
                            <h5 className={'text-danger'}>Incorrect username or password. Please try again.</h5>
                        ) : null}
                        {/*Email field*/}
                        <div className={'form-group mb-3' + (fieldHasError['email'] ? ' has-danger' : '')}>
                            <label>Email</label>
                            <input className={'form-control' + (fieldHasError['email'] ? ' is-invalid' : '')}
                                   type={'email'} name={'email'}/>
                            {fieldHasError['email'] ? (
                    <div className={'invalid-feedback'}>{errors.msg.email}</div>
                ) : null}
                        </div>
                        {/*Password field*/}
                        <div className={'form-group mb-3' + (fieldHasError['password'] ? ' has-danger' : '')}>
                            <label>Password</label>
                            <input className={'form-control' + (fieldHasError['password'] ? ' is-invalid' : '')}
                                   type={'password'} name={'password'}/>
                            {fieldHasError['password'] ? (
                    <div className={'invalid-feedback'}>{errors.msg.password}</div>
                ) : null}
                        </div>
                        {/*Login button and spinner*/}
                        <div className={'form-group'}>
                            <button type={'submit'} className={'btn btn-primary mb-2'}>
                                {isLoading ? <span className={'spinner-border spinner-border-sm'}
                                                   role='status' aria-hidden={'true'}/> : null}
                                <span className={'px-1'}>Login</span>
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to={'/register'}>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

LoginFunctional.propTypes = {
    isAuthenticated: PropTypes.bool, // Not setting as required bc null state useful while fetching status
    login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {login})(LoginFunctional)