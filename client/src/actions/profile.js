import {
    GET_USER_BOARDS_POSTS,
    CLEAR_ERROR, PROFILE_TAB_CHANGE
} from '../actions/types';

export const getBoardsandPosts = username => ({
    type: GET_USER_BOARDS_POSTS,
    username
});

export const tabChange = tab => ({
    type: PROFILE_TAB_CHANGE,
    tab
});

export const clearError = () => ({
    type: CLEAR_ERROR
});
