import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "./rootSaga";
import createSagaMiddleware from "redux-saga";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import loaderSlice from "../features/loader/loaderSlice";


const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loader: loaderSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);