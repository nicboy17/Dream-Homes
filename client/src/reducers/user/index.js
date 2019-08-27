import boards from '../user/board';
import favourites from '../user/favourite';
import follow from './follow';
import user from './user';

export default (state = {}, action) => {
    return {
        ...boards(state, action),
        ...favourites(state, action),
        ...follow(state, action),
        ...user(state, action)
    };
};
