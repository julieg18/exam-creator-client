import {
  AUTH_LOGIN_EXISTING_USER_SUCCESS,
  AUTH_LOGIN_EXISTING_USER_FAIL,
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  AUTH_LOGIN_START,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
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

function authLoginExistingUserSuccess(state, action) {
  return {
    ...state,
    isUserLoggedIn: true,
    userId: action.userId,
  };
}

function authLoginExistingUserFail(state) {
  return state;
}

function authSignupStart(state) {
  return { ...state, loading: true };
}

function authSignupSuccess(state, action) {
  return {
    ...state,
    isUserLoggedIn: true,
    userId: action.userId,
    loading: false,
  };
}

function authSignupFail(state, action) {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
}

function authLoginStart(state) {
  return { ...state, loading: true };
}

function authLoginSuccess(state, action) {
  return {
    ...state,
    isUserLoggedIn: true,
    userId: action.userId,
    loading: false,
  };
}

function authLoginFail(state, action) {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
}

function authLogoutStart(state) {
  return {
    ...state,
    loading: true,
  };
}

function authLogoutSuccess(state) {
  return {
    ...state,
    loading: false,
    isUserLoggedIn: false,
    userId: '',
    user: {},
  };
}

function authLogoutFail(state, action) {
  return {
    ...state,
    loading: false,
    error: action.error,
  };
}

function authClearError(state) {
  return {
    ...state,
    error: '',
  };
}

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_EXISTING_USER_SUCCESS:
      return authLoginExistingUserSuccess(state, action);
    case AUTH_LOGIN_EXISTING_USER_FAIL:
      return authLoginExistingUserFail(state);
    case AUTH_SIGNUP_START:
      return authSignupStart(state);
    case AUTH_SIGNUP_SUCCESS:
      return authSignupSuccess(state, action);
    case AUTH_SIGNUP_FAIL:
      return authSignupFail(state, action);
    case AUTH_LOGIN_START:
      return authLoginStart(state);
    case AUTH_LOGIN_SUCCESS:
      return authLoginSuccess(state, action);
    case AUTH_LOGIN_FAIL:
      return authLoginFail(state, action);
    case AUTH_LOGOUT_START:
      return authLogoutStart(state);
    case AUTH_LOGOUT_SUCCESS:
      return authLogoutSuccess(state);
    case AUTH_LOGOUT_FAIL:
      return authLogoutFail(state, action);
    case AUTH_CLEAR_ERROR:
      return authClearError(state);
    default:
      return state;
  }
}

export default authReducer;
