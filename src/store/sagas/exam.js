import { put } from 'redux-saga/effects';
import clonedeep from 'lodash.clonedeep';
import {
  createExamStart,
  createExamFail,
  createExamSuccess,
  getExamStart,
  getExamFail,
  getExamSuccess,
  getUserExamsStart,
  getUserExamsFail,
  getUserExamsSuccess,
  deleteExamStart,
  deleteExamSuccess,
  deleteExamFail,
} from '../actions/index';

function* createExamSaga(action) {
  try {
    yield put(createExamStart());
    const createdExam = clonedeep(action.exam);

    const userRes = yield fetch('/api/v1/users');
    const parsedUserRes = yield userRes.json();
    if (!userRes.ok) {
      throw Error(parsedUserRes.error);
    }
    createdExam.creator = parsedUserRes.user._id;

    const res = yield fetch('/api/v1/exams', {
      method: 'POST',
      body: JSON.stringify(createdExam),
      headers: { 'Content-Type': 'application/json' },
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(createExamSuccess());
  } catch (err) {
    yield put(createExamFail());
  }
}

function* getExamSaga(action) {
  try {
    yield put(getExamStart());
    const res = yield fetch(`/api/v1/exams/${action.examId}`);
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(getExamSuccess(parsedRes.exam));
  } catch (err) {
    yield put(getExamFail());
  }
}

function* getUserExamsSaga() {
  try {
    yield put(getUserExamsStart());
    const res = yield fetch('/api/v1/users/exams');
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(getUserExamsSuccess(parsedRes.exams));
  } catch (err) {
    yield put(getUserExamsFail());
  }
}

function* deleteExamSaga(action) {
  try {
    yield put(deleteExamStart());
    const res = yield fetch(`/api/v1/exams/${action.examId}`, {
      method: 'DELETE',
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(deleteExamSuccess(action.examId));
  } catch (err) {
    console.log(err);
    yield put(deleteExamFail());
  }
}

export { createExamSaga, getExamSaga, getUserExamsSaga, deleteExamSaga };
