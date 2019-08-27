import axios from 'axios';

export const createFormData = (obj) => {
    const formData = new FormData();
    for (const key of Object.keys(obj)) {
        formData.append(key, obj[key]);
    }
    return formData;
};

export const addTokenHeaders = (token) => {
    axios.defaults.headers.common['access-token'] = token;
};

export const Get = url => {
    return axios.get(url).then(res => {
        return res.data;
    }).catch(err => {
        throw err.response;
    });
};

export const Post = (url, body) => {
    return axios.post(url, body).then(res => {
        return res.data;
    }).catch(err => {
        throw err.response;
    });
};

export const Put = (url, body) => {
    return axios.put(url, body).then(res => {
        return res.data;
    }).catch(err => {
        throw err.response;
    });
};

export const Delete = (url, body) => {
    return axios.delete(url, body).then(res => {
        return res.data;
    }).catch(err => {
        throw err.response;
    });
};

export { axios };
