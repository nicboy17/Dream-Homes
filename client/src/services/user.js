import { axios, addTokenHeaders, Put, Get, Post } from './utils';

export const userService = {
    login: (user) => {
        return axios.post('/users/login', user).then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            addTokenHeaders(res.data.token);
            return res.data;
        }).catch(err => {
            throw err;
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
    saveInterests: ({ username, interests }) => {
        return Put(`/users/${username}/interests`, { interests });
    },
    favouritePost: ({ username, post }) => {
        return Post(`/users/${username}/favourite`, { post });
    },
    unFavouritePost: ({ username, post }) => {
        return Post(`/users/${username}/unfavourite`, { post });
    },
    getFollowers: ({ user }) => {
        return Get(`/users/${user}/followers`);
    },
    getFollowing: ({ user }) => {
        return Get(`/users/${user}/following`);
    }
};
