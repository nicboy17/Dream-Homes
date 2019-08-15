import {
    ADD_BOARD,
    ADD_POST,
    GET_USER_BOARDS_POSTS,
    FOLLOW_FAIL,
    FOLLOW_SUCCESS
} from '../actions/types';
import axios from 'axios';

export const getBoardsandPosts = username => ({
    type: GET_USER_BOARDS_POSTS,
    username
});

export const addBoard = (board, username) => ({
    type: ADD_BOARD,
    board,
    username
});

export const addPost = (post, username) => ({
    type: ADD_POST,
    post,
    username
});

export const followUser = (currentUserId, followingId) => async dispatch => {
    const body = {
        followee: followingId,
        follower: currentUserId
    };
    const config = {
        headers: 'application/json'
    };
    try {
        await axios.post('/users/follow', body, config);
        dispatch({
            type: FOLLOW_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: FOLLOW_FAIL,
            payload: { error: 'Failed to follow user' }
        });
    }
};
