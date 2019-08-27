import { put, takeLatest, call } from 'redux-saga/effects';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    GET_TOKEN,
    GET_TOKEN_SUCCESS,
    LOGOUT,
    LOGOUT_SUCCESS,
    FETCH_FOLLOWERS,
    FETCH_FOLLOWING,
    FETCH_FOLLOWING_SUCCESS,
    FETCH_FOLLOWING_ERROR,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_ERROR,
    SAVE_INTERESTS,
    SAVE_INTERESTS_SUCCESS,
    SAVE_INTERESTS_ERROR,
    ADD_FAVOURITE,
    ADD_FAVOURITE_SUCCESS,
    ADD_FAVOURITE_ERROR,
    REMOVE_FAVOURITE,
    REMOVE_FAVOURITE_SUCCESS, REMOVE_FAVOURITE_ERROR
} from '../actions/types';
import { userService } from '../services/user';

/*
call user service login
call redux with put
 */
function * login (request) {
    try {
        const response = yield call(userService.login, request.user);
        yield put({ type: LOGIN_SUCCESS, response });
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error });
    }
}

// listen for 'LOGIN' action -> call login*
export function * loginSaga () {
    yield takeLatest(LOGIN, login);
}

function * logout () {
    yield call(userService.logout);
    yield put({ type: LOGOUT_SUCCESS });
}

// listen for 'LOGIN' action -> call login*
export function * logoutSaga () {
    yield takeLatest(LOGOUT, logout);
}

function * getToken () {
    const token = yield call(userService.getToken);
    if (token) {
        const user = yield call(userService.getUser);
        yield put({ type: GET_TOKEN_SUCCESS, token, user });
    } else {
        yield logout();
    }
}

export function * getTokenSaga () {
    yield takeLatest(GET_TOKEN, getToken);
}

function * saveInterests (request) {
    try {
        const response = yield call(userService.saveInterests, request);
        yield put({ type: SAVE_INTERESTS_SUCCESS, user: response });
    } catch (err) {
        yield put({ type: SAVE_INTERESTS_ERROR, err });
    }
}

export function * saveInterestsSaga () {
    yield takeLatest(SAVE_INTERESTS, saveInterests);
}

function * favouritePost (request) {
    try {
        yield call(userService.favouritePost, request);
        yield put({ type: ADD_FAVOURITE_SUCCESS, post: request.post });
    } catch (err) {
        yield put({ type: ADD_FAVOURITE_ERROR, err });
    }
}

export function * favouritePostSaga () {
    yield takeLatest(ADD_FAVOURITE, favouritePost);
}

function * unFavouritePost (request) {
    try {
        yield call(userService.unFavouritePost, request);
        yield put({ type: REMOVE_FAVOURITE_SUCCESS, post: request.post });
    } catch (err) {
        yield put({ type: REMOVE_FAVOURITE_ERROR, err });
    }
}

export function * unFavouritePostSaga () {
    yield takeLatest(REMOVE_FAVOURITE, unFavouritePost);
}

function * getFollowing (request) {
    try {
        const response = yield call(userService.getFollowing, request);
        yield put({ type: FETCH_FOLLOWING_SUCCESS, following: response.following });
    } catch (err) {
        yield put({ type: FETCH_FOLLOWING_ERROR, err });
    }
}

export function * getFollowingSaga () {
    yield takeLatest(FETCH_FOLLOWING, getFollowing);
}

function * getFollowers (request) {
    try {
        const response = yield call(userService.getFollowers, request);
        yield put({ type: FETCH_FOLLOWERS_SUCCESS, followers: response.followers });
    } catch (err) {
        yield put({ type: FETCH_FOLLOWERS_ERROR, err });
    }
}

export function * getFollowersSaga () {
    yield takeLatest(FETCH_FOLLOWERS, getFollowers);
}
