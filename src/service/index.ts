import WRequest from './request/index'
import localStorage from '@/utils/localStorage'
import store from '@/store'
const wRequest = new WRequest({
  baseURL: "http://152.136.185.210:5000/",
  interceptors: {
    requestInterceptor: (config: any) => {
      //console.log("请求成功的拦截");
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (config) => {
      //console.log("请求失败的拦截");
      return config
    },
    responseInterceptor: (config) => {
      //console.log("响应成功的拦截");
      return config
    },
    responseInterceptorCatch: (config) => {
      //console.log("响应失败的拦截");
      return config
    },

  }
})

export default wRequest
