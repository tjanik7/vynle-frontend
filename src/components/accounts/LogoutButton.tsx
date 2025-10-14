import React from "react";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";

function LogoutButton(props: Props) {
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

type Props = {
    logout: () => void; // TODO: can logout's type be determined by the file in which it is defined
};

LogoutButton.propTypes = {
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state: {}) => ({});

export default connect(mapStateToProps, { logout })(LogoutButton);
