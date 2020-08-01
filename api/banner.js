import axios from "~/config/axios";
export default {
  //查询前两条banner信息
  getBannerList() {
    return axios.request({
      url: `/cmsService/bannerFront/getAllBanner`,
      method: 'get',
    });
  },
}
