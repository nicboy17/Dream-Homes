import {
    OPEN_CONFIRM,
    CLOSE_CONFIRM
} from '../actions/types';

const initialState = { open: false };

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case OPEN_CONFIRM:
        return { open: true, ...action };
    case CLOSE_CONFIRM:
        return { open: false };
    default:
        return state;
    }
};
