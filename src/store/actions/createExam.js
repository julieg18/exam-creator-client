import {
  CREATE_EXAM_TITLE,
  CREATE_EXAM_QUESTIONS,
  CREATE_EXAM_STUDENTS,
  CREATE_EXAM_START,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_SUCCESS,
} from './createExamActionTypes';

function createExamTitle(title) {
  return {
    type: CREATE_EXAM_TITLE,
    title,
  };
}

function createExamQuestions(questions) {
  return {
    type: CREATE_EXAM_QUESTIONS,
    questions,
  };
}

function createExamStudents(students) {
  return {
    type: CREATE_EXAM_STUDENTS,
    students,
  };
}

function createExamStart() {
  return { type: CREATE_EXAM_START };
}

function createExamFail() {
  return { type: CREATE_EXAM_FAIL };
}

function createExamSuccess() {
  return { type: CREATE_EXAM_SUCCESS };
}

export {
  createExamTitle,
  createExamQuestions,
  createExamStudents,
  createExamStart,
  createExamFail,
  createExamSuccess,
};
