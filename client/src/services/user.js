import axios from 'axios';

const addTokenHeaders = (token) => {
    axios.defaults.headers.common['access-token'] = token;
};

const signin = (user, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    addTokenHeaders(token);
};

export const userService = {
    register: (user) => {
        return axios.post('/users/register', user).then(res => {
            signin(res.data.user, res.data.token);
            return res.data;
        }).catch(err => {
            throw err.response.data;
        });
    },
    login: (user) => {
        return axios.post('/users/login', user).then(res => {
            signin(res.data.user, res.data.token);
            return res.data;
        }).catch(err => {
            throw err.response.data;
        });
    },
    getUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },
    logout: () => {
        localStorage.clear();
    },
    getToken: () => {
        const token = localStorage.getItem('token');

        if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const expireTime = JSON.parse(atob(base64));
            const timeStamp = Math.floor(Date.now() / 1000);

            if (expireTime.exp - timeStamp > 0) {
                addTokenHeaders(token);
                return token;
            }
        }

        return null;
    },
    getBoardsandPosts: ({ username }) => {
        return axios.get('/users/' + username).then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data;
        });
    }
};
