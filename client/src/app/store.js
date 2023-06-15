import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import loaderReducer from "../features/loader/loaderSlice"; // Update import
import tagReducer from "../features/tag/tagSlice"; // Update import
import questionReducer from "../features/question/questionSlice";
import answerReducer from "../features/answer/answerSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loader: loaderReducer, // Update reducer
    tag: tagReducer, // Update reducer
    question: questionReducer,
    answer: answerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
