import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import {
    ADD_BOARD,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_POST,
    ADD_BOARD_POST_SUCCESS,
    GET_BOARD_POSTS,
    GET_BOARD_POSTS_SUCCESS,
    REMOVE_BOARD_POST,
    REMOVE_BOARD_POST_SUCCESS,
    BOARD_ERROR, REMOVE_BOARD,
    REMOVE_BOARD_SUCCESS
} from '../actions/types';
import { boardService } from '../services/board';
import { confirmSaga } from './confirm';

function * addBoard (request) {
    try {
        const response = yield call(boardService.addBoard, request);
        yield put({ type: ADD_BOARD_SUCCESS, response });
    } catch (err) {
        yield put({ type: BOARD_ERROR, err });
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
        yield put({ type: BOARD_ERROR, err });
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
        yield put({ type: BOARD_ERROR, err });
    }
}

export function * getBoardPostsSaga () {
    yield takeEvery(GET_BOARD_POSTS, getBoardPosts);
}

function * removePost (request) {
    const confirmed = yield call(confirmSaga, {
        title: 'Remove Post from Board',
        message: 'Are you sure you want to remove this post?'
    });
    if (!confirmed) { return; }

    try {
        yield call(boardService.removePost, request);
        yield put({ type: REMOVE_BOARD_POST_SUCCESS, ...request });
    } catch (err) {
        yield put({ type: BOARD_ERROR, err });
    }
}

export function * removePostSaga () {
    yield takeLatest(REMOVE_BOARD_POST, removePost);
}

function * removeBoard (request) {
    const confirmed = yield call(confirmSaga, {
        title: 'Delete Board',
        message: 'Are you sure you want to delete this board?'
    });
    if (!confirmed) { return; }

    try {
        yield call(boardService.removeBoard, request);
        yield put({ type: REMOVE_BOARD_SUCCESS, board: request.board });
    } catch (err) {
        yield put({ type: BOARD_ERROR, err });
    }
}

export function * removeBoardSaga () {
    yield takeEvery(REMOVE_BOARD, removeBoard);
}
