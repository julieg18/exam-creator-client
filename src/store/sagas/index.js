import { takeEvery } from 'redux-saga/effects';
import { authSignupSaga, authLoginSaga } from './auth';
import { AUTH_SIGNUP, AUTH_LOGIN } from '../actions/actionTypes';

function* watchAuth() {
  yield takeEvery(AUTH_SIGNUP, authSignupSaga);
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
}

export { watchAuth };
