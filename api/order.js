import axios from "~/config/axios";
export default {
  createOrder(courseId) {
    return axios.request({
      url: `/orderService/order/createOrder/${courseId}`,
      method: 'post',
    });
  },
  getOrderInfo(orderNo) {
    return axios.request({
      url: `/orderService/order/getOrderInfo/${orderNo}`,
      method: 'get',
    });
  },
  createNative(orderNo) {
    return axios.request({
      url: `/orderService/payLog/createNative/${orderNo}`,
      method: 'post',
    });
  },
  getPayStatus(orderNo) {
    return axios.request({
      url: `/orderService/payLog/getPayStatus/${orderNo}`,
      method: 'get',
    });
  },
}
