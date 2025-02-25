// Spotify actions
import axiosInstance from "../api/axiosInstance"

import {
    GET_SPOTIFY_AUTH_STATUS,
    GET_SPOTIFY_AUTH_URL,
    GET_CURRENT_USER_SPOTIFY_PROFILE,
    RESET_SPOTIFY_AUTH_STATUS
} from './types'
import { reduxTokenConfig } from "../api/tokenConfig"

export const resetSpotifyAuthStatus = () => (dispatch, getState) => {
    dispatch({
        type: RESET_SPOTIFY_AUTH_STATUS,
    })
}

export const getCurrentUserSpotifyProfile = () => (dispatch, getState) => {
    axiosInstance.get('spotify/get-current-user-spotify-profile', reduxTokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CURRENT_USER_SPOTIFY_PROFILE,
                payload: res.data
            })
        })
}

export const getSpotifyAuthStatus = () => (dispatch, getState) => {
    axiosInstance.get('/spotify/is-spotify-authenticated', reduxTokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPOTIFY_AUTH_STATUS,
                payload: res.data
            })
        })
}

export const getSpotifyAuthURL = () => (dispatch, getState) => {
    axiosInstance.get('/spotify/get-auth-url', reduxTokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPOTIFY_AUTH_URL,
                payload: res.data
            })
        })
}