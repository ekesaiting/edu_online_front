import axios from "~/config/axios";
export default {
  login(loginForm) {
    return axios.request({
      url: `ucenterService/member/login`,
      method: 'post',
      data:loginForm,
    });
  },
  getMemberInfo() {
    return axios.request({
      url: `ucenterService/member/getMemberInfo`,
      method: 'get',
    });
  },
}
