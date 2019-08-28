import {
    GET_USER_BOARDS_POSTS,
    CLEAR_ERROR,
    DELETE_FAIL,
    DELETE_SUCCESS
} from '../actions/types';
import axios from 'axios';

export const getBoardsandPosts = username => ({
    type: GET_USER_BOARDS_POSTS,
    username
});

export const clearError = () => ({
    type: CLEAR_ERROR
});

export const deleteItem = (item, id) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_ERROR
        });
        await axios.delete(`/${item}/${id}`);
        dispatch({
            type: DELETE_SUCCESS,
            payload: {
                item,
                id,
                error: { message: `Successfully deleted the ${item.slice(0, -1)}`, status: 'success' }
            }
        });
    } catch (err) {
        dispatch({
            type: DELETE_FAIL,
            payload: {
                error: {
                    message: `Something went wrong with deleting the ${item.slice(0, -1)}`,
                    status: 'error'
                }
            }
        });
    }
};
