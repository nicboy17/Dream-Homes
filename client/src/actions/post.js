/* eslint-disable camelcase */
import {
    SEARCH_POSTS,
    ADD_POST
} from '../actions/types';

export const addPost = (post, username) => ({
    type: ADD_POST,
    post,
    username
});

export const searchPosts = (search, filters) => ({
    type: SEARCH_POSTS,
    search,
    filters
});
