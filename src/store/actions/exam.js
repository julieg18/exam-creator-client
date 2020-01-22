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
  DELETE_EXAM,
  DELETE_EXAM_START,
  DELETE_EXAM_SUCCESS,
  DELETE_EXAM_FAIL,
  EDIT_EXAM_SELECT_EXAM,
  EDIT_EXAM_RESET,
  EDIT_EXAM_CHANGE_PART,
  EDIT_EXAM_TITLE,
  EDIT_EXAM_QUESTIONS,
  EDIT_EXAM_STUDENTS,
  EDIT_EXAM,
  EDIT_EXAM_START,
  EDIT_EXAM_FAIL,
  EDIT_EXAM_SUCCESS,
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

function createExamFail(error) {
  return { type: CREATE_EXAM_FAIL, error };
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

function getExamFail(error) {
  return {
    type: GET_EXAM_FAIL,
    error,
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

function getUserExamsFail(error) {
  return {
    type: GET_USER_EXAMS_FAIL,
    error,
  };
}

function deleteExam(examId) {
  return {
    type: DELETE_EXAM,
    examId,
  };
}

function deleteExamStart() {
  return { type: DELETE_EXAM_START };
}

function deleteExamSuccess(deletedExamId) {
  return { type: DELETE_EXAM_SUCCESS, deletedExamId };
}

function deleteExamFail(error) {
  return { type: DELETE_EXAM_FAIL, error };
}

function editExamSelectExam(selectedExam) {
  return { type: EDIT_EXAM_SELECT_EXAM, selectedExam };
}

function editExamReset() {
  return { type: EDIT_EXAM_RESET };
}

function editExamChangePart(examPart) {
  return {
    type: EDIT_EXAM_CHANGE_PART,
    examPart,
  };
}

function editExamTitle(title) {
  return {
    type: EDIT_EXAM_TITLE,
    title,
  };
}

function editExamQuestions(questions) {
  return {
    type: EDIT_EXAM_QUESTIONS,
    questions,
  };
}

function editExamStudents(students) {
  return {
    type: EDIT_EXAM_STUDENTS,
    students,
  };
}

function editExam(exam, examPartsBeingEdited) {
  return {
    type: EDIT_EXAM,
    exam,
    examPartsBeingEdited,
  };
}

function editExamStart() {
  return { type: EDIT_EXAM_START };
}

function editExamFail(error) {
  return { type: EDIT_EXAM_FAIL, error };
}

function editExamSuccess() {
  return { type: EDIT_EXAM_SUCCESS };
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
  deleteExam,
  deleteExamStart,
  deleteExamSuccess,
  deleteExamFail,
  editExamSelectExam,
  editExamReset,
  editExamChangePart,
  editExamTitle,
  editExamQuestions,
  editExamStudents,
  editExam,
  editExamStart,
  editExamFail,
  editExamSuccess,
};
