import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import PropTypes from "prop-types";
import { tokenConfig } from "../../api/tokenConfig";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import LogoutButton from "./LogoutButton";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import "./css/Settings.css";

function Settings(props) {
    const [loadingSpotifyAccount, setLoadingSpotifyAccount] = useState(null);
    const [userSpotifyProfile, setUserSpotifyProfile] = useState({
        email: null,
        id: null,
    });

    // Set if err returned from getting Spotify profile
    const [returnedError, setReturnedError] = useState(null);

    // Fetch info about the user's linked Spotify account
    useEffect(() => {
        if (props.isSpotifyAuthenticated && props.authToken) {
            setLoadingSpotifyAccount(true);
            axiosInstance
                .get(
                    "spotify/get-current-user-spotify-profile",
                    tokenConfig(props.authToken)
                )
                .then((res) => {
                    setUserSpotifyProfile(res.data);
                })
                .catch((err) => {
                    setReturnedError(err.response.data.reason);
                })
                .finally(() => {
                    setLoadingSpotifyAccount(false);
                });
        }
    }, [props.authToken, props.isSpotifyAuthenticated]);

    const spotifyAccountInfo = (
        <div className={"py-3"}>
            <span>
                <strong>Username:</strong> {userSpotifyProfile.id}
            </span>
            <br />
            <span>
                <strong>Email:</strong> {userSpotifyProfile.email}
            </span>
        </div>
    );

    const spotifyError = (
        <>
            <h6>
                We ran into an error when fetching your linked Spotify account.
            </h6>
            <p>Reason: {returnedError ? returnedError : null}</p>
        </>
    );

    const getSpotifyJsx = () => {
        if (loadingSpotifyAccount) {
            return <>Fetching your Spotify account...</>;
        }

        if (returnedError) {
            return spotifyError;
        }

        if (props.isSpotifyAuthenticated) {
            return spotifyAccountInfo;
        }

        // If not Spotify authenticated but no error
        return (
            <>
                Your Vynle account is not currently linked to a Spotify account.
            </>
        );
    };

    return (
        <>
            <h3>Settings</h3>
            <Card className={"spotify-account-card"}>
                <CardHeader>Your linked Spotify account</CardHeader>
                <div className={"p-3"}>{getSpotifyJsx()}</div>
            </Card>
            <LogoutButton />
        </>
    );
}

Settings.propTypes = {
    authToken: PropTypes.string,
    logout: PropTypes.func,
};

const mapStateToProps = (state) => ({
    authToken: state.auth.token,
    isSpotifyAuthenticated: state.spotify.isSpotifyAuthenticated,
});

export default connect(mapStateToProps, { logout })(Settings);
