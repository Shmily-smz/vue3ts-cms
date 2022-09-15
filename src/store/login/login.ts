import { Module } from "vuex";
import { IRootState } from "../index";
import {
  loginCountRequest,
  userInfoByIdrequest,
  userMenuByIdrequest,
} from "@/service/login/login";
import localStorage from "@/utils/localStorage";
import router from "@/router/index";
import { mapMenuToRoutes } from "../../utils/map-menu";
export interface IloginState {
  token: string;
  userInfo: object;
  userMenu: any;
}

//定义一个模块，模块的类型是module，里面需要传两个类型通过泛型的方式，一个是当前模块state的类型，一个是根的state的类型
const loginModule: Module<IloginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenu: [],
    };
  },
  actions: {
    async loginCountAction({ commit }, payload: any) {
      //登录
      const loginRes = await loginCountRequest(payload);
      const { id, token } = loginRes.data;
      commit("changeToken", token);
      localStorage.setItem("token", token);

      //请求用户信息
      const userInfoRes = await userInfoByIdrequest(id);
      const userInfo = userInfoRes.data;
      commit("changeUserInfo", userInfo);
      localStorage.setItem("userInfo", userInfo);

      //请求用户菜单
      const userMenuRes = await userMenuByIdrequest(id);
      const userMenu = userMenuRes.data;
      console.log(userMenu);
      commit("changeUserMenu", userMenu);
      localStorage.setItem("userMenu", userMenu);
      router.push("/main");
    },
    //每次刷新初始化vuex里面的数据
    localvuex({ commit }) {
      const token = localStorage.getItem("token");
      const userInfo = localStorage.getItem("userInfo");
      const userMenu = localStorage.getItem("userMenu");
      if (token) {
        commit("changeToken", token);
        commit("changeUserInfo", userInfo);
        commit("changeUserMenu", userMenu);
      }
    },
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenu(state, userMenu) {
      state.userMenu = userMenu;
      const routes = mapMenuToRoutes(userMenu);
      //返回的是一个一个路由对象的数组
      // router.addRoute("main",{
      //   path: "/category",
      //   component: category,
      // });
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
    },
  },
};
export default loginModule;
