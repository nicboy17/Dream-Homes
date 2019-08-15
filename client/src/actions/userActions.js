import {
    GET_TOKEN,
    LOGIN,
    LOGIN_RESPONSE,
    LOGOUT
} from '../actions/types';

export const login = user => ({
    type: LOGIN,
    user
});

export const loginResponse = () => ({
    type: LOGIN_RESPONSE
});

export const logout = () => ({
    type: LOGOUT
});

export const getToken = () => ({
    type: GET_TOKEN
});
