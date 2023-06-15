import { call, put, takeLatest } from "redux-saga/effects";
import { setError, setLoading, setSucess } from "../loader/loaderSlice";
import QuestionService from "./questionService";
import {
  setQuestions,
  setCurrentQuestion,
  clearQuestions,
  clearQuestion,
} from "./questionSlice";
import { getAllAnswerByQuestion } from "../answer/answerApiSlice";
function* createQuestion(action) {
  try {
    yield put(setLoading());

    const { data, status } = yield call(
      QuestionService.postQuestion,
      action.payload
    );;
    if (data.success) {
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* updatedQuestion(action) {
  try {
    yield put(setLoading());

    const { data, status } = yield call(
      QuestionService.updateQuestion,
      action.payload
    );
    if (data.success) {
      yield put(setSucess(data.message));
      yield put(clearQuestion());
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* getAllQuestion(action) {
  try {
    yield put(setLoading());
    yield put(clearQuestions());
    const { data, status } = yield call(
      QuestionService.getAllQuestion,
      action.payload
    );
  
    if (data.success) {
      yield put(setSucess(data.message));
      yield put(setQuestions(data));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* getAllQuestionByUser(action) {
  try {
    yield put(setLoading());
    yield put(clearQuestions());
    const { data, status } = yield call(
      QuestionService.getAllQuestionByUser,
      action.payload
    );
    if (data.success) {
      yield put(setSucess(data.message));
      yield put(setQuestions(data));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* getQuestion(action) {
  try {
    yield put(setLoading());
    yield put(clearQuestion());
    const { data, status } = yield call(
      QuestionService.getQuestionById,
      action.payload
    );

    if (data.success) {
    
      yield put(setCurrentQuestion(data.question));
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* deleteQuestion(action) {
  try {
    yield put(setLoading());

    const { data, status } = yield call(
      QuestionService.deleteQuestion,
      action.payload
    );
    if (data.success) {
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* voteQuestion(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      QuestionService.voteQuestion,
      action.payload
    );

    if (data.success) {
      yield put(setSucess(data.message));
      yield put(setCurrentQuestion(data.question));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* markQuestion(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      QuestionService.markQuestion,
      action.payload
    );

    if (data.success) {
      yield put(setCurrentQuestion(data.question));
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* getAllMarkedQuestion(action) {
  try {
    yield put(setLoading());
    yield put(clearQuestions());
    const { data, status } = yield call(
      QuestionService.getAllMarkedQuestion,
      action.payload
    );

    if (data.success) {
      yield put(setSucess(data.message));
      yield put(setQuestions(data));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* answerQuestion(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      QuestionService.answerQuestion,
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
    yield put(setError(error.response.data.message|| error.response.data));
  }
}
function* unMarkQuestion(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      QuestionService.unMarkQuestion,
      action.payload
    );

    if (data.success) {
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message|| error.response.data));
  }
}

function* questionSaga() {
  yield takeLatest(POST_QUESTION_API, createQuestion);
  yield takeLatest(GET_ALL_QUESTION_API, getAllQuestion);
  yield takeLatest(GET_QUESTION_API, getQuestion);
  yield takeLatest(VOTE_QUESTION_API, voteQuestion);
  yield takeLatest(MARK_QUESTION_API, markQuestion);
  yield takeLatest(ANSWER_QUESTION_API, answerQuestion);
  yield takeLatest(DELETE_QUESTION_API, deleteQuestion);
  yield takeLatest(UPDATE_QUESTION_API, updatedQuestion);
  yield takeLatest(GET_ALL_USER_QUESTION_API, getAllQuestionByUser);
  yield takeLatest(GET_ALL_MARKED_QUESTION_API, getAllMarkedQuestion);
  yield takeLatest(UNMARK_QUESTION_API, unMarkQuestion);
}
export const POST_QUESTION_API = "POST_QUESTION_API";
export const GET_ALL_QUESTION_API = "GET_ALL_QUESTION_API";
export const GET_ALL_USER_QUESTION_API = "GET_ALL_USER_QUESTION_API";
export const GET_QUESTION_API = "GET_QUESTION_API";
export const VOTE_QUESTION_API = "VOTE_QUESTION_API";
export const MARK_QUESTION_API = "MARK_QUESTION_API";
export const ANSWER_QUESTION_API = "ANSWER_QUESTION_API";
export const DELETE_QUESTION_API = "DELETE_QUESTION_API";
export const UPDATE_QUESTION_API = "UPDATE_QUESTION_API";
export const GET_ALL_MARKED_QUESTION_API = "GET_ALL_MARKED_QUESTION_API";
export const UNMARK_QUESTION_API = "UNMARK_QUESTION_API";

export default questionSaga;
