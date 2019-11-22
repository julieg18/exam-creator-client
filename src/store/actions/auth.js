import {
  AUTH_SIGNUP,
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_GET_USER,
  AUTH_GET_USER_START,
  AUTH_GET_USER_SUCCESS,
  AUTH_GET_USER_FAIL,
  AUTH_GET_USER_EXAMS,
  AUTH_GET_USER_EXAMS_START,
  AUTH_GET_USER_EXAMS_SUCCESS,
  AUTH_GET_USER_EXAMS_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
} from '../actions/actionTypes';

function authSignup(username, email, password) {
  return {
    type: AUTH_SIGNUP,
    username,
    email,
    password,
  };
}

function authSignupStart() {
  return {
    type: AUTH_SIGNUP_START,
  };
}

function authSignupSuccess(userId) {
  return {
    type: AUTH_SIGNUP_SUCCESS,
    userId,
  };
}

function authSignupFail(error) {
  return {
    type: AUTH_SIGNUP_FAIL,
    error,
  };
}

function authLogin(email, password) {
  return {
    type: AUTH_LOGIN,
    email,
    password,
  };
}

function authLoginStart() {
  return {
    type: AUTH_LOGIN_START,
  };
}

function authLoginSuccess(userId) {
  return {
    type: AUTH_LOGIN_SUCCESS,
    userId,
  };
}

function authLoginFail(error) {
  return {
    type: AUTH_LOGIN_FAIL,
    error,
  };
}

function authGetUser() {
  return {
    type: AUTH_GET_USER,
  };
}

function authGetUserStart() {
  return {
    type: AUTH_GET_USER_START,
  };
}

function authGetUserSuccess() {
  return {
    type: AUTH_GET_USER_SUCCESS,
  };
}

function authGetUserFail() {
  return {
    type: AUTH_GET_USER_FAIL,
  };
}

function authGetUserExams() {
  return {
    type: AUTH_GET_USER_EXAMS,
  };
}

function authGetUserExamsStart() {
  return {
    type: AUTH_GET_USER_EXAMS_START,
  };
}

function authGetUserExamsSuccess() {
  return {
    type: AUTH_GET_USER_EXAMS_SUCCESS,
  };
}

function authGetUserExamsFail() {
  return {
    type: AUTH_GET_USER_EXAMS_FAIL,
  };
}

function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

function authLogoutStart() {
  return {
    type: AUTH_LOGOUT_START,
  };
}

function authLogoutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
}

function authLogoutFail() {
  return {
    type: AUTH_LOGOUT_FAIL,
  };
}

export {
  authSignup,
  authSignupStart,
  authSignupSuccess,
  authSignupFail,
  authLogin,
  authLoginStart,
  authLoginSuccess,
  authLoginFail,
  authGetUser,
  authGetUserStart,
  authGetUserSuccess,
  authGetUserFail,
  authGetUserExams,
  authGetUserExamsStart,
  authGetUserExamsSuccess,
  authGetUserExamsFail,
  authLogout,
  authLogoutStart,
  authLogoutSuccess,
  authLogoutFail,
};
