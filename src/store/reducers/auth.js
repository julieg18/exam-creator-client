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

const initialState = {
  isUserLoggedIn: false,
  userId: '',
  loading: false,
  errors: [],
};

function authReducer(state = initialState, action) {
  switch (action.type) {
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
        errors: [...state.errors, action.error],
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
        errors: [...state.errors, action.error],
      };
    case AUTH_GET_USER:
      break;
    case AUTH_LOGOUT:
      break;
    default:
      return state;
  }
}

export default authReducer;
