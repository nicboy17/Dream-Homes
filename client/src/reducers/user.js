import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_RESPONSE,
    LOGIN_ERROR,
    GET_TOKEN_SUCCESS,
    EDIT_PROFILE_SUCCESS,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,
    FETCH_FOLLOWINGS_SUCCESS,
    FETCH_FOLLOWINGS_FAIL,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_FAIL
} from '../actions/types';
import _ from 'lodash';

const initialState = {
    authenticated: false
};

export default (state = initialState, action) => {
    const response = action.response;

    switch (action.type) {
    case LOGIN_SUCCESS:
        return { authenticated: true, user: response.user, token: response.token };
    case LOGIN_ERROR:
        return { ...state, authenticated: false, error: action.error };
    case LOGIN_RESPONSE:
        delete state.error;
        return { ...state };
    case LOGOUT_SUCCESS:
        return { authenticated: false };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    case EDIT_PROFILE_SUCCESS:
        return { ...state, user: { ...state.user, profile: action.payload.user.profile, name: action.payload.user.name } };
    case FOLLOW_SUCCESS:
        const containsId = _.filter(
            state.profileInfo.followers,
            follower => follower.id === action.payload.id
        );
        return {
            ...state,
            followers: _.isEmpty(containsId)
                ? state.profileInfo.followers
                : [...state.profileInfo.followers, action.payload],
            loading: false,
            error: ''
        };
    case UNFOLLOW_SUCCESS:
        return {
            ...state,
            followers: state.profileInfo.followers.filter(
                follower => follower._id !== action.payload
            ),
            loading: false,
            error: action.payload
        };
    case FOLLOW_FAIL:
    case UNFOLLOW_FAIL:
        return { ...state, error: action.payload.error };
    case FETCH_FOLLOWINGS_SUCCESS:
        return { ...state, following: action.payload };
    case FETCH_FOLLOWINGS_FAIL:
    case FETCH_FOLLOWERS_FAIL:
        return { ...state, error: action.payload.error };
    case FETCH_FOLLOWERS_SUCCESS:
        return { ...state, followers: action.payload };
    default:
        return state;
    }
};
