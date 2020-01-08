import { put } from 'redux-saga/effects';
import clonedeep from 'lodash.clonedeep';
import {
  createExamStart,
  createExamFail,
  createExamSuccess,
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

export { createExamSaga };
