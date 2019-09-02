import {
    GET_USER_BOARDS_POSTS,
    CLEAR_ERROR
} from '../actions/types';

export const getBoardsandPosts = username => ({
    type: GET_USER_BOARDS_POSTS,
    username
});

export const clearError = () => ({
    type: CLEAR_ERROR
});
