import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import loaderSlice from "../features/loader/loaderSlice";
import tagSlice from "../features/tag/tagSlice";
import questionSlice from "../features/question/questionSlice";
import answerSlice from "../features/answer/answerSlice";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loader: loaderSlice,
    tag: tagSlice,
    question: questionSlice,
    answer: answerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);