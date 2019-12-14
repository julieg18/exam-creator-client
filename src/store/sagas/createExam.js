import { put } from 'redux-saga/effects';
import {
  createExamStart,
  createExamFail,
  createExamSuccess,
} from '../actions/index';

function* createExamSaga(action) {
  try {
    yield put(createExamStart());
    const res = yield fetch('/api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify(action.exam),
      headers: { 'Content-Type': 'application/json' },
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    console.log({ parsedRes });
  } catch (err) {
    console.log({ err });
  }
}

export { createExamSaga };
