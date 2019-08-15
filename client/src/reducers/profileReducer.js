import {
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_ERROR,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    const { type, response: { user, board, post }, err } = action;
    switch (type) {
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return user;
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: err };
    case ADD_BOARD_SUCCESS:
        state.boards.push(board);
        return { ...state };
    case ADD_BOARD_ERROR:
        return { ...state, error: err };
    case ADD_POST_SUCCESS:
        state.posts.push(post);
        return { ...state };
    case ADD_POST_ERROR:
        return { ...state, error: err };
    default:
        return state;
    }
};
