import axios from 'axios';
import { createFormData } from './utils';

export const postService = {
    addPost: ({ post, username }) => {
        const formData = createFormData(post);
        return axios({
            url: '/users/' + username + '/posts',
            method: 'POST',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            return res.data;
        }).catch(err => {
            throw err;
        });
    }
};
