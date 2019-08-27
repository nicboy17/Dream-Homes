import {
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    FETCHING_PROFILE,
    CLEAR_ERROR, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS, DELETE_SUCCESS, DELETE_FAIL
} from '../../actions/types';

const initialState = {
    boards: [],
    posts: [],
    favourites: [],
    loading: true,
    error: {}
};

export default (state = initialState, action) => {
    const { type, response } = action;
    switch (type) {
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return {
            ...state,
            ...response
        };
    case FOLLOW_SUCCESS:
        state.user.followers += 1;
        state.user.isFollowing = true;
        return {
            ...state,
            loading: false,
            error: ''
        };
    case UNFOLLOW_SUCCESS:
        state.user.followers -= 1;
        state.user.isFollowing = false;
        return {
            ...state,
            loading: false,
            error: ''
        };
    case FETCHING_PROFILE:
    case FETCH_PROFILE_SUCCESS:
        return { ...state, user: action.payload, loading: false };
    case FETCH_PROFILE_FAIL:
        return { ...state, error: action.payload.error };
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: action.err };
    case DELETE_SUCCESS:
        let boards = state.boards;
        if (action.payload.item === 'posts') {
            boards = state.boards.map(board => {
                board.posts = board.posts.filter(post => post._id !== action.payload.id);
                return board;
            });
        }
        return {
            ...state,
            boards,
            [action.payload.item]: state[action.payload.item].filter(item => item._id !== action.payload.id),
            loading: false,
            error: action.payload.error
        };
    case DELETE_FAIL:
        return { ...state, error: action.payload.error };
    case CLEAR_ERROR:
        return { ...state, error: {} };
    default:
        return state;
    }
};
