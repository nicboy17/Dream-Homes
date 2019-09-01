import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './posts/post';
import ProfileStore from './profile';
import ConfirmStore from './confirmStore';

const root = combineReducers({
    UserStore,
    PostStore,
    ProfileStore,
    ConfirmStore
});
export default root;
