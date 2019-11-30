import {
  CREATE_EXAM,
  CREATE_EXAM_START,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_SUCCESS,
  ADD_EXAM_QUESTION,
  ADD_EXAM_QUESTION_START,
  ADD_EXAM_QUESTION_FAIL,
  ADD_EXAM_QUESTION_SUCCESS,
  ADD_EXAM_STUDENT,
  ADD_EXAM_STUDENT_START,
  ADD_EXAM_STUDENT_FAIL,
  ADD_EXAM_STUDENT_SUCCESS,
} from './createExamActionTypes';

function createExam() {
  return {
    type: CREATE_EXAM,
  };
}

function createExamStart() {
  return {
    type: CREATE_EXAM_START,
  };
}

function createExamFail() {
  return {
    type: CREATE_EXAM_FAIL,
  };
}

function createExamSuccess() {
  return {
    type: CREATE_EXAM_SUCCESS,
  };
}

function addExamQuestion() {
  return {
    type: ADD_EXAM_QUESTION,
  };
}

function addExamQuestionStart() {
  return {
    type: ADD_EXAM_QUESTION_START,
  };
}

function addExamQuestionFail() {
  return {
    type: ADD_EXAM_QUESTION_FAIL,
  };
}

function addExamQuestionSuccess() {
  return {
    type: ADD_EXAM_QUESTION_SUCCESS,
  };
}

function addExamStudent() {
  return {
    type: ADD_EXAM_STUDENT,
  };
}

function addExamStudentStart() {
  return {
    type: ADD_EXAM_STUDENT_START,
  };
}

function addExamStudentFail() {
  return {
    type: ADD_EXAM_STUDENT_FAIL,
  };
}

function addExamStudentSuccess() {
  return {
    type: ADD_EXAM_STUDENT_SUCCESS,
  };
}

export {
  createExam,
  createExamStart,
  createExamFail,
  createExamSuccess,
  addExamQuestion,
  addExamQuestionStart,
  addExamQuestionFail,
  addExamQuestionSuccess,
  addExamStudent,
  addExamStudentStart,
  addExamStudentFail,
  addExamStudentSuccess,
};
