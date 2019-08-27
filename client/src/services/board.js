import { Get, Post, Put } from './utils';

export const boardService = {
    addBoard: ({ board, username }) => {
        return Post(`/users/${username}/board`, board);
    },
    addPost: ({ board, post }) => {
        return Put(`/boards/${board}/post`, { _id: post });
    },
    getPosts: ({ id }) => {
        return Get(`/boards/${id}/posts`);
    }
};
