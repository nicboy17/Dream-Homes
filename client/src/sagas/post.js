import { call, put, takeEvery } from '@redux-saga/core/effects';
import { ADD_POST, ADD_POST_ERROR, ADD_POST_SUCCESS } from '../actions/types';
import { postService } from '../services/post';

function * addPost (request) {
    try {
        const response = yield call(postService.addPost, { ...request });
        yield put({ type: ADD_POST_SUCCESS, response });
    } catch (err) {
        yield put({ type: ADD_POST_ERROR, err });
    }
}

export function * addPostSaga () {
    yield takeEvery(ADD_POST, addPost);
}
