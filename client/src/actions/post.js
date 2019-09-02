/* eslint-disable camelcase */
import {
    SEARCH_POSTS,
    ADD_POST, REMOVE_POST
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

export const removePost = post => ({
    type: REMOVE_POST,
    post
});
