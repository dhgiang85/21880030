import { call, put, takeLatest } from "redux-saga/effects";
import { setError, setLoading, setSucess } from "../loader/loaderSlice";
import AnswerService from "./answerService";
import { setAnswers, clearAnswer, setAnswer } from "./answerSlice";
import { setCurrentQuestion } from "../question/questionSlice";

function* getAllAnswer(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      AnswerService.getAllQuestion,
      action.payload
    );

    if (data.success) {
      yield put(setAnswers(data));
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message || error.response.data));
  }
}
export function* getAllAnswerByQuestion(action) {
  try {
    const { data, status } = yield call(
      AnswerService.getAllAnswerByQuestionId,
      action.payload
    );

    if (data.success) {
      yield put(setAnswers(data));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message || error.response.data));
  }
}

function* voteAnswer(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      AnswerService.voteAnswer,
      action.payload
    );

    if (data.success) {
      yield call(getAllAnswerByQuestion, {
        payload: { id: data.question._id },
      });
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message || error.response.data));
  }
}
function* markAnswer(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      AnswerService.markQuestion,
      action.payload
    );

    if (data.success) {
      yield put(setCurrentQuestion(data.question));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message || error.response.data));
  }
}
function* acceptAnswer(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      AnswerService.acceptAnswer,
      action.payload
    );

    if (data.success) {
      yield call(getAllAnswerByQuestion, {
        payload: { id: data.question._id },
      });
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    // console.log(error);
    yield put(setError(error.response.data.message || error.response.data));
  }
}
function* deleteAnswer(action) {
  try {
    yield put(setLoading());

    const { data, status } = yield call(
      AnswerService.deleteAnswer,
      action.payload
    );
    if (data.success) {
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message || error.response.data));
  }
}
function* updatedAnswer(action) {
  try {
    yield put(setLoading());

    const { data, status } = yield call(
      AnswerService.updateAnswer,
      action.payload
    );
    if (data.success) {
      yield put(setSucess(data.message));
      yield put(clearAnswer());
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    // console.log(error);
    yield put(setError(error.response.data.message || error.response.data));
  }
}
function* getAllAnswerByUser(action) {
  try {
    yield put(setLoading());
    yield put(
      setAnswers({
        answers: [],
      })
    );
    const { data, status } = yield call(
      AnswerService.getAllAnswerByUser,
      action.payload
    );

    if (data.success) {
      yield put(setAnswers(data));
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message || error.response.data));
  }
}

function* getAnswer(action) {
  try {
    yield put(setLoading());
    yield put(setAnswer({})); 
    const { data, status } = yield call(
      AnswerService.getAnswerById,
      action.payload
    );
    console.log(data);
    if (data.success) {
      yield put(setSucess(data.message));
      yield put(setAnswer(data.answer));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message || error.response.data));
  }
}
function* answerSaga() {
  yield takeLatest(GET_ALL_ANSWER_API, getAllAnswer);
  yield takeLatest(GET_ALL_ANSWER_OFQUESTION_API, getAllAnswerByQuestion);
  yield takeLatest(VOTE_ANSWER_API, voteAnswer);
  yield takeLatest(MARK_ANSWER_API, markAnswer);
  yield takeLatest(ACCEPT_ANSWER_API, acceptAnswer);
  yield takeLatest(DELETE_ANSWER_API, deleteAnswer);
  yield takeLatest(UPDATE_ANSWER_API, updatedAnswer);
  yield takeLatest(GET_ALL_USER_ANSWER_API, getAllAnswerByUser);
  yield takeLatest(GET_ANSWER_API, getAnswer);
}
export const GET_ALL_ANSWER_API = "GET_ALL_ANSWER_API";
export const VOTE_ANSWER_API = "VOTE_ANSWER_API";
export const MARK_ANSWER_API = "MARK_ANSWER_API";
export const ACCEPT_ANSWER_API = "ACCEPT_ANSWER_API";
export const GET_ALL_ANSWER_OFQUESTION_API = "GET_ALL_ANSWER_OFQUESTION_API";
export const DELETE_ANSWER_API = "DELETE_ANSWER_API";
export const UPDATE_ANSWER_API = "UPDATE_ANSWER_API";
export const GET_ALL_USER_ANSWER_API = "GET_ALL_USER_ANSWER_API";
export const GET_ANSWER_API = "GET_ANSWER_API";

export default answerSaga;
