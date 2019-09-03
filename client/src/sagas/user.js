import { put, takeLatest, call } from 'redux-saga/effects';
import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REGISTER,
    EDIT_USER,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    GET_TOKEN,
    GET_TOKEN_SUCCESS,
    LOGOUT,
    LOGOUT_SUCCESS,
    GET_FOLLOWERS,
    GET_FOLLOWING,
    GET_FOLLOWING_SUCCESS,
    GET_FOLLOWING_ERROR,
    GET_FOLLOWERS_SUCCESS,
    GET_FOLLOWERS_ERROR,
    SAVE_INTERESTS,
    SAVE_INTERESTS_SUCCESS,
    SAVE_INTERESTS_ERROR,
    ADD_FAVOURITE,
    ADD_FAVOURITE_SUCCESS,
    ADD_FAVOURITE_ERROR,
    REMOVE_FAVOURITE,
    REMOVE_FAVOURITE_SUCCESS, REMOVE_FAVOURITE_ERROR, OPEN_SNACKBAR, START_LOADING, STOP_LOADING
} from '../actions/types';
import { userService } from '../services/user';

function * register (request) {
    try {
        const response = yield call(userService.register, request.user);
        yield put({ type: LOGIN_SUCCESS, response });
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error });
    }
}

export function * registerSaga () {
    yield takeLatest(REGISTER, register);
}

function * login (request) {
    try {
        const response = yield call(userService.login, request.user);
        yield put({ type: OPEN_SNACKBAR, message: 'Authentication success', variant: 'success', duration: 1250 });
        yield put({ type: LOGIN_SUCCESS, response });
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error });
        yield put({ type: OPEN_SNACKBAR, message: 'Authentication failed', variant: 'error', duration: 1500 });
    }
}

export function * loginSaga () {
    yield takeLatest(LOGIN, login);
}

function * edit (request) {
    try {
        yield put({ type: START_LOADING });
        const response = yield call(userService.edit, request.user);
        yield put({ type: OPEN_SNACKBAR, message: 'User updated', variant: 'success', duration: 1250 });
        yield put({ type: EDIT_USER_SUCCESS, response });
    } catch (error) {
        yield put({ type: OPEN_SNACKBAR, message: 'User could not be updated', variant: 'error', duration: 1500 });
        yield put({ type: EDIT_USER_ERROR, error });
    }
    yield put({ type: STOP_LOADING });
}

export function * editSaga () {
    yield takeLatest(EDIT_USER, edit);
}

function * logout () {
    yield call(userService.logout);
    yield put({ type: LOGOUT_SUCCESS });
}

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
        yield put({ type: OPEN_SNACKBAR, message: 'User Interests Saved', variant: 'success', duration: 1250 });
        yield put({ type: SAVE_INTERESTS_SUCCESS, user: response.user });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'User Interests could not saved', variant: 'error', duration: 1500 });
        yield put({ type: SAVE_INTERESTS_ERROR, err });
    }
}

export function * saveInterestsSaga () {
    yield takeLatest(SAVE_INTERESTS, saveInterests);
}

function * favouritePost (request) {
    try {
        yield call(userService.favouritePost, request);
        yield put({ type: OPEN_SNACKBAR, message: 'Saved to Favourites', variant: 'success', duration: 1250 });
        yield put({ type: ADD_FAVOURITE_SUCCESS, post: request.post });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'Error: could not save', variant: 'error', duration: 1500 });
        yield put({ type: ADD_FAVOURITE_ERROR, err });
    }
}

export function * favouritePostSaga () {
    yield takeLatest(ADD_FAVOURITE, favouritePost);
}

function * unFavouritePost (request) {
    try {
        yield call(userService.unFavouritePost, request);
        yield put({ type: OPEN_SNACKBAR, message: 'Removed from Favourites', variant: 'success', duration: 1250 });
        yield put({ type: REMOVE_FAVOURITE_SUCCESS, post: request.post });
    } catch (err) {
        yield put({ type: OPEN_SNACKBAR, message: 'Error: could not save', variant: 'error', duration: 1500 });
        yield put({ type: REMOVE_FAVOURITE_ERROR, err });
    }
}

export function * unFavouritePostSaga () {
    yield takeLatest(REMOVE_FAVOURITE, unFavouritePost);
}

function * getFollowing (request) {
    try {
        const response = yield call(userService.getFollowing, request);
        yield put({ type: GET_FOLLOWING_SUCCESS, following: response.following });
    } catch (err) {
        yield put({ type: GET_FOLLOWING_ERROR, err });
    }
}

export function * getFollowingSaga () {
    yield takeLatest(GET_FOLLOWING, getFollowing);
}

function * getFollowers (request) {
    try {
        const response = yield call(userService.getFollowers, request);
        yield put({ type: GET_FOLLOWERS_SUCCESS, followers: response.followers });
    } catch (err) {
        yield put({ type: GET_FOLLOWERS_ERROR, err });
    }
}

export function * getFollowersSaga () {
    yield takeLatest(GET_FOLLOWERS, getFollowers);
}
