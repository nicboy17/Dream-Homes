/* eslint-disable camelcase */
import {
    SEARCH_POSTS,
    ADD_POST, REMOVE_POST, MORE_POSTS
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

export const morePosts = (post) => ({
    type: MORE_POSTS,
    post
});

export const removePost = post => ({
    type: REMOVE_POST,
    post
});
