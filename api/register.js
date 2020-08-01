import axios from "~/config/axios";
export default {
  sendCode(phoneNumber) {
    return axios.request({
      url: `msmService/send/${phoneNumber}`,
      method: 'get',
    });
  },
  registerMember(memberForm) {
    return axios.request({
      url: `ucenterservice/member/register`,
      method: 'post',
      data:memberForm,
    });
  },

}
