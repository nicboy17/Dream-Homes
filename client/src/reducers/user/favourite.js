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
        state.user.favourites.push(action.post);
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case REMOVE_FAVOURITE_SUCCESS:
        state.user.favourites = state.user.favourites.filter(post => post !== action.post);
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case REMOVE_FAVOURITE_ERROR:
    case ADD_FAVOURITE_ERROR:
        return { ...state, err: action.err };
    default:
        return state;
    }
};
