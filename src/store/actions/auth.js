import {
  AUTH_LOGIN_EXISTING_USER,
  AUTH_LOGIN_EXISTING_USER_SUCCESS,
  AUTH_LOGIN_EXISTING_USER_FAIL,
  AUTH_SIGNUP,
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_START,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_CLEAR_ERROR,
} from '../actions/authActionTypes';

function authLoginExistingUser() {
  return {
    type: AUTH_LOGIN_EXISTING_USER,
  };
}

function authLoginExistingUserSuccess(userId) {
  return {
    type: AUTH_LOGIN_EXISTING_USER_SUCCESS,
    userId,
  };
}

function authLoginExistingUserFail() {
  return { type: AUTH_LOGIN_EXISTING_USER_FAIL };
}

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

function authLogoutFail(error) {
  return {
    type: AUTH_LOGOUT_FAIL,
    error,
  };
}

function authClearError() {
  return {
    type: AUTH_CLEAR_ERROR,
  };
}

export {
  authLoginExistingUser,
  authLoginExistingUserFail,
  authLoginExistingUserSuccess,
  authSignup,
  authSignupStart,
  authSignupSuccess,
  authSignupFail,
  authLogin,
  authLoginStart,
  authLoginSuccess,
  authLoginFail,
  authLogout,
  authLogoutStart,
  authLogoutSuccess,
  authLogoutFail,
  authClearError,
};
