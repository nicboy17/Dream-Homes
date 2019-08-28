import { axios, createFormData, addTokenHeaders, Put, Get, Post } from './utils';

const signin = (data) => {
    if (!data.user.profile) {
        data.user.profile = 'https://team-pineapple.s3.ca-central-1.amazonaws.com/placeholder.jpg';
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    addTokenHeaders(data.token);

    return data;
};

export const userService = {
    register: (user) => {
        return axios.post('/users/register', user).then(res => {
            return signin(res.data);
        }).catch(err => {
            throw err.response.data;
        });
    },
    login: (user) => {
        return axios.post('/users/login', user).then(res => {
            return signin(res.data);
        }).catch(err => {
            throw err.response.data;
        });
    },
    edit: (user) => {
        const formData = createFormData(user);
        return axios({
            url: `/users/${user.username}`,
            method: 'PUT',
            data: formData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user));
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
