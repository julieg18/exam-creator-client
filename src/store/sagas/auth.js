import { put } from 'redux-saga/effects';
import {
  authLoginExistingUserSuccess,
  authLoginExistingUserFail,
  authSignupStart,
  authSignupSuccess,
  authSignupFail,
  authLoginStart,
  authLoginSuccess,
  authLoginFail,
  authLogoutStart,
  authLogoutSuccess,
  authLogoutFail,
} from '../actions/index';

function* authLoginExistingUserSaga() {
  try {
    const res = yield fetch('/api/v1/users');
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(authLoginExistingUserSuccess(parsedRes.user._id));
  } catch (err) {
    yield put(authLoginExistingUserFail());
  }
}

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
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    const {
      newUser: { _id },
    } = parsedRes;
    yield put(authSignupSuccess(_id));
  } catch (err) {
    yield put(authSignupFail(err.message));
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
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    const {
      user: { _id },
    } = parsedRes;
    yield put(authLoginSuccess(_id));
  } catch (err) {
    yield put(authLoginFail(err.message));
  }
}

function* authLogoutSaga() {
  yield put(authLogoutStart());
  try {
    const res = yield fetch('/api/v1/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const parsedRes = yield res.json();
    if (!res.ok) {
      throw Error(parsedRes.error);
    }
    yield put(authLogoutSuccess());
  } catch (err) {
    yield put(authLogoutFail(err.message));
  }
}

export {
  authLoginExistingUserSaga,
  authSignupSaga,
  authLoginSaga,
  authLogoutSaga,
};
