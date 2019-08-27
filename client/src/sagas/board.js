import { call, put, takeEvery } from '@redux-saga/core/effects';
import {
    ADD_BOARD,
    ADD_BOARD_ERROR,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_POST,
    ADD_BOARD_POST_SUCCESS,
    ADD_BOARD_POST_ERROR,
    GET_BOARD_POSTS,
    GET_BOARD_POSTS_SUCCESS,
    GET_BOARD_POSTS_ERROR
} from '../actions/types';
import { boardService } from '../services/board';

function * addBoard (request) {
    try {
        const response = yield call(boardService.addBoard, request);
        yield put({ type: ADD_BOARD_SUCCESS, response });
    } catch (err) {
        yield put({ type: ADD_BOARD_ERROR, err });
    }
}

export function * addBoardSaga () {
    yield takeEvery(ADD_BOARD, addBoard);
}

function * addPost (request) {
    try {
        const response = yield call(boardService.addPost, request);
        yield put({ type: ADD_BOARD_POST_SUCCESS, response });
    } catch (err) {
        yield put({ type: ADD_BOARD_POST_ERROR, err });
    }
}

export function * addPostSaga () {
    yield takeEvery(ADD_BOARD_POST, addPost);
}

function * getBoardPosts (request) {
    try {
        const response = yield call(boardService.getPosts, request);
        yield put({ type: GET_BOARD_POSTS_SUCCESS, response });
    } catch (err) {
        yield put({ type: GET_BOARD_POSTS_ERROR, err });
    }
}

export function * getBoardPostsSaga () {
    yield takeEvery(GET_BOARD_POSTS, getBoardPosts);
}
