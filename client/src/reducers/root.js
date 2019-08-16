import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './post';
import ProfileStore from './profileReducer';
import posts from './postFetch';

const root = combineReducers({
    UserStore,
    PostStore,
    ProfileStore,
    posts
});
export default root;
