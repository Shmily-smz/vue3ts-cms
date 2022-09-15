import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js'
//定义四个拦截器的接口(函数)
interface wPrquestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (err: any) => any
}
//定义接口，继承就是对原来接口进行一个扩展，添加属性
interface mRequestConfig extends AxiosRequestConfig {
  interceptors?: wPrquestInterceptors
  showLoding?: boolean
}
const DEFAULT_LOAD = true
class wRequset {
  //axios实例的类型，是axios第三方库直接写好给我们的
  instance: AxiosInstance
  interceptor?: wPrquestInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  constructor(config: mRequestConfig) {   //这个config参数也是有类型的。这个类型是个接口，里面定义url，method等
    this.instance = axios.create(config)  //创建自己的axios实例（为的是每次new的时候每个不同的实例有不同的配置，比如baseurl）
    this.interceptor = config.interceptors  //初始化自己传入的四个拦截器
    this.showLoading = config.showLoding ?? true
    //下面的的拦截是：这个实例下，我传的拦截器都会执行，就是所有接口都需要的拦截器
    //请求拦截
    this.instance.interceptors.request.use(
      //请求发送成功执行的函数
      this.interceptor?.requestInterceptor,
      //请求发送失败执行的函数
      this.interceptor?.requestInterceptorCatch
    )
    //响应拦截
    this.instance.interceptors.response.use(
      //响应成功执行的函数
      this.interceptor?.responseInterceptor,
      //响应失败执行的函数
      this.interceptor?.responseInterceptorCatch,
    )

    //添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //console.log('所有的实例都有的拦截器：请求成功拦截');
        if (this.showLoading == true) {
          this.loading = ElLoading.service({
            text: "加载中...",
            lock: true,
            background: "rgba(0,0,0,0.5)"
          })
        }
        return config
      }, (err) => {
        //console.log('所有实例都有的拦截器：请求失败拦截');
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close()
        }, 1000);
        //console.log('所有的实例都有的拦截器：响应成功拦截');
        return res.data
      },
      (err) => {
        this.loading?.close()
        //console.log('所有实例都有的拦截器：相应失败拦截');
        return err
      }
    )
  }
  //返回的数据类型是Promise接口，但是返回的结果是什么类型，由开发者决定，Promise是一个接口，T是泛型，也就是泛型接口，就是定义接口里面的属性的类型
  request<T>(config: mRequestConfig): Promise<T> {
    //为什么要包裹一层promis，因为要在外面拿到结果，包裹一层后，外面可以通过.then拿到
    return new Promise((resolve, reject) => {
      //单独请求有的拦截器
      if (config.interceptors?.requestInterceptor) {
        //调用config内部函数返回config,进行拦截
        config = config.interceptors.requestInterceptor(config)
      }
      //如果有单个请求不需要loading,那就变为false，但是下次请求就还是false，所以在请求成功后再变为初始化值
      if (config.showLoding == false) {
        this.showLoading = config.showLoding
      }
      //进行网络请求
      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors.responseInterceptor(res)
        }
        this.showLoading = true
        resolve(res)
      }).catch((err) => {
        this.showLoading = true
        reject(err)
        return err
      })
    })
  }
}
export default wRequset
