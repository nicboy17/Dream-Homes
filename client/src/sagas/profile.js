import { put, takeLatest, call } from 'redux-saga/effects';
import {
    GET_USER_BOARDS_POSTS,
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    FOLLOW_SUCCESS,
    FOLLOW_ERROR,
    FOLLOW, UNFOLLOW_SUCCESS, UNFOLLOW_ERROR, UNFOLLOW
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
        yield put({ type: FOLLOW_SUCCESS, payload: request.followee });
    } catch (err) {
        yield put({ type: FOLLOW_ERROR, payload: 'could not follow user' });
    }
}

export function * followSaga () {
    yield takeLatest(FOLLOW, follow);
}

function * unFollow (request) {
    try {
        yield call(profileService.unfollow, request);
        yield put({ type: UNFOLLOW_SUCCESS, payload: request.followee });
    } catch (err) {
        yield put({ type: UNFOLLOW_ERROR, payload: 'could not unfollow user' });
    }
}

export function * unFollowSaga () {
    yield takeLatest(UNFOLLOW, unFollow);
}
