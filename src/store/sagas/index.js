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
} from '../actions/authActionTypes';
import {
  CREATE_EXAM,
  ADD_EXAM_STUDENT,
  ADD_EXAM_QUESTION,
} from '../actions/createExamActionTypes';

function* watchAuth() {
  yield takeEvery(AUTH_LOGIN_EXISTING_USER, authLoginExistingUserSaga);
  yield takeEvery(AUTH_SIGNUP, authSignupSaga);
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_GET_USER, authGetUserSaga);
  yield takeEvery(AUTH_GET_USER_EXAMS, authGetUserExamsSaga);
  yield takeEvery(AUTH_LOGOUT, authLogoutSaga);
}

function* watchCreateExam() {
  yield takeEvery(CREATE_EXAM);
  yield takeEvery(ADD_EXAM_STUDENT);
  yield takeEvery(ADD_EXAM_QUESTION);
}

export { watchAuth, watchCreateExam };
