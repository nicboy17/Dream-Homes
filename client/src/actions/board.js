import {
    GET_BOARD_POSTS,
    ADD_BOARD_POST,
    ADD_BOARD,
    REMOVE_BOARD_POST,
    REMOVE_BOARD
} from './types';

export const addBoard = (board, username) => ({
    type: ADD_BOARD,
    board,
    username
});

export const addBoardPost = (board, post) => ({
    type: ADD_BOARD_POST,
    board,
    post
});

export const getBoardPosts = id => ({
    type: GET_BOARD_POSTS,
    id
});

export const removePost = (board, post) => ({
    type: REMOVE_BOARD_POST,
    board,
    post
});

export const removeBoard = board => ({
    type: REMOVE_BOARD,
    board
});
