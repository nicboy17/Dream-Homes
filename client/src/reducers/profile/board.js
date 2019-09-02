import {
    GET_BOARD_POSTS_SUCCESS,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_POST_SUCCESS,
    BOARD_ERROR,
    REMOVE_BOARD_POST_SUCCESS,
    REMOVE_BOARD_SUCCESS
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
    case ADD_BOARD_SUCCESS:
        state.boards.push(response.board);
        return { ...state };
    case ADD_BOARD_POST_SUCCESS:
        return { ...state,
            boards: state.boards.map(board => {
                if (board._id === response.board._id) {
                    board = response.board;
                }
                return board;
            })
        };
    case REMOVE_BOARD_POST_SUCCESS:
        return { ...state,
            loading: false,
            boards: state.boards.map(board => {
                if (board._id === action.board) {
                    board.posts = board.posts.filter(post => post._id !== action.post);
                }
                return board;
            })
        };
    case REMOVE_BOARD_SUCCESS:
        state.boards = state.boards.filter(board => board._id !== action.board);
        return { ...state, loading: false, success: true };
    case BOARD_ERROR:
        return { ...state, loading: false, error: action.err };
    default:
        return state;
    }
};
