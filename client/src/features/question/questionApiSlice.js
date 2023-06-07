import { call, put, takeLatest } from "redux-saga/effects";
import { setError, setLoading, setSucess } from "../loader/loaderSlice";
import QuestionService from "./questionService";
import { setQuestions, setCurrentQuestion } from "./questionSlice";

function* createQuestion(action) {
  try {
    yield put(setLoading());

    const { data, status } = yield call(
      QuestionService.postQuestion,
      action.payload
    );
    console.log(data);
    if (data.success) {
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* getAllQuestion(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      QuestionService.getAllQuestion,
      action.payload
    );
    console.log(data);
    if (data.success) {
      yield put(setQuestions(data));
      yield put(setSucess(data.message));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
// function* deleteCampaign(action) {
//   try {
//     const { data, status } = yield call(
//       CampaignService.deleteCampaign,
//       action.payload
//     );
//     if (data.success) {
//       yield put(setSucess(data.message));
//       const updatedCampaigns = yield call(CampaignService.getAllCampaign, {
//         pageSize: 8,
//         pageNumber: action.payload.currentPage,
//       });
//       if (updatedCampaigns.status === 200) {
//         if (updatedCampaigns.data.success) {
//           yield put(setCampaigns(updatedCampaigns.data));
//         } else {
//           yield put(setError(updatedCampaigns.data.message));
//         }
//       }
//     } else {
//       yield put(setError(data.message));
//     }
//   } catch (error) {
//     yield put(setError(error.response.data.message));
//   }
// }
function* getQuestion(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      QuestionService.getQuestionById,
      action.payload
    );

    if (status === 200) {
      if (data.success) {
        yield put(setCurrentQuestion(data.question));
      } else {
        yield put(setError(data.message));
      }
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
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
      yield put(setCurrentQuestion(data.question));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    yield put(setError(error.response.data.message));
  }
}
function* markQuestion(action) {
  try {
    yield put(setLoading());
    const { data, status } = yield call(
      QuestionService.markQuestion,
      action.payload
    );
    console.log(data);
    if (data.success) {
      yield put(setCurrentQuestion(data.question));
    } else {
      yield put(setError(data.message));
    }
  } catch (error) {
    
    yield put(setError(error.response.data.message));
  }
}
// function* updateCampaign(action) {
//   try {
//     yield put(setLoading());
//     const { data, status } = yield call(
//       CampaignService.updateCampaign,
//       action.payload
//     );
//     if (data.success) {
//       yield put(setSucess(data.message));
//       yield put(setUpdated(true));
//     } else {
//       yield put(setError(data.message));
//     }
//   } catch (error) {
//     yield put(setError(error.response.data.message));
//   }
// }
function* questionSaga() {
  yield takeLatest(POST_QUESTION_API, createQuestion);
  yield takeLatest(GET_ALL_QUESTION_API, getAllQuestion);
  yield takeLatest(GET_QUESTION_API, getQuestion);
  yield takeLatest(VOTE_QUESTION_API, voteQuestion);
  yield takeLatest(MARK_QUESTION_API, markQuestion);
}
export const POST_QUESTION_API = "POST_QUESTION_API";
export const GET_ALL_QUESTION_API = "GET_ALL_QUESTION_API";
export const GET_QUESTION_API = "GET_QUESTION_API";
export const VOTE_QUESTION_API = "VOTE_QUESTION_API";
export const MARK_QUESTION_API = "MARK_QUESTION_API";

export default questionSaga;
