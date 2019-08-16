import {
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_ERROR,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR,
    FOLLOW_SUCCESS,
    FOLLOW_FAIL,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAIL
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    const response = action.response;
    switch (action.type) {
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return response.user;
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: action.err };
    case ADD_BOARD_SUCCESS:
        state.boards.push(response.board);
        return { ...state };
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    case ADD_POST_SUCCESS:
        state.posts.push(response.post);
        return { ...state };
    case ADD_POST_ERROR:
        return { ...state, error: action.err };
    case FOLLOW_SUCCESS:
        return { ...state, followers: state.followers + 1 };
    case UNFOLLOW_SUCCESS:
        return { ...state, followers: state.followers - 1 };
    case FOLLOW_FAIL:
    case UNFOLLOW_FAIL:
        return { ...state, error: action.payload.error };
    default:
        return state;
    }
};
