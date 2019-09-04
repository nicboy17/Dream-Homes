import {
    GET_FOLLOWING_SUCCESS,
    GET_FOLLOWERS_SUCCESS
} from '../../actions/types';

export default (state = {}, action) => {
    const { type } = action;

    switch (type) {
    case GET_FOLLOWING_SUCCESS:
        return { ...state, following: action.following };
    case GET_FOLLOWERS_SUCCESS:
        return { ...state, followers: action.followers };
    default:
        return state;
    }
};
