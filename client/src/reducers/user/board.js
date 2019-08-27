import {
    ADD_BOARD_SUCCESS,
    ADD_BOARD_ERROR
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
        return { ...state };
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    default:
        return state;
    }
};
