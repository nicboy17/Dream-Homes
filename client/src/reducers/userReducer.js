import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from '../actions/types';

const initialState = {
    authenticated: false,
    boards: [{title:'1', _id: '1234'},{title:'2', _id:'567'},{title:'3', _id: '8910'}]
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