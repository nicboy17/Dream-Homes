import {
    LOGIN_SUCCESS, LOGOUT_SUCCESS, REMOVE_ERROR,
    LOGIN_ERROR, GET_TOKEN_SUCCESS,
    GET_USER_BOARDS_POSTS_SUCCESS, GET_USER_BOARDS_POSTS_ERROR,
    ADD_BOARD_SUCCESS, ADD_BOARD_ERROR,
    ADD_POST_SUCCESS, ADD_POST_ERROR,
    EDIT_USER_ERROR, EDIT_USER_SUCCESS, ADD_POST_TO_BOARD_SUCCESS, ADD_POST_TO_BOARD_ERROR
} from '../actions/types';

const initialState = {
    authenticated: false
};

export default (state = initialState, action) => {
    const response = action.response;

    switch (action.type) {
    case LOGIN_SUCCESS:
        return { authenticated: true, user: response.user, token: response.token };
    case LOGIN_ERROR:
        return { ...state, authenticated: false, error: action.error };
    case EDIT_USER_SUCCESS:
        return { ...state, success: true, user: response.user };
    case EDIT_USER_ERROR:
        return { ...state, authenticated: false, error: action.error };
    case REMOVE_ERROR:
        delete state.success;
        delete state.error;
        return { ...state };
    case LOGOUT_SUCCESS:
        return { authenticated: false };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return { ...state, boards: response.user.boards, posts: response.user.posts };
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
    case ADD_POST_TO_BOARD_SUCCESS:
        console.log(response.board);
        const index = state.boards.findIndex((board) => { return board._id === response.board._id; });
        state.boards[index] = response.board;
        return { ...state, success: true };
    case ADD_POST_TO_BOARD_ERROR:
        return { ...state, error: action.err };
    default:
        return state;
    }
};
