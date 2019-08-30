import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR,
    GET_TOKEN_SUCCESS,
    SAVE_INTERESTS_SUCCESS,
    SAVE_INTERESTS_ERROR,
    CLEAR_ERROR,
    EDIT_USER_SUCCESS, DELETE_SUCCESS, DELETE_FAIL, EDIT_USER_ERROR
} from '../../actions/types';

const initialState = {
    authenticated: false
};

export default (state = initialState, action) => {
    const { type, response } = action;

    switch (type) {
    case LOGIN_SUCCESS:
        return { authenticated: true, user: response.user, token: response.token };
    case LOGIN_ERROR:
        return { ...state, authenticated: false, error: action.error };
    case LOGOUT_SUCCESS:
        return { authenticated: false };
    case SAVE_INTERESTS_SUCCESS:
        state.user.interests = action.user.interests;
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    case EDIT_USER_SUCCESS:
        return { ...state, user: { ...state.user, ...action.payload.user } };
    case EDIT_USER_ERROR:
        return { ...state, error: action.payload.error };
    case SAVE_INTERESTS_ERROR:
        return { ...state, error: action.error };
    case DELETE_SUCCESS:
        if (action.payload.item === 'posts') {
            state.user.boards = state.user.boards.map(board => {
                board.posts = board.posts.filter(post => post._id !== action.payload.id);
                return board;
            });
        }
        state.user[action.payload.item] = state.user[action.payload.item].filter(item => item._id !== action.payload.id);
        return {
            ...state,
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
