import React, { useEffect, useState } from "react"
import axiosInstance from "../../api/axiosInstance"
import PropTypes from "prop-types"
import { tokenConfig } from "../../api/tokenConfig"
import { connect } from "react-redux"

// TODO: create button on home page to get here

function Settings(props) {
    const [userSpotifyProfile, setUserSpotifyProfile] = useState({
        email: null,
        id: null,
    })

    useEffect(() => {
        if (props.authToken) {
            axiosInstance.get('spotify/get-current-user-spotify-profile', tokenConfig(props.authToken))
                .then(res => {
                    setUserSpotifyProfile(res.data)
                })
                .catch(err => {
                    console.log('There was an error:')
                    console.log(err)
                })
        }
    }, [props.authToken]);

    return (<>
        <h3>Settings</h3>
        <div className={'py-3'}>
            <h5>Your linked Spotify account</h5>
            Email: {userSpotifyProfile.email}<br/>
            Username: {userSpotifyProfile.id}
        </div>
    </>)
}

Settings.propTypes = {
    authToken: PropTypes.string,
}

const mapStateToProps = state => ({
    authToken: state.auth.token,
})

export default connect(mapStateToProps, {})(Settings)