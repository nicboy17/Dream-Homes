import {
    ADD_BOARD,
    ADD_POST,
    GET_TOKEN,
    GET_USER_BOARDS_POSTS,
    LOGIN,
    REMOVE_ERROR,
    LOGOUT,
    REGISTER
} from '../actions/types';

export const login = (user) => ({
    type: LOGIN,
    user
});

export const register = (user) => ({
    type: REGISTER,
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

export const getBoardsandPosts = (username) => ({
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
