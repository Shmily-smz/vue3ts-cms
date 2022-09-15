<template>
  <div class="loginPanel">
    <div class="left">
      <el-tabs type="border-card" stretch>
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-user-solid"></i>账号登录</span>
          </template>
          <login-count></login-count>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span><i class="el-icon-mobile-phone"></i>手机登录</span>
          </template>
          <loginPhone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="right">
      <div class="test">黑马优购商场</div>
      <div class="test">后台管理系统</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import loginCount from "./login-count.vue";
import loginPhone from "./login-phone.vue";
export default defineComponent({
  components: {
    loginCount,
    loginPhone,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.loginPanel {
  width: 718px;
  height: 456px;
  display: flex;
  flex-direction: row;
  background: #fff;
  align-items: center;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: -6px 4px 20px 0 rgba(44, 50, 64, 0.08);
  .left {
    width: 500px;
    height: 370px;
    padding: 40px 43px 48px;
  }
  .right {
    width: 218px;
    min-width: 218px;
    height: 456px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    position: relative;
    background: url("../../../assets/img/图层 0.png");
    display: flex;
    justify-content: center;
    align-items: center;
    .test {
      width: 30px;
      font-size: 28px;
      font-weight: bold;
      color: #fff;
      line-height: 40px;
      margin-left: 10px;
    }
  }
}
.el-tabs {
  box-shadow: none;
  i {
    padding-right: 5px;
  }
  .el-tabs__content {
    margin-top: 10px;
  }
}
</style>
