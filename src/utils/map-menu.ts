import { getInnerRange } from "@vue/compiler-core";
import { RouteRecordRaw } from "vue-router";

//传过来的参数就是每个角色所有的菜单（userMenu）,返出去的就是routes的数组里面是一个一个的router{path:"",components:""}
export function mapMenuToRoutes(useMenu: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  //先去加载默认的所有的routes，就是在router文件夹下的一个个的route文件，要是不会用webpack，那还不如一个文件夹里面放所有的router，拿到数组直接完事
  //通过遍历数组去找path==url的然后把匹配好的数组传出去，然后添加路由，直接完事
  const allRoutes: any[] = [];
  //webpack中查找main文件下的.ts文件，第二个参数代表是否递归，查找匹配到的文件
  const routeFiles = require.context("../router/main", true, /\.ts/);
  //这个routeFiles.keys();就是一个包含所有.ts文件在router/main的地址的数组
  //./system/user/user/ts，./story/chat/chat.ts这种的
  routeFiles.keys().forEach((key) => {
    //加载文件，一个一个模块，就是导出的数据
    const route = require("../router/main" + key.split(".")[1]);
    //allRoutes保存着所有的菜单列表
    //因为拿到的是一个一个的模块，所以通过.default拿到路由
    allRoutes.push(route.default);
  });

  //根据菜单获取需要添加的routes，这个menus参数就是每个角色有的菜单
  const getRoute = (menus: any[]) => {
    //遍历每个角色有的菜单
    for (const menu of menus) {
      //找到每个角色有的菜单里面可以路由跳转的项
      if (menu.type == 2) {
        //在总的路由菜单里面找，如果匹配上就放到传出去的路由菜单中
        const route = allRoutes.find((route) => route.path == menu.url);
        route && routes.push(route);
      } else {
        getRoute(menu.children);
      }
    }
  };
  //把传过来的用户列表找到和所有的菜单进行匹配，匹配成功的放到routes数组里
  getRoute(useMenu);

  return routes;
}

export function pathMapToMenu(
  menus: any[],
  currentPath: string,
  branch?: any[]
): any {
  //遍历所有的menu菜单选项
  for (const menu of menus) {
    if (menu.type == 1) {
      //去找二级菜单是否和链接上的一样，如果是就return然后跳出来
      const findmenu = pathMapToMenu(menu.children ?? [], currentPath);
      if (findmenu) {
        branch?.push({ name: menu.name, aa: "adsafaewf" });
        branch?.push({ name: findmenu.name });
        if (branch != undefined) {
          return branch;
        } else {
          return findmenu;
        }
      }
    } else if (menu.type == 2 && menu.url == currentPath) {
      return menu;
    }
  }
}
