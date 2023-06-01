import axios from "axios";
import { API_URL } from "../constants/index";

export class BaseService {
  get = (url) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "GET",
    });
  };
  put = (url, model) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "PUT",
      data: model,
    });
  };
  post = (url, model) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "POST",
      data: model,
    });
  };
  patch = (url, model) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "patch",
      data: model,
    });
  };
  delete = (url) => {
    return axios({
      url: `${API_URL}/${url}`,
      method: "DELETE",
    });
  };
}
