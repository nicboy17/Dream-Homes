import { LOGIN } from '../actions/types';

export const login = (user) => ({
    type: LOGIN,
    user
});
