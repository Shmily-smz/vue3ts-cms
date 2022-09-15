import { createStore, Store, useStore as useVuexStore } from "vuex";
import login, { IloginState } from "./login/login";

//定义根（root）state的类型
export interface IRootState {
  name: string;
  age: number;
}

//定义模块的接口
export interface IRootWithModule {
  login: IloginState;
}

//联合类型定义既有root又有模块的接口
export type IStoreType = IRootState & IRootWithModule;

const store = createStore<IRootState>({
  state: { name: "aaa", age: 18 },
  mutations: {
    aa() {},
  },
  actions: {},
  modules: {
    login,
  },
});

//对vuex中的数据做初始化，当刷新的时候数据消失问题
export function setupStore() {
  store.dispatch("login/localvuex");
}

// export function useStore(): Store<IStoreType> {
//   return useVuexStore();
// }
export default store;
