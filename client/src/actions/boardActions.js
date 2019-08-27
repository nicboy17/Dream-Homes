import {
    GET_BOARD_POSTS,
    ADD_BOARD_POST
} from './types';

export const addBoardPost = (board, post) => ({
    type: ADD_BOARD_POST,
    board,
    post
});

export const getBoardPosts = id => ({
    type: GET_BOARD_POSTS,
    id
});
