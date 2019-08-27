import { FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, FETCHING_POSTS } from '../../actions/types';
import banna from '../../assets/posts/banana.jpg';
import interior from '../../assets/posts/interiour.jpg';
import live from '../../assets/posts/live.jpg';
import livingroom from '../../assets/posts/livingroom.jpg';
import plant1 from '../../assets/posts/plant1.jpg';
import plant2 from '../../assets/posts/plant2.jpg';
import plant3 from '../../assets/posts/plant3.jpg';
import plant4 from '../../assets/posts/plant4.jpg';

const INITIAL_STATE = {
    posts: [],
    morePosts: [{ image: banna, title: 'Dreamy minimal interior' }, {
        image: interior,
        title: 'Banana Tree'
    }, { image: live, title: 'Ideas to fill your living room' }, {
        image: livingroom,
        title: 'amazing live plant decorations'
    }, { image: plant1, title: 'test' }, { image: plant2, title: 'test' }, {
        image: plant3,
        title: 'test'
    }, { image: plant4, title: 'test' }],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
    case FETCHING_POSTS:
        return { ...state, loading: true };
    case FETCH_POSTS_SUCCESS:
        return { ...state, loading: false, posts: payload };
    case FETCH_POSTS_FAIL:
        return { ...state, loading: false };
    default:
        return state;
    }
};
