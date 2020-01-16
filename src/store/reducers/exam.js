import clonedeep from 'lodash.clonedeep';
import {
  CREATE_EXAM_CHANGE_PART,
  CREATE_EXAM_RESET,
  CREATE_EXAM_TITLE,
  CREATE_EXAM_QUESTIONS,
  CREATE_EXAM_STUDENTS,
  CREATE_EXAM_START,
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_FAIL,
  GET_EXAM_START,
  GET_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_USER_EXAMS_START,
  GET_USER_EXAMS_SUCCESS,
  GET_USER_EXAMS_FAIL,
  DELETE_EXAM_START,
  DELETE_EXAM_FAIL,
  DELETE_EXAM_SUCCESS,
} from '../actions/examActionTypes';

const initialState = {
  exam: {
    title: '',
    questions: [],
    students: [],
  },
  currentExamPart: 'start',
  loading: false,
  error: '',
  retrievedExam: {},
  userExams: [],
};

function createExamChangePart(newState, action) {
  newState.currentExamPart = action.examPart;
  return newState;
}

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

function createExamSuccess() {
  return initialState;
}

function createExamFail(newState, action) {
  newState.loading = false;
  newState.error = action.error;
  return newState;
}

function getExamStart(newState) {
  newState.loading = true;
  return newState;
}

function getExamSuccess(newState, action) {
  newState.loading = false;
  newState.retrievedExam = action.exam;
  return newState;
}

function getExamFail(newState) {
  newState.loading = false;
  return newState;
}

function getUserExamsStart(newState) {
  newState.loading = true;
  return newState;
}

function getUserExamsSuccess(newState, action) {
  newState.loading = false;
  newState.userExams = action.exams;
  return newState;
}

function getUserExamsFail(newState) {
  newState.loading = false;
  return newState;
}

function deleteExamStart(newState) {
  newState.loading = true;
  return newState;
}

function deleteExamSuccess(newState, action) {
  newState.loading = false;
  newState.userExams = newState.userExams.filter(
    (exam) => exam._id !== action.deletedExamId,
  );
  return newState;
}

function deleteExamFail(newState) {
  newState.loading = false;
  newState.error = 'Something went wrong. :(';
  return newState;
}

function createExamReducer(state = initialState, action) {
  const newState = clonedeep(state);
  switch (action.type) {
    case CREATE_EXAM_CHANGE_PART:
      return createExamChangePart(newState, action);
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
    case GET_EXAM_START:
      return getExamStart(newState);
    case GET_EXAM_FAIL:
      return getExamFail(newState);
    case GET_EXAM_SUCCESS:
      return getExamSuccess(newState, action);
    case GET_USER_EXAMS_START:
      return getUserExamsStart(newState);
    case GET_USER_EXAMS_FAIL:
      return getUserExamsFail(newState);
    case GET_USER_EXAMS_SUCCESS:
      return getUserExamsSuccess(newState, action);
    case DELETE_EXAM_START:
      return deleteExamStart(newState);
    case DELETE_EXAM_FAIL:
      return deleteExamFail(newState);
    case DELETE_EXAM_SUCCESS:
      return deleteExamSuccess(newState, action);
    default:
      return state;
  }
}

export default createExamReducer;
