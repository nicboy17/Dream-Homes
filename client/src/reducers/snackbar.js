import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR
} from '../actions/types';

const initialState = { open: false, message: '', variant: 'success', duration: 0 };

export default (state = initialState, action) => {
    const { type } = action;

    switch (type) {
    case OPEN_SNACKBAR:
        return { open: true, ...action };
    case CLOSE_SNACKBAR:
        return { ...state, open: false };
    default:
        return state;
    }
};
