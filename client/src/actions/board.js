import { ADD_POST_TO_BOARD } from './types';

export const addPostToBoard = (board, post) => ({
    type: ADD_POST_TO_BOARD,
    board,
    post
});
