import { ADD_BOARD, ADD_POST, GET_TOKEN, GET_USER_BOARDS_POSTS, LOGIN, LOGIN_RESPONSE, LOGOUT } from '../actions/types';

export const login = (user) => ({
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
