import React from "react"
import { Link, useNavigate } from "react-router-dom"
import PropTypes from "prop-types"

function handleSubmit(e) {
    // Prevents browser from reloading the page
    e.preventDefault()

    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
    console.log(formJson)
}

function LoginFunctional(props) {
    const navigate = useNavigate()

    // Navigate to feed if logged in
    if (props.isAuthenticated) {
        //navigate('/')
        console.log('User is authenticated')
    }

    return (
        <>
            <div className={'col-md-6 m-auto'}>
                <div className={'card card-body mt-5'}>
                    <h2 className={'text-center'}>New Login</h2>
                    <form method={'post'} onSubmit={handleSubmit}>
                        <div className={'form-group mb-3'}>
                            <label>Email</label>
                            <input className={'form-control'} type={'email'} name={'email'}/>
                        </div>
                        <div className={'form-group mb-3'}>
                            <label>Password</label>
                            <input className={'form-control'} type={'password'} name={'password'}/>
                        </div>
                        <div className={'form-group'}>
                        <button type={'submit'} className={'btn btn-primary mb-2'}>
                                <span>Login</span>
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
    isAuthenticated: PropTypes.bool, // Not setting as required bc null useful while fetching status
}

export default LoginFunctional