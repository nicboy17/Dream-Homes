import { ADD_POST_SUCCESS, REMOVE_POST_SUCCESS, POST_ERROR } from '../../actions/types';

export default (state = {}, action) => {
    const { type, response } = action;
    switch (type) {
    case ADD_POST_SUCCESS:
        if (response.board) {
            state.boards.find(board => board._id === response.board).posts.push(response.post);
        }
        state.posts.push(response.post);
        return {
            ...state,
            loading: false,
            error: response.error
        };
    case REMOVE_POST_SUCCESS:
        state.posts = state.boards.filter(board => board._id !== action.board);
        state.boards = state.boards.map(board => {
            board.posts = board.posts.filter(post => post._id !== action.post);
            return board;
        });
        return { ...state, loading: false };
    case POST_ERROR:
        return { ...state, error: action.err, loading: false };
    default:
        return state;
    }
};
