// Actions for profile
import {
    FOLLOWED_USER,
    GOT_USER_PROFILE,
    MARK_NOT_FETCHED,
    SET_FAV_ALBUM,
    UNFOLLOWED_USER,
    USER_PROFILE_NOT_FOUND
} from './types'
import axiosInstance from "../api/axiosInstance"
import AxiosInstance from "../api/axiosInstance"
import { reduxTokenConfig } from "../api/tokenConfig"

export const followUser = (user_id) => (dispatch, getState) => {
    AxiosInstance
        .post(`/users/follow/${user_id}/`, null, reduxTokenConfig(getState))
        .then(res => {
            dispatch({type: FOLLOWED_USER})
        }).catch(err => {
            console.log(err)
    })
}

export const unfollowUser = (user_id) => (dispatch, getState) => {
    AxiosInstance
        .post(`/users/unfollow/${user_id}/`, null, reduxTokenConfig(getState))
        .then(res => {
            dispatch({type: UNFOLLOWED_USER})
        }).catch(err => {
            console.log(err)
    })
}


export const setFavAlbum = (albumObj, ind) => (dispatch, getState) => {
    const albumData = getState().profile.favoriteAlbums[ind]

    // Mark album in state as not fetched to induce loading animation
    dispatch({
        type: MARK_NOT_FETCHED,
        payload: {
            album: albumData,
            ind: ind,
        }
    })

    const headers = reduxTokenConfig(getState)
    const params = {
        album_id: albumObj.spotify_release_uri,
        ind: ind,
    }

    axiosInstance.post('/spotify/set-fav-album', params, headers)
        .then(res => {
            dispatch({
                type: SET_FAV_ALBUM,
                payload: {
                    album: res.data,
                    ind: ind,
                }
            })
        })
}

export const getUserProfile = username => (dispatch, getState) => {
    axiosInstance.get(`/users/${username}`, reduxTokenConfig(getState))
        .then(res => {
            dispatch({
                type: GOT_USER_PROFILE,
                payload: res.data,
            })
        }).catch(err => {
            if(err.response.status === 404) {
                dispatch({
                    type: USER_PROFILE_NOT_FOUND,
                })
            }

            console.log(err)
        })
}
