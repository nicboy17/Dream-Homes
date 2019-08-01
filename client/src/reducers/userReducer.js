import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from '../actions/types';

const initialState = {
    authenticated: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { ...state };
        case LOGIN_USER_ERROR:
            return { ...state };
        default:
            return state;
    }
};