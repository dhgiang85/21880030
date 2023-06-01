import { logIn, logOut } from "./authSlice";
import { setLoading, setSucess, setError } from "../loader/loaderSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import AuthService from "./authService";

function* loginApi(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(AuthService.loginUser, action.payload);
    if (status === 200) {
      if (data.success) {
        yield put(logIn(data));
        yield put(setSucess(data.message));
      } else {
        yield put(setError(data.message));
      }
    }
  } catch (error) {
  
    yield put(setError(error.response.data.message));
  }
}
function* logoutAPI(action) {
  try {
    yield put(logOut());
    const { data, status } = yield call(AuthService.logoutUser);
    yield put(setSucess("Logout success"));
  } catch (error) {
    yield put(setError(error.message));
  }
}
function* registerApi(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      AuthService.registerUser,
      action.payload
    );


    if (status === 200) {
      if (data.success) {
        yield put(logIn(data));
        yield put(setSucess(data.message));
      } else {
        yield put(setError(data.message));
      }
    }
  } catch (error) {
  
    yield put(setError(error.response.data.message));
  }
}
function* requestResetPasswordAPI(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      AuthService.requestResetPassword,
      action.payload
    );


    if (status === 200) {
      if (data.success) {
        
        yield put(setSucess(data.message));
      } else {
        yield put(setError(data.message));
      }
    }
  } catch (error) {
  
    yield put(setError(error.response.data.message));
  }
}
function* resetPasswordAPI(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      AuthService.resetPassword,
      action.payload
    );


    if (status === 200) {
      if (data.success) {
        
        yield put(setSucess("Password reset success"));
      } else {
        yield put(setError(data.message));
      }
    }
  } catch (error) {
  
    yield put(setError(error.response.data.message));
  }
}


function* authSaga() {
  yield takeLatest(LOGIN_API, loginApi);
  yield takeLatest(LOGOUT_API, logoutAPI);
  yield takeLatest(REGISTER_API, registerApi);
  yield takeLatest(RESET_REQUEST_PASS_API, requestResetPasswordAPI);
  yield takeLatest(RESET_PASS_API, resetPasswordAPI);
}

export const LOGIN_API = "LOGIN_API";
export const LOGOUT_API = "LOGOUT_API";
export const REGISTER_API = "REGISTER_API";
export const RESET_REQUEST_PASS_API = "RESET_REQUEST_PASS_API";
export const RESET_PASS_API = "RESET_PASS_API";

export default authSaga;


