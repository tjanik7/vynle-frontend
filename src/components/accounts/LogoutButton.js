import React from "react";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

function LogoutButton(props) {
    return (
        <>
            <button
                onClick={props.logout}
                className={"nav-link btn btn-primary btn-sm text-light"}
            >
                Logout
            </button>
        </>
    );
}

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(LogoutButton);
