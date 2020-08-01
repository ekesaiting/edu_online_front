import axios from "~/config/axios";
export default {

  getTeacherPage(page,size) {
    return axios.request({
      url: `eduService/teacherFront/getTeacherPage/${page}/${size}`,
      method: 'get',
    });
  },
  getTeacherInfo(teacherId) {
    return axios.request({
      url: `eduService/teacherFront/getTeacherFrontInfo/${teacherId}`,
      method: 'get',
    });
  },
}
