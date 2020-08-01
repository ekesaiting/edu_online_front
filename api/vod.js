import axios from "~/config/axios";
export default {
  getPlayAuth(vodId) {
    return axios.request({
      url: `vodService/getPlayAuth/${vodId}`,
      method: 'get',
    });
  },
}
