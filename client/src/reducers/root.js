import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './posts/post';
import ProfileStore from './profile';
import ConfirmStore from './confirm';
import SnackBarStore from './snackbar';

const root = combineReducers({
    UserStore,
    PostStore,
    ProfileStore,
    ConfirmStore,
    SnackBarStore
});
export default root;
