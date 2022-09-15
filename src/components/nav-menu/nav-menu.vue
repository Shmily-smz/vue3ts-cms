<template>
  <!-- 左面侧边栏 -->
  <div class="nav-menu">
    <div :class="[isCollapse == true ? 'logo' : 'open']">
      <div><img src="~@/assets/img/timg.jpg" alt="" /></div>

      <span v-show="!isCollapse">黑马优购</span>
    </div>

    <!-- 菜单 -->
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="isCollapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type == 1">
          <el-sub-menu :index="item.id + ''">
            <!-- 二级菜单的名字 -->
            <template #title>
              <el-icon>
                <component :is="item.icon.slice(7)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 二级菜单可以展开的部分 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="menuItemClick(subItem)"
              >
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-if="item.type == 2">
          <el-menu-item>
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { IStoreType } from "../../store/index";
import { useRouter, useRoute } from "vue-router";
import { pathMapToMenu } from "../../utils/map-menu";
import {
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
} from "@element-plus/icons-vue";
export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  components: { Monitor, Setting, Goods, ChatLineRound },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const currentPath = route.path;
    const store = useStore<IStoreType>();
    const userMenu = computed(() => store.state.login.userMenu);

    const menu = pathMapToMenu(userMenu.value, currentPath);

    const defaultActive = ref(menu.id + "");

    //路由跳转
    const menuItemClick = (a: any) => {
      router.push(a.url);
    };

    return { userMenu, menuItemClick, defaultActive };
  },
});
</script>

<style lang="less" scoped>
.nav-menu {
  background-color: #001529;

  .logo {
    align-items: center;
    color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    padding: 10px 0;
    height: 70px;
    box-sizing: border-box;
    display: flex;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    p {
      font-size: 16px;
      font-weight: 700;
      color: white;
      float: left;
    }
  }

  .open {
    color: #fff;
    flex-direction: row;

    font-weight: bold;
    font-size: 18px;
    padding: 10px 0;
    height: 70px;
    box-sizing: border-box;

    div {
      height: 60px;

      display: inline-block;
      float: left;
      overflow: hidden;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        margin-left: 20px;
      }
    }

    span {
      font-size: 16px;
      display: inline-block;
      font-weight: 700;
      color: white;
      line-height: 60px;
      height: 60px;
    }
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu {
  border-right: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .content {
    background-color: #fff;
    border-radius: 8px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
