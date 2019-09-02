import {
    ADD_BOARD_SUCCESS, REMOVE_BOARD_SUCCESS
} from '../../actions/types';

const initialState = {
    board: {
        posts: []
    },
    loading: true
};

export default (state = initialState, action) => {
    const { type, response } = action;
    switch (type) {
    case ADD_BOARD_SUCCESS:
        state.user.boards.push(response.board);
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state, success: true };
    case REMOVE_BOARD_SUCCESS:
        state.user.boards = state.user.boards.filter(board => board._id !== action.board);
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state, success: true };
    default:
        return state;
    }
};
