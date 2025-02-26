import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSpotifyAuthStatus } from "../../actions/spotify"
import PropTypes from "prop-types"

// TODO: exit hamburger w esc key

const PrivateRoute = (props) => {

    useEffect(() => {
        if (props.auth.isAuthenticated) {
            props.getSpotifyAuthStatus()
        }
    }, [props.auth.isAuthenticated]);

    if (props.auth.isAuthenticated === true) {
        if (props.requireSpotifyAuthentication) { // Spotify authentication required
            if (props.isSpotifyAuthenticated) {
                return <>{props.children}</>
            }
            if (props.isSpotifyAuthenticated === null) { // Wait for Spotify auth status to load
                return null
            }
            return <Navigate to={'/link-spotify-account'}/> // User needs to link Spotify account
        }

        return <>{props.children}</> // User is already Vynle auth and Spotify auth is not required, so they are good
    } else if (props.auth.isAuthenticated === false) {
        return <Navigate to={'/login'}/>
    } else { // Auth status not yet loaded
        return null
    }
};

PrivateRoute.propTypes = {
    requireSpotifyAuthentication: PropTypes.bool,
}

const mapStateToProps = state => ({
    auth: state.auth, // Allows for accessing the auth object via props.auth
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
});

export default connect(mapStateToProps, {getSpotifyAuthStatus})(PrivateRoute);