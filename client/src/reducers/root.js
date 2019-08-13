import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './post';
import posts from './postFetch';

const root = combineReducers({
    UserStore,
    PostStore,
    posts
});
export default root;
