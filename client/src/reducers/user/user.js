import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR,
    GET_TOKEN_SUCCESS,
    SAVE_INTERESTS_SUCCESS,
    SAVE_INTERESTS_ERROR,
    CLEAR_ERROR,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR
} from '../../actions/types';

const initialState = {
    authenticated: false
};

export default (state = initialState, action) => {
    const { type, response } = action;

    switch (type) {
    case LOGIN_SUCCESS:
        return { authenticated: true, user: { ...response.user, takeQuiz: !response.user.interests.length }, token: response.token };
    case LOGIN_ERROR:
        return { ...state, authenticated: false, error: action.error };
    case LOGOUT_SUCCESS:
        return { authenticated: false };
    case SAVE_INTERESTS_SUCCESS:
        state.user.interests = action.user.interests;
        state.user.takeQuiz = false;
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    case EDIT_USER_SUCCESS:
        return { ...state, user: { ...state.user, profile: response.user.profile, name: response.user.name } };
    case EDIT_USER_ERROR:
        return { ...state, error: action.error };
    case SAVE_INTERESTS_ERROR:
        return { ...state, error: action.error };
    case CLEAR_ERROR:
        return { ...state, error: {} };
    default:
        return state;
    }
};
