import {
    ADD_BOARD,
    ADD_POST,
    GET_USER_BOARDS_POSTS,
    FOLLOW_FAIL,
    FOLLOW_SUCCESS,
    UNFOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    FETCH_FOLLOWINGS_SUCCESS,
    FETCH_FOLLOWINGS_FAIL,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_FAIL,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL
} from '../actions/types';
import axios from 'axios';

export const getBoardsandPosts = username => ({
    type: GET_USER_BOARDS_POSTS,
    username
});

export const addBoard = (board, username) => ({
    type: ADD_BOARD,
    board,
    username
});

export const addPost = (post, username) => ({
    type: ADD_POST,
    post,
    username
});

export const fetchProfileInfo = (username) => async dispatch => {
    try {
        const res = await axios.get(`/users/${username}`);
        const promises = [
            axios.get(`/users/${res.data.user._id}/following`),
            axios.get(`/users/${res.data.user._id}/followers`)
        ];
        const results = await Promise.all(promises);
        const following = results[0].data.following;
        const followers = results[1].data.followers;
        const profileInfo = res.data.user;
        dispatch({
            type: FETCH_PROFILE_SUCCESS,
            payload: { profileInfo, following, followers }
        });
    } catch (err) {
        dispatch({
            type: FETCH_PROFILE_FAIL,
            payload: { error: 'Something went wrong with fetching the profile' }
        });
    }
};

export const followUser = (followee, _id) => async dispatch => {
    try {
        const body = {
            followee
        };
        await axios.post('/users/follow', body);
        dispatch({
            type: FOLLOW_SUCCESS,
            payload: { _id }
        });
    } catch (err) {
        dispatch({
            type: FOLLOW_FAIL,
            payload: { error: 'Failed to follow user' }
        });
    }
};
export const unfollowUser = (followee, id) => async dispatch => {
    try {
        const body = {
            followee
        };
        await axios.post('/users/unfollow', body);
        dispatch({
            type: UNFOLLOW_SUCCESS,
            payload: id
        });
    } catch (err) {
        dispatch({
            type: UNFOLLOW_FAIL,
            payload: { error: 'Failed to unfollow user' }
        });
    }
};

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
