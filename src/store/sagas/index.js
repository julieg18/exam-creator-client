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
  createExamSaga,
  getExamSaga,
  getUserExamsSaga,
  deleteExamSaga,
  editExamSaga,
} from './exam';
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
  GET_EXAM,
  GET_USER_EXAMS,
  DELETE_EXAM,
  EDIT_EXAM,
} from '../actions/examActionTypes';

function* watchAuth() {
  yield takeEvery(AUTH_LOGIN_EXISTING_USER, authLoginExistingUserSaga);
  yield takeEvery(AUTH_SIGNUP, authSignupSaga);
  yield takeEvery(AUTH_LOGIN, authLoginSaga);
  yield takeEvery(AUTH_GET_USER, authGetUserSaga);
  yield takeEvery(AUTH_GET_USER_EXAMS, authGetUserExamsSaga);
  yield takeEvery(AUTH_LOGOUT, authLogoutSaga);
}

function* watchExam() {
  yield takeEvery(CREATE_EXAM, createExamSaga);
  yield takeEvery(GET_EXAM, getExamSaga);
  yield takeEvery(GET_USER_EXAMS, getUserExamsSaga);
  yield takeEvery(DELETE_EXAM, deleteExamSaga);
  yield takeEvery(EDIT_EXAM, editExamSaga);
}

export { watchAuth, watchExam };
