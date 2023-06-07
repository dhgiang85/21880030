import { BaseService } from "../../utils/baseService";

class tagService extends BaseService {
    getAllTag = ({ pageSize, pageNumber, search }) => {
        return this.get(
          `tag/all?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
        );
      };
}
const TagService = new tagService();

export default TagService;