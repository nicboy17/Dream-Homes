import { LOGIN } from '../actions/types';

export const loginUser = (user) => ({
    type: LOGIN,
    user
});