import { combineReducers } from 'redux';
import UserStore from './user';
import PostStore from './posts/post';
import ProfileStore from './profile';
import ConfirmStore from './components/confirm';
import SnackBarStore from './components/snackbar';
import LoadingStore from './components/loading';

const root = combineReducers({
    UserStore,
    PostStore,
    ProfileStore,
    ConfirmStore,
    SnackBarStore,
    LoadingStore
});
export default root;
