import { call, put, takeEvery } from '@redux-saga/core/effects';
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
    REMOVE_BOARD_SUCCESS, OPEN_SNACKBAR, START_LOADING, STOP_LOADING
} from '../actions/types';
import { boardService } from '../services/board';
import { confirmSaga } from './confirm';
import { open } from '../actions/snackbar';

function * addBoard (request) {
    try {
        yield put({ type: START_LOADING });
        const response = yield call(boardService.addBoard, request);
        yield put({ type: STOP_LOADING });
        yield put({ type: OPEN_SNACKBAR, message: 'Board Addition Success', variant: 'success', duration: 1250 });
        yield put({ type: ADD_BOARD_SUCCESS, response });
    } catch (err) {
        console.log(err);
        yield put({ type: OPEN_SNACKBAR, message: 'Board Addition Failed', variant: 'error', duration: 1500 });
        yield put({ type: BOARD_ERROR, err });
    }
}

export function * addBoardSaga () {
    yield takeEvery(ADD_BOARD, addBoard);
}

function * addPost (request) {
    try {
        const response = yield call(boardService.addPost, request);
        yield put({ type: OPEN_SNACKBAR, message: 'Post Added to Board', variant: 'success', duration: 1250 });
        yield put({ type: ADD_BOARD_POST_SUCCESS, response });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'Post Addition Failed', variant: 'error', duration: 1500 });
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
        yield put(open({ message: 'Removed post from board', variant: 'success', duration: 1250 }));
        yield put({ type: REMOVE_BOARD_POST_SUCCESS, board: request.board, post: request.post });
    } catch (err) {
        yield put(open({ message: 'Error: could not remove post from board', variant: 'error', duration: 1500 }));
        yield put({ type: BOARD_ERROR, err });
    }
}

export function * removePostSaga () {
    yield takeEvery(REMOVE_BOARD_POST, removePost);
}

function * removeBoard (request) {
    const confirmed = yield call(confirmSaga, {
        title: 'Delete Board',
        message: 'Are you sure you want to delete this board?'
    });
    if (!confirmed) { return; }

    try {
        yield call(boardService.removeBoard, request);
        yield put(open({ message: 'Board Deleted', variant: 'success', duration: 1250 }));
        yield put({ type: REMOVE_BOARD_SUCCESS, board: request.board });
    } catch (err) {
        console.log(err);
        yield put(open({ message: 'Board Deletion Failed', variant: 'error', duration: 1500 }));
        yield put({ type: BOARD_ERROR, err });
    }
}

export function * removeBoardSaga () {
    yield takeEvery(REMOVE_BOARD, removeBoard);
}
