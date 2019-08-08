import {
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR
} from '../actions/types';
import post_pic from '../assets/post_ex.png';
import banna from '../assets/banana.jpg';
import interior from '../assets/interiour.jpg';
import live from '../assets/live.jpg';
import livingroom from '../assets/livingroom.jpg';
import plant1 from '../assets/plant1.jpg';
import plant2 from '../assets/plant2.jpg';
import plant3 from '../assets/plant3.jpg';
import plant4 from '../assets/plant4.jpg';

const initialState = {
    posts:[{_id: 'test', image: post_pic, author: 'Delores Jones', title: 'Small background garden', description: 'A small garden doesn\'t mean you can\'t create a chic outdoor space', date: 'Published 20 July 2019'}],
    morePosts: [{image:banna, title: 'Dreamy minimal interior'}, {image:interior, title: 'Banana Tree'}, {image:live, title: 'Ideas to fill your living room'}, {image:livingroom, title: 'amazing live plant decorations'}, {image:plant1, title: 'test'}, {image:plant2, title: 'test'}, {image:plant3, title: 'test'}, {image:plant4, title: 'test'}]
};

export default (state = initialState, action) => {
    switch (action.type) {
    case GET_POSTS_SUCCESS:
        return { ...state };
    case GET_POSTS_ERROR:
        return { ...state };
    default:
        return state;
    }
};