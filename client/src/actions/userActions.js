import {
    GET_TOKEN,
    LOGIN,
    LOGIN_RESPONSE,
    LOGOUT,
    FETCH_FOLLOWINGS_SUCCESS,
    FETCH_FOLLOWINGS_FAIL,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_FAIL
} from '../actions/types';
import axios from 'axios';

export const login = user => ({
    type: LOGIN,
    user
});

export const loginResponse = () => ({
    type: LOGIN_RESPONSE
});

export const logout = () => ({
    type: LOGOUT
});

export const getToken = () => ({
    type: GET_TOKEN
});

export const fetchFollowing = username => async dispatch => {
    try {
        const res = await axios.get(`/users/${username}/following`);
        dispatch({
            type: FETCH_FOLLOWINGS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FETCH_FOLLOWINGS_FAIL,
            payload: { error: 'Something went wrong with fetching followings' }
        });
    }
};

export const fetchFollowers = username => async dispatch => {
    try {
        const res = await axios.get(`/users/${username}/following`);
        dispatch({
            type: FETCH_FOLLOWERS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FETCH_FOLLOWERS_FAIL,
            payload: { error: 'Something went wrong with fetching followers' }
        });
    }
};
