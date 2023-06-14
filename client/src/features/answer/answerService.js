import { BaseService } from "../../utils/baseService";

class answerService extends BaseService {
  getAllAnswer = ({ pageSize, pageNumber, search }) => {
    return this.get(
      `answer/all?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
  };
  getAllAnswerByQuestionId = ({ id }) => {
    return this.get(`question/${id}/answer`);
  };
  voteAnswer = ({ id, type }) => {
    return this.patch(`answer/vote/${id}`, { type });
  };
  markAnswer = ({ id }) => {
    return this.get(`answer/mark/${id}`);
  };
  acceptAnswer = ({ id }) => {
    return this.get(`answer/accept/${id}`);
  };
  getAllAnswerByUser = ({ pageSize, pageNumber, search }) => {
    return this.get(
      `answer/user?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
  };
  deleteAnswer = ({ id }) => {
    return this.delete(`answer/${id}`);
  };
  updateAnswer = ({ id, data }) => {
    return this.patch(`answer/${id}`, data);
  };
  getAnswerById = ({ id }) => {
    return this.get(`answer/${id}`);
  };
}
const AnswerService = new answerService();

export default AnswerService;
