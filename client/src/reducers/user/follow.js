import {
    FOLLOW_SUCCESS,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_ERROR,
    FOLLOW_ERROR
} from '../../actions/types';

export default (state = {}, action) => {
    const { type } = action;

    switch (type) {
    case FOLLOW_SUCCESS:
        if (state.following) {
            state.following.push(action.payload);
        }
        state.user.following += 1;
        return {
            ...state,
            loading: false,
            error: ''
        };
    case UNFOLLOW_SUCCESS:
        if (state.following) {
            state.following = state.following.filter(followee => followee._id !== action.payload);
        }
        state.user.following -= 1;
        return {
            ...state,
            loading: false,
            error: action.payload
        };
    case FOLLOW_ERROR:
    case UNFOLLOW_ERROR:
        return { ...state, error: action.error };
    default:
        return state;
    }
};
