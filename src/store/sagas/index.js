import { takeEvery } from 'redux-saga/effects';
import {
  authLoginExistingUserSaga,
  authSignupSaga,
  authLoginSaga,
  authGetUserSaga,
  authGetUserExamsSaga,
  authLogoutSaga,
} from './auth';
import {
  AUTH_LOGIN_EXISTING_USER,
  AUTH_SIGNUP,
  AUTH_LOGIN,
  AUTH_GET_USER,
  AUTH_GET_USER_EXAMS,
  AUTH_LOGOUT,
} from '../actions/actionTypes';

function* watchAuth() {
  yield takeEvery(AUTH_LOGIN_EXISTING_USER, authLoginExistingUserSaga);
  yield takeEvery(AUTH_SIGNUP, authSignupSaga);
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_GET_USER, authGetUserSaga);
  yield takeEvery(AUTH_GET_USER_EXAMS, authGetUserExamsSaga);
  yield takeEvery(AUTH_LOGOUT, authLogoutSaga);
}

export { watchAuth };
