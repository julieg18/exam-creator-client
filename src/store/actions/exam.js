import {
  CREATE_EXAM_CHANGE_PART,
  CREATE_EXAM_RESET,
  CREATE_EXAM_TITLE,
  CREATE_EXAM_QUESTIONS,
  CREATE_EXAM_STUDENTS,
  CREATE_EXAM,
  CREATE_EXAM_START,
  CREATE_EXAM_FAIL,
  CREATE_EXAM_SUCCESS,
  GET_EXAM,
  GET_EXAM_START,
  GET_EXAM_SUCCESS,
  GET_EXAM_FAIL,
  GET_USER_EXAMS,
  GET_USER_EXAMS_START,
  GET_USER_EXAMS_SUCCESS,
  GET_USER_EXAMS_FAIL,
} from './examActionTypes';

function createExamChangePart(examPart) {
  return {
    type: CREATE_EXAM_CHANGE_PART,
    examPart,
  };
}

function createExamReset() {
  return {
    type: CREATE_EXAM_RESET,
  };
}

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

function createExam(exam) {
  return {
    type: CREATE_EXAM,
    exam,
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

function getExam(examId) {
  return {
    type: GET_EXAM,
    examId,
  };
}

function getExamStart() {
  return {
    type: GET_EXAM_START,
  };
}

function getExamSuccess(exam) {
  return {
    type: GET_EXAM_SUCCESS,
    exam,
  };
}

function getExamFail() {
  return {
    type: GET_EXAM_FAIL,
  };
}

function getUserExams() {
  return {
    type: GET_USER_EXAMS,
  };
}

function getUserExamsStart() {
  return {
    type: GET_USER_EXAMS_START,
  };
}

function getUserExamsSuccess(exams) {
  return {
    type: GET_USER_EXAMS_SUCCESS,
    exams,
  };
}

function getUserExamsFail() {
  return {
    type: GET_USER_EXAMS_FAIL,
  };
}

export {
  createExamChangePart,
  createExamReset,
  createExamTitle,
  createExamQuestions,
  createExamStudents,
  createExam,
  createExamStart,
  createExamFail,
  createExamSuccess,
  getExam,
  getExamStart,
  getExamSuccess,
  getExamFail,
  getUserExams,
  getUserExamsStart,
  getUserExamsFail,
  getUserExamsSuccess,
};
