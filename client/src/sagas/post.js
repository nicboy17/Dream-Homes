import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import {
    ADD_POST,
    ADD_POST_ERROR,
    ADD_POST_SUCCESS,
    SEARCH_POSTS,
    SEARCH_POSTS_SUCCESS,
    SEARCH_POSTS_ERROR, REMOVE_POST, REMOVE_POST_SUCCESS, POST_ERROR
} from '../actions/types';
import { postService } from '../services/post';

function * addPost (request) {
    try {
        const response = yield call(postService.addPost, request);
        yield put({ type: ADD_POST_SUCCESS, response });
    } catch (err) {
        yield put({ type: ADD_POST_ERROR, err });
    }
}

export function * addPostSaga () {
    yield takeEvery(ADD_POST, addPost);
}

function * searchPosts (request) {
    try {
        const response = yield call(postService.searchPosts, request);
        yield put({ type: SEARCH_POSTS_SUCCESS, payload: response });
    } catch (err) {
        yield put({ type: SEARCH_POSTS_ERROR, err });
    }
}

export function * searchPostSaga () {
    yield takeLatest(SEARCH_POSTS, searchPosts);
}

function * removePost (request) {
    try {
        const response = yield call(postService.removePost, request);
        yield put({ type: REMOVE_POST_SUCCESS, response });
    } catch (err) {
        yield put({ type: POST_ERROR, err });
    }
}

export function * removePostSaga () {
    yield takeEvery(REMOVE_POST, removePost);
}
