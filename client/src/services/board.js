import { Get, Post, Put, Delete } from './utils';

export const boardService = {
    addBoard: ({ board, username }) => {
        return Post(`/users/${username}/board`, board);
    },
    addPost: ({ board, post }) => {
        return Put(`/boards/${board}/post`, { post });
    },
    getPosts: ({ id }) => {
        return Get(`/boards/${id}/posts`);
    },
    removePost: ({ board, post }) => {
        return Put(`/boards/${board}/remove`, { post });
    },
    removeBoard: ({ board }) => {
        return Delete(`/boards/${board}`);
    }
};
