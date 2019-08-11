import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './post';

const root = combineReducers({
    UserStore,
    PostStore
});
export default root;
