import {all} from 'redux-saga/effects';
import authSaga from "../features/auth/authApiSlice";
import userSaga from "../features/user/userApiSlice";
import tagSaga from '../features/tag/tagApiSlice';
import questionSaga from '../features/question/questionApiSlice';
import answerSaga from '../features/answer/answerApiSlice';
function* rootSaga() {
  yield all([
    authSaga(), 
    userSaga(), 
    tagSaga(),
    questionSaga(),
    answerSaga(),
  ]);
}

export default rootSaga;