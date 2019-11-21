import { put } from 'redux-saga/effects';
import {
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
} from '../actions/index';

function* authSignupSaga(action) {
  yield put(authSignupStart());
  const { username, email, password } = action;
  const user = {
    username,
    email,
    password,
  };
  try {
    const res = yield fetch('/api/v1/users/signup', {
      type: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const {
      body: {
        newUser: { _id },
      },
    } = res;
    yield put(authSignupSuccess(_id));
  } catch (err) {
    console.log(err);
    yield put(authSignupFail('error here'));
  }
}

function* authLoginSaga(action) {
  yield put(authLoginStart());
  const { email, password } = action;
  const user = {
    email,
    password,
  };
  try {
    const res = yield fetch('/api/v1/users/login', {
      type: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const {
      body: {
        newUser: { _id },
      },
    } = res;
    yield put(authLoginSuccess(_id));
  } catch (err) {
    console.log(err);
    yield put(authLoginFail('error here'));
  }
}

export { authSignupSaga, authLoginSaga };
