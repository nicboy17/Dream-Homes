import boards from './board';
import favourites from './favourite';
import posts from './post';
import profile from './profile';

const initialState = {
    boards: {},
    favourites: {},
    posts: {},
    profile: {}
};

export default (state = initialState, action) => {
    return {
        ...boards(state, action),
        favourites: favourites(state.favourites, action),
        posts: posts(state.posts, action),
        ...profile(state, action)
    };
};
