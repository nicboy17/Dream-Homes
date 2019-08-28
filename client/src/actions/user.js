import {
    GET_TOKEN,
    REGISTER,
    REMOVE_ERROR,
    EDIT_USER,
    LOGIN,
    LOGOUT,
    SAVE_INTERESTS,
    FOLLOW,
    UNFOLLOW, FETCH_FOLLOWING, FETCH_FOLLOWERS, ADD_FAVOURITE, REMOVE_FAVOURITE
} from '../actions/types';

export const login = user => ({
    type: LOGIN,
    user
});

export const register = (user) => ({
    type: REGISTER,
    user
});

export const edit = (user) => ({
    type: EDIT_USER,
    user
});

export const respond = () => ({
    type: REMOVE_ERROR
});

export const logout = () => ({
    type: LOGOUT
});

export const getToken = () => ({
    type: GET_TOKEN
});

export const saveInterests = (username, interests) => ({
    type: SAVE_INTERESTS,
    username,
    interests
});

export const favouritePost = (username, post) => ({
    type: ADD_FAVOURITE,
    username,
    post
});

export const unFavouritePost = (username, post) => ({
    type: REMOVE_FAVOURITE,
    username,
    post
});

export const getFollowing = user => ({
    type: FETCH_FOLLOWING,
    user
});

export const getFollowers = user => ({
    type: FETCH_FOLLOWERS,
    user
});

export const follow = followee => ({
    type: FOLLOW,
    followee
});

export const unfollow = followee => ({
    type: UNFOLLOW,
    followee
});
