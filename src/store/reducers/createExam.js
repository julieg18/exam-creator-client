import clonedeep from 'lodash.clonedeep';
import {
  CREATE_EXAM_RESET,
  CREATE_EXAM_TITLE,
  CREATE_EXAM_QUESTIONS,
  CREATE_EXAM_STUDENTS,
  CREATE_EXAM_START,
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_FAIL,
} from '../actions/createExamActionTypes';

const initialState = {
  exam: {
    title: '',
    questions: [],
    students: [],
  },
  loading: false,
  error: '',
};

function createExamReset() {
  return initialState;
}

function createExamTitle(newState, action) {
  newState.exam.title = action.title;
  return newState;
}

function createExamQuestions(newState, action) {
  newState.exam.questions = action.questions;
  return newState;
}

function createExamStudents(newState, action) {
  newState.exam.students = action.students;
  return newState;
}

function createExamStart(newState) {
  newState.loading = true;
  return newState;
}

function createExamSuccess(newState) {
  newState.loading = false;
  return newState;
}

function createExamFail(newState, action) {
  newState.loading = false;
  newState.error = action.error;
  return newState;
}

function createExamReducer(state = initialState, action) {
  const newState = clonedeep(state);
  switch (action.type) {
    case CREATE_EXAM_RESET:
      return createExamReset();
    case CREATE_EXAM_TITLE:
      return createExamTitle(newState, action);
    case CREATE_EXAM_QUESTIONS:
      return createExamQuestions(newState, action);
    case CREATE_EXAM_STUDENTS:
      return createExamStudents(newState, action);
    case CREATE_EXAM_START:
      return createExamStart(newState);
    case CREATE_EXAM_SUCCESS:
      return createExamSuccess(newState);
    case CREATE_EXAM_FAIL:
      return createExamFail(newState, action);
    default:
      return state;
  }
}

export default createExamReducer;
