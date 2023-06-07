import { setTags } from "./tagSlice";
import { setLoading, setSucess, setError } from "../loader/loaderSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import TagService from "./tagService";

function* getAllTagApi(action) {
  try {

    const { data, status } = yield call(TagService.getAllTag, action.payload);
    if (data.success) {
      yield put(setTags(data));

    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}

function* tagSaga() {
  yield takeLatest(GET_ALL_TAG, getAllTagApi);
}

export const GET_ALL_TAG = "GET_ALL_TAG";

export default tagSaga;
