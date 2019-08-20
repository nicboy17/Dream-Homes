import {
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_ERROR,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL,
    FETCH_FOLLOWINGS_SUCCESS,
    FETCH_FOLLOWINGS_FAIL,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_FAIL,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    const response = action.response;
    switch (action.type) {
    case FETCH_PROFILE_SUCCESS:
        return action.payload;
    case FETCH_PROFILE_FAIL:
        return { ...state, error: action.payload.error };
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return response.user;
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: action.err };
    case ADD_BOARD_SUCCESS:
        return { ...state, profileInfo: { ...state.profileInfo, boards: [...state.profileInfo.boards, response.board] } };
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    case ADD_POST_SUCCESS:
        return { ...state, profileInfo: { ...state.profileInfo, posts: [...state.profileInfo.posts, response.post] } };
    case ADD_POST_ERROR:
        return { ...state, error: action.err };
    case FOLLOW_SUCCESS:
        const containsId = _.filter(state.followers, follower => follower.id === action.payload.id);
        return { ...state, followers: !_.isEmpty(containsId) ? state.followers : [...state.followers, action.payload] };
    case UNFOLLOW_SUCCESS:
        return { ...state, followers: _.filter(state.followers, follower => follower._id !== action.payload) };
    case FOLLOW_FAIL:
    case UNFOLLOW_FAIL:
        return { ...state, error: action.payload.error };
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
