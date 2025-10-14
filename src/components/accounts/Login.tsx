import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { getFieldHasErrorObj } from "../helperFunctions";
import AuthField from "./AuthField";
import formHasError from "./formValidator";
import Spinner from "../common/Spinner";
import type { Error } from "src/components/accounts/Types";

function Login(props: Props) {
    function handleSubmit(e: SubmitEvent) {
        // Prevents browser from reloading the page
        e.preventDefault();
        e;
        const form = e.currentTarget;
        if (form) {
            // Need to use "as" to type cast to avoid TypeScript error
            const formData = new FormData(form as HTMLFormElement);
            const formJson = Object.fromEntries(formData.entries());

            if (formHasError(formJson, setErrors)) {
                return;
            }

            props.login(
                formJson.email,
                formJson.password,
                setIsLoading,
                setErrors
            );
        }
    }

    const [isLoading, setIsLoading] = useState(false); // For local use while fetching auth status
    const [errors, setErrors] = useState<Error>({
        msg: {},
        status: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Navigate to feed if logged in
        if (props.isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [props.isAuthenticated]);

    const fieldHasError = getFieldHasErrorObj(
        ["email", "password", "non_field_errors"],
        errors
    );

    return (
        <>
            <div className={"col-md-6 m-auto"}>
                <div className={"card card-body mt-5"}>
                    <h2 className={"text-center"}>Login</h2>
                    <form method={"post"} onSubmit={handleSubmit}>
                        {/*Non-field errors*/}
                        {fieldHasError["non_field_errors"] ? (
                            <p className={"text-danger"}>
                                Incorrect username or password. Please try
                                again.
                            </p>
                        ) : null}
                        {/*Email field*/}
                        <AuthField
                            fieldHasError={fieldHasError["email"]}
                            label={"Email"}
                            name={"email"}
                            errorMessage={errors.msg.email}
                        />
                        {/*Password field*/}
                        <AuthField
                            fieldHasError={fieldHasError["password"]}
                            label={"Password"}
                            name={"password"}
                            errorMessage={errors.msg.password}
                        />
                        {/*Login button and spinner*/}
                        <div className={"form-group"}>
                            <button
                                type={"submit"}
                                className={"btn btn-primary mb-2"}
                            >
                                <Spinner isEnabled={isLoading} />
                                <span className={"px-1"}>Login</span>
                            </button>
                        </div>
                        <p>
                            Don't have an account?{" "}
                            <Link to={"/register"}>Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

type FormValueOrUndefined = FormDataEntryValue | undefined;

type Login = (
    email: FormValueOrUndefined,
    password: FormValueOrUndefined,
    setIsLoading: (isLoading: boolean) => void,
    setErrors: (error: Error) => void
) => void;

type Props = {
    isAuthenticated: boolean;
    login: Login;
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool, // Not setting as required bc null state useful while fetching status
    login: PropTypes.func.isRequired,
};

type State = {
    auth: {
        isAuthenticated: boolean;
    };
};

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
