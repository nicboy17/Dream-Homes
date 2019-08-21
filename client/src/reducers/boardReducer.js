import { FETCHING_BOARD_POSTS, FETCH_BOARD_POSTS_FAIL, FETCH_BOARD_POSTS_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    board: {},
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
    case FETCHING_BOARD_POSTS:
        return { ...state, loading: true };
    case FETCH_BOARD_POSTS_SUCCESS:
        return { ...state, loading: false, board: payload.board };
    case FETCH_BOARD_POSTS_FAIL:
        return { ...state, loading: false };
    default:
        return state;
    }
};
