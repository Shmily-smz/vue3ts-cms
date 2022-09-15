<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '70px' : '200px'">
        <navMenu :isCollapse="isCollapse"></navMenu>
      </el-aside>
      <el-container class="page">
        <el-header
          ><nav-header @changeEmit="changeEmit"></nav-header
        ></el-header>
        <el-main class="page-content"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import localStorage from "../../utils/localStorage";
import { useRouter } from "vue-router";
import navMenu from "../../components/nav-menu/nav-menu.vue";
import navHeader from "../../components/nav-header/nav-header.vue";
export default defineComponent({
  components: {
    navMenu,
    navHeader,
  },
  setup() {
    const router = useRouter();
    let isCollapse = ref(false);
    //退出登录
    const back = () => {
      localStorage.clearAllItem();
      router.push("/login");
    };

    const changeEmit = (isFold: boolean) => {
      isCollapse.value = isFold;
      console.log(isCollapse);
    };
    return {
      back,
      changeEmit,
      isCollapse,
    };
  },
});
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    color: #fff;
    font-size: 20px;
    height: 70px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  .el-aside {
    background-color: #333744;
    height: 100%;
    transition: width 0.3s linear;
  }

  .el-main {
    background-color: #eaedf1;
  }

  .el-container {
    height: 100%;
  }
}
</style>
