import {
    ADD_FAVOURITE_ERROR,
    ADD_FAVOURITE_SUCCESS,
    REMOVE_FAVOURITE_ERROR,
    REMOVE_FAVOURITE_SUCCESS
} from '../../actions/types';

export default (state = {}, action) => {
    const { type } = action;
    switch (type) {
    case ADD_FAVOURITE_SUCCESS:
        state.push(action.post);
        return { ...state };
    case REMOVE_FAVOURITE_SUCCESS:
        state = state.filter(post => post !== action.post);
        return { ...state };
    case REMOVE_FAVOURITE_ERROR:
    case ADD_FAVOURITE_ERROR:
        return { ...state, err: action.err };
    default:
        return state;
    }
};
