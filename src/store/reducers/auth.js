import {
  AUTH_LOGIN_EXISTING_USER_SUCCESS,
  AUTH_LOGIN_EXISTING_USER_FAIL,
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_GET_USER_START,
  AUTH_GET_USER_SUCCESS,
  AUTH_GET_USER_FAIL,
  AUTH_GET_USER_EXAMS_START,
  AUTH_GET_USER_EXAMS_SUCCESS,
  AUTH_GET_USER_EXAMS_FAIL,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_CLEAR_ERROR,
} from '../actions/authActionTypes';

const initialState = {
  isUserLoggedIn: false,
  userId: '',
  loading: false,
  error: '',
  user: {},
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_EXISTING_USER_SUCCESS:
      return {
        ...state,
        isUserLoggedIn: true,
        userId: action.userId,
      };
    case AUTH_LOGIN_EXISTING_USER_FAIL:
      return state;
    case AUTH_SIGNUP_START:
      return { ...state, loading: true };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        isUserLoggedIn: true,
        userId: action.userId,
        loading: false,
      };
    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AUTH_LOGIN_START:
      return { ...state, loading: true };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isUserLoggedIn: true,
        userId: action.userId,
        loading: false,
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AUTH_GET_USER_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case AUTH_GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AUTH_GET_USER_EXAMS_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_GET_USER_EXAMS_SUCCESS:
      return {
        ...state,
        loading: false,
        exams: action.exams,
      };
    case AUTH_GET_USER_EXAMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AUTH_LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserLoggedIn: false,
        userId: '',
        user: {},
      };
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case AUTH_CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }
}

export default authReducer;
