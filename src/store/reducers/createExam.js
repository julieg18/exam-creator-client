import clonedeep from 'lodash.clonedeep';
import {
  CREATE_EXAM_START,
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_FAIL,
  ADD_EXAM_QUESTION_START,
  ADD_EXAM_QUESTION_SUCCESS,
  ADD_EXAM_QUESTION_FAIL,
  ADD_EXAM_STUDENT_START,
  ADD_EXAM_STUDENT_SUCCESS,
  ADD_EXAM_STUDENT_FAIL,
} from '../actions/createExamActionTypes';

const initialState = {
  isExamBeingMade: false,
  exam: {
    title: '',
    id: '',
    numberOfQuestions: 0,
    numberOfStudents: 0,
    questions: [],
    students: [],
  },
  loading: false,
  error: '',
};

function createExamReducer(state = initialState, action) {
  const newState = clonedeep(state);
  switch (action.type) {
    case CREATE_EXAM_START:
    case ADD_EXAM_QUESTION_START:
    case ADD_EXAM_STUDENT_START:
      newState.loading = true;
      return newState;
    case CREATE_EXAM_FAIL:
    case ADD_EXAM_QUESTION_FAIL:
    case ADD_EXAM_STUDENT_FAIL:
      newState.loading = false;
      newState.error = action.error;
      return newState;
    case CREATE_EXAM_SUCCESS:
      newState.exam.id = action.examId;
      newState.exam.title = action.examTitle;
      newState.loading = true;
      return newState;
    case ADD_EXAM_STUDENT_SUCCESS:
      newState.exam.numberOfStudents++;
      newState.exam.students.push(action.student);
      newState.loading = false;
      return newState;
    case ADD_EXAM_QUESTION_SUCCESS:
      newState.exam.numberOfQuestions++;
      newState.exam.questions.push(action.question);
      newState.loading = false;
      return newState;
    default:
      return state;
  }
}

export default createExamReducer;
