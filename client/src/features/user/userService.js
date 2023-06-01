import { BaseService } from "../../utils/baseService";

class userService extends BaseService {
  getAllUser = ({ pageSize, pageNumber, search }) => {
    return this.get(
      `user/all?pageSize=${pageSize}&pageNumber=${pageNumber}&search=${search}`
    );
  };
  setActiveUser = ({ id, active }) => {
    return this.patch(`user/${id}/setActivate`, {active});
  };
  changeRoleUser = ({ id, role }) => {
    return this.patch(`user/${id}`, {role});
  };
  deleteUser = (id) => {
    return this.delete(`user/${id}`);    
  };
  updateProfile = (model) => {
    return this.patch(`user/profile`, model);
  }
}
const UserService = new userService();

export default UserService;
