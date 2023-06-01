import {all} from 'redux-saga/effects';
import authSaga from "../features/auth/authApiSlice";
import userSaga from "../features/user/userApiSlice";
function* rootSaga() {
  yield all([
    authSaga(), 
    userSaga(), 
  ]);
}

export default rootSaga;