import { BaseService } from "../../utils/baseService";

class questionService extends BaseService {
  getAllQuestion = ({ pageSize, pageNumber, search }) => {
    return this.get(
      `question/all?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
  };
  getAllQuestionByUser = ({ pageSize, pageNumber, search }) => {
    return this.get(
      `question/user?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
  };
  postQuestion = (data) => {
    return this.post(`question/create`, data);
  };
  updateQuestion = ({ id, data }) => {
    return this.patch(`question/${id}`, data);
  };
  getQuestionById = ({ id }) => {
    return this.get(`question/${id}`);
  };
  voteQuestion = ({ id, type }) => {
    return this.patch(`question/vote/${id}`, { type });
  };
  markQuestion = ({ id }) => {
    return this.get(`question/mark/${id}`);
  };
  answerQuestion = ({ id, content }) => {
    return this.post(`question/answer/${id}`, { content });
  };
  deleteQuestion = ({ id }) => {
    return this.delete(`question/${id}`);
  };
  getAllMarkedQuestion = ({ pageSize, pageNumber, search }) => {
    return this.get(
      `question/bookmark?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
  };
  getAllQuestionByTag = ({ pageSize, pageNumber, id }) => {
    return this.get(
      `question/tag/${id}/?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  };
  unMarkQuestion = ({ id }) => {
    return this.delete(`question/mark/${id}`);
  };
}
const QuestionService = new questionService();

export default QuestionService;
