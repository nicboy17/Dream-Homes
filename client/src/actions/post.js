/* eslint-disable camelcase */
import { GET_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL } from '../actions/types';
import axios from 'axios';

export const getPosts = () => ({
    type: GET_POSTS
});

// Fetch posts based on filter or interest
export const fetchPosts = (search_filter, easy_filters, userId) => async dispatch => {
    try {
        const res = await axios.get(
            `/posts?userId=${userId}&search_filter=${search_filter}&easy_filters=${easy_filters}`);
        dispatch({
            type: FETCH_POSTS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FETCH_POSTS_FAIL
        });
    }
};
