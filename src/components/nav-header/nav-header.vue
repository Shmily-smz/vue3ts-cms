<template>
  <div class="container">
    <div class="nav-header">
      <div class="left">
        <el-icon>
          <component
            :is="!isFold ? 'Fold' : 'Expand'"
            @click="FoldClick"
          ></component>
        </el-icon>
        <mybreadcrump :branch="branch"></mybreadcrump>
      </div>
      <div class="right">
        <el-dropdown trigger="click">
          <p class="el-dropdown-link">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar
            ><span>{{ username }}</span>
          </p>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-icon> <component :is="'CircleClose'"></component> </el-icon
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item>
                <el-icon> <component :is="'User'"></component> </el-icon
                >用户信息</el-dropdown-item
              >
              <el-dropdown-item>
                <el-icon> <component :is="'HomeFilled'"></component> </el-icon
                >管理系统</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import { pathMapToMenu } from "../../utils/map-menu";
import { IStoreType } from "../../store/index";
import { useRouter, useRoute } from "vue-router";
import mybreadcrump from "../breadcrump/breadcrump.vue";
import {
  Fold,
  Expand,
  CircleClose,
  CircleCheck,
  User,
  HomeFilled,
} from "@element-plus/icons-vue";
export default defineComponent({
  emits: ["changeEmit"],
  components: {
    Fold,
    Expand,
    CircleClose,
    CircleCheck,
    User,
    HomeFilled,
    mybreadcrump,
  },
  setup(props, { emit }) {
    const store = useStore();
    const username = computed(() => store.state.login.userInfo.name);

    //侧边栏显示隐藏
    const isFold = ref(false);
    const FoldClick = () => {
      isFold.value = !isFold.value;
      emit("changeEmit", isFold.value);
    };

    const branch = computed(() => {
      //每次路由切换，都要重新获取branch数组
      const route = useRoute();
      //当前route的path
      const currentPath = route.path;
      //当前用户所拥有的所有菜单
      const userMenu = computed(() => store.state.login.userMenu);
      return pathMapToMenu(userMenu.value, currentPath, []);
    });

    return {
      FoldClick,
      isFold,
      username,
      branch,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
}
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
  }
}

.el-breadcrumb {
  color: white;
  margin-left: 20px;
}
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #ffffff !important;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
    color: #ffffff;
  }
}
</style>
