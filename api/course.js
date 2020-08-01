import axios from "~/config/axios";
export default {
  getCoursePage(page,size,params) {
    return axios.request({
      url: `eduService/courseFront/pageConditionList/${page}/${size}`,
      method: 'post',
      data:params,
    });
  },
  getAllSubject() {
    return axios.request({
      url: `/eduService/subject/list`,
      method: 'get',
    });
  },
  getCourseInfo(courseId){
    return axios.request({
      url: `/eduService/courseFront/getCourseInfo/${courseId}`,
      method: 'get',
    });
  }
}
