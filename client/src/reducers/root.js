import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './posts/post';
import ProfileStore from './profile';

const root = combineReducers({
    UserStore,
    PostStore,
    ProfileStore
});
export default root;
