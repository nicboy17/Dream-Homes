import {
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    CLEAR_ERROR,
    FOLLOW_SUCCESS,
    UNFOLLOW_SUCCESS, PROFILE_TAB_CHANGE
} from '../../actions/types';

export default (state = {}, action) => {
    const { type, response } = action;
    switch (type) {
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return { ...state, ...response };
    case PROFILE_TAB_CHANGE:
        return { ...state, tab: action.tab };
    case FOLLOW_SUCCESS:
        state.user.followers += 1;
        state.user.isFollowing = true;
        return { ...state, loading: false, error: '' };
    case UNFOLLOW_SUCCESS:
        state.user.followers -= 1;
        state.user.isFollowing = false;
        return { ...state, loading: false, error: '' };
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: action.err };
    case CLEAR_ERROR:
        return { ...state, error: {} };
    default:
        return state;
    }
};
