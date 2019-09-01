import { put, takeLatest, call } from 'redux-saga/effects';
import {
    GET_USER_BOARDS_POSTS,
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    FOLLOW_SUCCESS,
    FOLLOW_ERROR,
    FOLLOW, UNFOLLOW_SUCCESS, UNFOLLOW_ERROR, UNFOLLOW, OPEN_SNACKBAR
} from '../actions/types';
import { profileService } from '../services/profile';

function * getBoardsandPosts (request) {
    try {
        const response = yield call(profileService.getBoardsandPosts, { ...request });
        yield put({ type: GET_USER_BOARDS_POSTS_SUCCESS, response });
    } catch (err) {
        yield put({ type: GET_USER_BOARDS_POSTS_ERROR });
    }
}

export function * getBoardsPostsSaga () {
    yield takeLatest(GET_USER_BOARDS_POSTS, getBoardsandPosts);
}

function * follow (request) {
    try {
        yield call(profileService.follow, request);
        yield put({ type: OPEN_SNACKBAR, message: 'Success: Following', variant: 'success', duration: 1250 });
        yield put({ type: FOLLOW_SUCCESS, payload: request.followee });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'Error: could not follow', variant: 'error', duration: 1500 });
        yield put({ type: FOLLOW_ERROR, err });
    }
}

export function * followSaga () {
    yield takeLatest(FOLLOW, follow);
}

function * unFollow (request) {
    try {
        yield call(profileService.unfollow, request);
        yield put({ type: OPEN_SNACKBAR, message: 'Success: unFollowed', variant: 'success', duration: 1250 });
        yield put({ type: UNFOLLOW_SUCCESS, payload: request.followee });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'Error: could not follow', variant: 'error', duration: 1500 });
        yield put({ type: UNFOLLOW_ERROR, err });
    }
}

export function * unFollowSaga () {
    yield takeLatest(UNFOLLOW, unFollow);
}
