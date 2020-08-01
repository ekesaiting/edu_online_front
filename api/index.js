import axios from "~/config/axios";
export default {

  getindexInfo() {
    return axios.request({
      url: `eduService/FrontIndex/getIndexInfo`,
      method: 'get',
    });
  },
}
