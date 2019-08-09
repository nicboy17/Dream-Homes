import { combineReducers } from 'redux';
import UserStore from './userReducer';
import PostStore from './post';

const rootReducer = combineReducers({
    UserStore,
    PostStore
});
export default rootReducer;
