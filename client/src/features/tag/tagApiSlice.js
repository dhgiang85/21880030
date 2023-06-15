import { setTag, setTags } from "./tagSlice";
import { setLoading, setSucess, setError } from "../loader/loaderSlice";
import { call, put, takeLatest } from "redux-saga/effects";
import TagService from "./tagService";


function* getAllTagApi(action) {
  try {
    yield put(setLoading());

    const { data, status } = yield call(TagService.getAllTag, action.payload);

    if (data.success) {
      yield put(setSucess(""));
      yield put(setTags(data));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* getTagByIdApi(action) {
  try {

    const { data, status } = yield call(TagService.getTagById, action.payload);
    if (data.success) {
      yield put(setTag(data.tag));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* tagSaga() {
  yield takeLatest(GET_ALL_TAG, getAllTagApi);
  yield takeLatest(GET_TAG, getTagByIdApi);
}

export const GET_ALL_TAG = "GET_ALL_TAG";
export const GET_TAG = "GET_TAG";

export default tagSaga;
