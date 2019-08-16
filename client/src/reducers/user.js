import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_RESPONSE,
    LOGIN_ERROR,
    GET_TOKEN_SUCCESS,
    FOLLOW_SUCCESS,
    FETCH_FOLLOWINGS_SUCCESS,
    FETCH_FOLLOWINGS_FAIL,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_FAIL
} from '../actions/types';

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
    case FOLLOW_SUCCESS:
        return { ...state, following: state.following + 1 };
    case FETCH_FOLLOWINGS_SUCCESS:
        return { ...state, followingUsers: action.payload };
    case FETCH_FOLLOWINGS_FAIL:
    case FETCH_FOLLOWERS_FAIL:
        return { ...state, error: action.payload.error };
    case FETCH_FOLLOWERS_SUCCESS:
        return { ...state, followerUsers: action.payload };
    default:
        return state;
    }
};
