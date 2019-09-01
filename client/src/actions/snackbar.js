import {
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR
} from './types';

export const open = (message, variant, duration) => ({
    type: OPEN_SNACKBAR,
    message,
    variant,
    duration
});

export const close = () => ({
    type: CLOSE_SNACKBAR
});
