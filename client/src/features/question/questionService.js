import { BaseService } from "../../utils/baseService";

class questionService extends BaseService {
  getAllQuestion = ({ pageSize, pageNumber, search }) => {
    return this.get(
      `question/all?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
  };
  postQuestion = (data) => {
    return this.post(`question/create`, data);
  };
  ;
  getQuestionById = ({id}) => {
    return this.get(`question/${id}`);
  };
  voteQuestion = ({id, type}) => {
    return this.patch(`question/vote/${id}`, {type});
  }
  markQuestion = ({id}) => {
    return this.get(`question/mark/${id}`);
  }
}
const QuestionService = new questionService();

export default QuestionService;
