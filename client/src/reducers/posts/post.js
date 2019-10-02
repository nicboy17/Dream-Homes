import { SEARCH_POSTS, SEARCH_POSTS_SUCCESS, SEARCH_POSTS_ERROR, MORE_POSTS, MORE_POSTS_SUCCESS, MORE_POSTS_ERROR } from '../../actions/types';

const INITIAL_STATE = {
    posts: [],
    morePosts: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload } = action;
    switch (type) {
    case MORE_POSTS:
    case SEARCH_POSTS:
        return { ...state, loading: true };
    case SEARCH_POSTS_SUCCESS:
        return { ...state, loading: false, posts: payload.posts };
    case MORE_POSTS_SUCCESS:
        console.log(payload.posts);
        return { ...state, loading: false, morePosts: payload.posts };
    case MORE_POSTS_ERROR:
    case SEARCH_POSTS_ERROR:
        return { ...state, loading: false };
    default:
        return state;
    }
};
