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
  AUTH_LOGOUT,
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

function authLogout() {
  return {
    type: AUTH_LOGOUT,
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
  authLogout,
};
