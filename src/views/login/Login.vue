<template>
  <div class="container">
    <div class="bg">
      <div class="bg-img">
        <loginPanle />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import loginPanle from "../login/cpns/login-panel.vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    loginPanle,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .bg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background: url("../../assets/img/background2.671f925a.png");
    .bg-img {
      height: 100%;
      width: 1190px;
      background: url("../../assets/img/background1.18859f01.png");
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
