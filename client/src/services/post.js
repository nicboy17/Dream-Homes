import { axios, createFormData, Get } from './utils';

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
    // eslint-disable-next-line camelcase
    searchPosts: ({ search_filter, easy_filters, userId }) => {
        // eslint-disable-next-line camelcase
        return Get(`/posts?userId=${userId}&search_filter=${search_filter}&easy_filters=${easy_filters}`);
    }
};
