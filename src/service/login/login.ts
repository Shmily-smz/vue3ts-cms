import wRequest from '../index'

interface Icount {
  name: string;
  password: string
}
interface ILoginResult {
  id: number,
  name: string
  token: string
}
interface IDataType<T = any> {
  code: number,
  data: T
}

//登录
export function loginCountRequest(count: Icount) {
  return wRequest.request<IDataType<ILoginResult>>({
    url: "/login",
    method: "post",
    data: count
  })
}

//请求用户信息
export function userInfoByIdrequest(id: number) {
  return wRequest.request<IDataType>({
    url: "/users/" + id,
    method: "get"
  })
}
//请求用户菜单
export function userMenuByIdrequest(id: number) {
  return wRequest.request<IDataType>({
    url: "/role/" + id + '/menu',
    method: "get"
  })
}
