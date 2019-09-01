import { take, put, race } from 'redux-saga/effects';
import { CONFIRM_YES, CONFIRM_NO } from '../actions/types';
import { open, close } from '../actions/confirm';

export function * confirmSaga ({ title, message }) {
    yield put(open(title, message));

    const { yes } = yield race({
        yes: take(CONFIRM_YES),
        no: take(CONFIRM_NO)
    });
    yield put(close());

    return !!yes;
}
