import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSpotifyAuthStatus } from "../../actions/spotify"

const PrivateRoute = ({children, auth, getSpotifyAuthStatus}) => {
    useEffect(() => {
        if (auth.isAuthenticated) {
            getSpotifyAuthStatus()
        }
    }, [auth.isAuthenticated]);

    if (auth.isAuthenticated === true) {
        return <>{children}</>
    } else if (auth.isAuthenticated === false) {
        return <Navigate to={'/login'}/>
    } else { // Auth status not yet loaded
        return null
    }
};

const mapStateToProps = state => ({
    auth: state.auth, // Allows for accessing the auth object via props.auth
});

export default connect(mapStateToProps, {getSpotifyAuthStatus})(PrivateRoute);