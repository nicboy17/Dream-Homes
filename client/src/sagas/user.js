import { put, takeLatest, call } from 'redux-saga/effects';
import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
    GET_TOKEN, GET_TOKEN_SUCCESS,
    GET_USER_BOARDS_POSTS, GET_USER_BOARDS_POSTS_SUCCESS, GET_USER_BOARDS_POSTS_ERROR,
    LOGOUT, LOGOUT_SUCCESS, REGISTER, EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_ERROR
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

function * edit (request) {
    try {
        const response = yield call(userService.edit, request.user);
        yield put({ type: EDIT_USER_SUCCESS, response });
    } catch (error) {
        yield put({ type: EDIT_USER_ERROR, error });
    }
}

// listen for 'LOGIN' action -> call login*
export function * editSaga () {
    yield takeLatest(EDIT_USER, edit);
}

function * logout (request) {
    yield call(userService.logout);
    yield put({ type: LOGOUT_SUCCESS });
}

// listen for 'LOGIN' action -> call login*
export function * logoutSaga () {
    yield takeLatest(LOGOUT, logout);
}

function * getToken (request) {
    const token = yield call(userService.getToken);
    if (token) {
        const user = yield call(userService.getUser);
        yield put({ type: GET_TOKEN_SUCCESS, token, user });
    } else {
        // TODO: logout
        yield call(userService.logout);
    }
}

export function * getTokenSaga () {
    yield takeLatest(GET_TOKEN, getToken);
}

function * getBoardsandPosts (request) {
    try {
        const response = yield call(userService.getBoardsandPosts, { ...request });
        yield put({ type: GET_USER_BOARDS_POSTS_SUCCESS, response });
    } catch (err) {
        yield put({ type: GET_USER_BOARDS_POSTS_ERROR });
    }
}

export function * getBoardsPostsSaga () {
    yield takeLatest(GET_USER_BOARDS_POSTS, getBoardsandPosts);
}
