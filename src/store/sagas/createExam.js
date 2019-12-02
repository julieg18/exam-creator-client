import { put } from 'redux-saga/effects';
import {
  createExamStart,
  createExamFail,
  createExamSuccess,
  addExamQuestionStart,
  addExamQuestionFail,
  addExamQuestionSuccess,
  addExamStudentStart,
  addExamStudentFail,
  addExamStudentSuccess,
} from '../actions/index';

function* createExamSaga(action) {
  try {
    const exam = { title: action.examTitle };
    const res = yield fetch('/api/v1/users/signup', {
      method: 'POST',
      body: JSON.stringify(exam),
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
