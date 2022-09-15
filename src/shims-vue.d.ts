/* eslint-disable */
//declare把.vue结尾的文件声明成一个模块的类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
