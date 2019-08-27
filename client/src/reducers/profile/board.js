import {
    GET_BOARD_POSTS_SUCCESS,
    GET_BOARD_POSTS_ERROR,
    ADD_BOARD_SUCCESS, ADD_BOARD_ERROR, ADD_BOARD_POST_SUCCESS, ADD_BOARD_POST_ERROR
} from '../../actions/types';

export default (state = {}, action) => {
    const { type, response } = action;
    switch (type) {
    case GET_BOARD_POSTS_SUCCESS:
        if (!state.boards.length) {
            state.boards = [response.board];
        } else {
            state.boards = state.boards.map(board => {
                if (board._id === response.board._id) {
                    return response.board;
                }
                return board;
            });
        }
        return { ...state, loading: false };
    case GET_BOARD_POSTS_ERROR:
        return { ...state, loading: false };
    case ADD_BOARD_SUCCESS:
        state.boards.push(response.board);
        return { ...state };
    case ADD_BOARD_POST_SUCCESS:
        state.boards.find(board => board._id === action.response._id).posts = action.response.posts;
        return { ...state };
    case ADD_BOARD_POST_ERROR:
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    default:
        return state;
    }
};
