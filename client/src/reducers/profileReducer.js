import {
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_ERROR,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    FETCHING_PROFILE,
    CREATE_POST_LOADING,
    CLEAR_ERROR,
    DELETE_FAIL,
    DELETE_SUCCESS
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
    loading: false,
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    const response = action.response;
    switch (action.type) {
    case FETCHING_PROFILE:
    case CREATE_POST_LOADING:
        return { ...state, loading: true, error: {} };
    case FETCH_PROFILE_SUCCESS:
        return { ...state, profileInfo: action.payload, loading: false };
    case FETCH_PROFILE_FAIL:
    case EDIT_PROFILE_FAIL:
        return { ...state, error: action.payload.error };
    case EDIT_PROFILE_SUCCESS:
        return {
            ...state,
            profileInfo: {
                ...state.profileInfo,
                name: action.payload.user.name,
                profile: action.payload.user.profile
            }
        };
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return {
            ...state,
            profileInfo: response.user
        };
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: action.err };
    case ADD_BOARD_SUCCESS:
        return {
            ...state,
            profileInfo: {
                ...state.profileInfo,
                boards: [...state.profileInfo.boards, response.board]
            }
        };
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    case ADD_POST_SUCCESS:
        return {
            ...state,
            profileInfo: {
                ...state.profileInfo,
                posts: [...state.profileInfo.posts, response.post]
            },
            loading: false,
            error: response.error
        };
    case ADD_POST_ERROR:
        return { ...state, error: action.err, loading: false };
    case DELETE_SUCCESS:
        return {
            ...state,
            profileInfo: {
                ...state.profileInfo,
                [action.payload.item]: _.filter(
                    state.profileInfo[action.payload.item],
                    item => item._id !== action.payload.id
                )
            },
            loading: false,
            error: action.payload.error
        };
    case DELETE_FAIL:
        return { ...state, error: action.payload.error };
    case CLEAR_ERROR:
        return { ...state, error: {} };
    default:
        return state;
    }
};
