import axios from 'axios';

export const userService = {
    login: (user) => {
        return axios.post('/users/login', user).then(res => {
            localStorage.setItem('token', res.data.token);
            return res.data;
        }).catch(err => {
            throw err;
        });
    },
    logout: () => {

    }
};
