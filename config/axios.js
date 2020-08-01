import axios from "axios"
import config from '~/config/index'
import cookie from 'js-cookie'
import {Message} from "element-ui";

const baseUrl = process.env.NODE_ENV === "development" ? config.baseURL.dev : config.baseUrl.pro;

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.queue = {}
  }

  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      header: {},
    };
  }

  interceptors(instance, url) {
    instance.interceptors.request.use((config) => {
      //配置修改
      if (cookie.get("user_token")) {
        config.headers['token'] = cookie.get('user_token');
      }
      // console.log(config)
      // console.log("请求已被拦截");
      return config;
    });
    instance.interceptors.response.use((res) => {
      // console.log("响应已被拦截")
      console.log(res)
      if (res.data.code!==20000){
        //没有登入，
        if (res.data.code===26006){
          let router =window.$nuxt.$router
          router.replace({
            path: "/login"
          })
        }
        if (res.data.code!==27000)
        Message({
          message:res.data.message||'error',
          type:"error",
          duration:5*1000,
        })

      }
      return res.data;
    }, (error) => {

      //请求失败
      console.log(error)
      return {error: "网络出错了"}
      // return Promise.reject(error.response.data);
    });
  }

  request(options) {
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options);
    this.interceptors(instance, options.url);
    //返回一个包装好的promise对象
    return instance(options);
  }
}

const axiosObj = new HttpRequest(baseUrl);
export default axiosObj
