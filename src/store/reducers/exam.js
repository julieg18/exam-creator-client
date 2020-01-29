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
  EDIT_EXAM_SELECT_EXAM,
  EDIT_EXAM_RESET,
  EDIT_EXAM_CHANGE_PART,
  EDIT_EXAM_TITLE,
  EDIT_EXAM_QUESTIONS,
  EDIT_EXAM_STUDENTS,
  EDIT_EXAM_START,
  EDIT_EXAM_FAIL,
  EDIT_EXAM_SUCCESS,
} from '../actions/examActionTypes';

const initialState = {
  examBeingCreated: {
    title: '',
    questions: [],
    students: [],
  },
  examToBeEdited: {},
  examPartsBeingEdited: {
    title: '',
    questions: [],
    students: [],
  },
  currentExamBeingCreatedPart: 'start',
  currentExamBeingEditedPart: 'start',
  createExamLoading: false,
  getExamLoading: false,
  getUserExamsLoading: false,
  editExamLoading: false,
  error: '',
  retrievedExam: {},
  userExams: [],
};

function createExamChangePart(newState, action) {
  newState.currentExamBeingCreatedPart = action.examPart;
  return newState;
}

function createExamReset(newState) {
  newState.examBeingCreated = {
    title: '',
    questions: [],
    students: [],
  };
  newState.currentExamBeingCreatedPart = 'start';
  return newState;
}

function createExamTitle(newState, action) {
  newState.examBeingCreated.title = action.title;
  return newState;
}

function createExamQuestions(newState, action) {
  newState.examBeingCreated.questions = action.questions;
  return newState;
}

function createExamStudents(newState, action) {
  newState.examBeingCreated.students = action.students;
  return newState;
}

function createExamStart(newState) {
  newState.createExamLoading = true;
  return newState;
}

function createExamSuccess(newState) {
  newState.examBeingCreated = {
    title: '',
    questions: [],
    students: [],
  };
  newState.currentExamBeingCreatedPart = 'start';
  newState.createExamLoading = false;
  return newState;
}

function createExamFail(newState, action) {
  newState.createExamLoading = false;
  newState.error = action.error;
  return newState;
}

function getExamStart(newState) {
  newState.getExamLoading = true;
  return newState;
}

function getExamSuccess(newState, action) {
  newState.getExamLoading = false;
  newState.retrievedExam = action.exam;
  return newState;
}

function getExamFail(newState) {
  newState.getExamLoading = false;
  return newState;
}

function getUserExamsStart(newState) {
  newState.getUserExamsLoading = true;
  return newState;
}

function getUserExamsSuccess(newState, action) {
  newState.getUserExamsLoading = false;
  newState.userExams = action.exams;
  return newState;
}

function getUserExamsFail(newState, action) {
  newState.getUserExamsLoading = false;
  newState.error = action.error;
  return newState;
}

function deleteExamStart(newState) {
  newState.deleteExamLoading = true;
  return newState;
}

function deleteExamSuccess(newState, action) {
  newState.deleteExamLoading = false;
  newState.userExams = newState.userExams.filter(
    (exam) => exam._id !== action.deletedExamId,
  );
  return newState;
}

function deleteExamFail(newState, action) {
  newState.deleteExamLoading = false;
  newState.error = action.error;
  return newState;
}

function editExamSelectExam(newState, action) {
  newState.examToBeEdited = action.selectedExam;
  return newState;
}

function editExamReset(newState) {
  newState.examToBeEdited = {};
  newState.examPartsBeingEdited = {
    title: '',
    questions: [],
    students: [],
  };
  newState.currentExamBeingEditedPart = 'start';
  return newState;
}

function editExamChangePart(newState, action) {
  newState.currentExamBeingEditedPart = action.examPart;
  return newState;
}

function editExamTitle(newState, action) {
  newState.examPartsBeingEdited.title = action.title;
  return newState;
}

function editExamQuestions(newState, action) {
  newState.examPartsBeingEdited.questions = action.questions;
  return newState;
}

function editExamStudents(newState, action) {
  newState.examPartsBeingEdited.students = action.students;
  return newState;
}

function editExamStart(newState) {
  newState.editExamLoading = true;
  return newState;
}

function editExamSuccess(newState) {
  newState.examToBeEdited = {};
  newState.examPartsBeingEdited = {
    title: '',
    questions: [],
    students: [],
  };
  newState.currentExamBeingEditedPart = 'start';
  newState.editExamLoading = false;
  return newState;
}

function editExamFail(newState, action) {
  newState.editExamLoading = false;
  newState.error = action.error;
  return newState;
}

function createExamReducer(state = initialState, action) {
  const newState = clonedeep(state);
  switch (action.type) {
    case CREATE_EXAM_CHANGE_PART:
      return createExamChangePart(newState, action);
    case CREATE_EXAM_RESET:
      return createExamReset(newState);
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
      return getExamFail(newState, action);
    case GET_EXAM_SUCCESS:
      return getExamSuccess(newState, action);
    case GET_USER_EXAMS_START:
      return getUserExamsStart(newState);
    case GET_USER_EXAMS_FAIL:
      return getUserExamsFail(newState, action);
    case GET_USER_EXAMS_SUCCESS:
      return getUserExamsSuccess(newState, action);
    case DELETE_EXAM_START:
      return deleteExamStart(newState);
    case DELETE_EXAM_FAIL:
      return deleteExamFail(newState, action);
    case DELETE_EXAM_SUCCESS:
      return deleteExamSuccess(newState, action);
    case EDIT_EXAM_SELECT_EXAM:
      return editExamSelectExam(newState, action);
    case EDIT_EXAM_RESET:
      return editExamReset(newState);
    case EDIT_EXAM_CHANGE_PART:
      return editExamChangePart(newState, action);
    case EDIT_EXAM_TITLE:
      return editExamTitle(newState, action);
    case EDIT_EXAM_QUESTIONS:
      return editExamQuestions(newState, action);
    case EDIT_EXAM_STUDENTS:
      return editExamStudents(newState, action);
    case EDIT_EXAM_START:
      return editExamStart(newState);
    case EDIT_EXAM_SUCCESS:
      return editExamSuccess(newState);
    case EDIT_EXAM_FAIL:
      return editExamFail(newState, action);
    default:
      return state;
  }
}

export default createExamReducer;
