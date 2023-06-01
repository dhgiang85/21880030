import { setUsers } from "./userSlice";
import { setProfile } from "../auth/authSlice";
import { setLoading, setSucess, setError } from "../loader/loaderSlice";

import { put, takeLatest, call } from "redux-saga/effects";
import UserService from "./userService";

function* getAllUserApi(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(UserService.getAllUser, action.payload);
    if (data.success) {
      yield put(setUsers(data));
      yield put(setSucess(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* deleteUserApi(action) {
  try {
    const { data, status } = yield call(UserService.deleteUser, action.payload);
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* updateProfileAPI(action){
  try {
    yield put(setLoading());
    
    const { data, status } = yield call(UserService.updateProfile, action.payload);
    if (data.success) {
      yield put(setProfile(data.updatedProfile));
      yield put(setSucess(data.message));
    }
  } catch (error) {
    
    yield put(setError(error.response.data.message));
  }
}
function* setActiveUserApi(action) {
  try {
    const { data, status } = yield call(
      UserService.setActiveUser,
      action.payload
    );
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* setRoleUser(action) {
  try {
    const { data, status } = yield call(
      UserService.changeRoleUser,
      action.payload
    );
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

export default function* userSaga() {
  yield takeLatest(GET_ALL_USER_API, getAllUserApi);
  yield takeLatest(SET_ACTIVE_API, setActiveUserApi);
  yield takeLatest(SET_ROLE_API, setRoleUser);
  yield takeLatest(DELETE_USER_API, deleteUserApi);
  yield takeLatest(UPDATE_PROFILE_API, updateProfileAPI);
}
export const GET_ALL_USER_API = "GET_ALL_USER_API";
export const SET_ACTIVE_API = "SET_ACTIVE_API";
export const SET_ROLE_API = "SET_ROLE_API";
export const DELETE_USER_API = "DELETE_USER_API";
export const UPDATE_PROFILE_API = "UPDATE_PROFILE_API";
