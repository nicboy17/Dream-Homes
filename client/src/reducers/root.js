import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './post';
import ProfileStore from './profileReducer';

const root = combineReducers({
    UserStore,
    PostStore,
    ProfileStore
});
export default root;
