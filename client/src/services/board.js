import axios from 'axios';

export const boardService = {
    addBoard: ({ board, username }) => {
        return axios.post('/users/' + username + '/board', board).then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data;
        });
    },
    addPost: ({ board, post }) => {
        return axios.put('/users/board/' + board, { post }).then(res => {
            return res.data;
        }).catch(err => {
            throw err.response.data;
        });
    }
};
