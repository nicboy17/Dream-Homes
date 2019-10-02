import { axios, createFormData, Get, Delete } from './utils';

export const postService = {
    addPost: ({ post, username }) => {
        return axios({
            url: `/users/${username}/posts`,
            method: 'POST',
            data: createFormData(post),
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            return res.data;
        }).catch(err => {
            throw err;
        });
    },
    morePosts: ({ post }) => {
        return Get(`/posts/${post}/more`);
    },
    searchPosts: ({ search, filters }) => {
        return Get(`/posts?search=${search}&filters=${filters}`);
    },
    removePost: ({ post }) => {
        return Delete(`/posts/${post}`);
    }
};
