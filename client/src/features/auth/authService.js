import { BaseService } from "../../utils/baseService";

class authService extends BaseService {
  loginUser = (userForm) => {
    return this.post("auth/login", userForm);
  };
  logoutUser = () => {
    return this.get("auth/logout");
  };
  registerUser = (userForm) => {
    return this.post("auth/register", userForm);
  };
  requestResetPassword = (userForm) => {
    return this.post("auth/reset_password_request",userForm);          
  };
  resetPassword = (userForm) => {
    return this.post("auth/reset_password",userForm);          
  }
}
const AuthService = new authService();

export default AuthService;