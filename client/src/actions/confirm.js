import {
    OPEN_CONFIRM,
    CLOSE_CONFIRM,
    CONFIRM_YES,
    CONFIRM_NO
} from './types';

export const open = (title, message) => ({
    type: OPEN_CONFIRM,
    title,
    message
});

export const close = () => ({
    type: CLOSE_CONFIRM
});

export const yes = () => ({
    type: CONFIRM_YES
});

export const no = () => ({
    type: CONFIRM_NO
});
