<template>
  <div class="user">
    <!-- 组件之间得V-model为了维护组件内外数据得同步，子组件这个值改了，父组件也得改 -->
    <wForm :formItems="searchFormConfig.formItems" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>
      <template #footer>
        <div class="footer">
          <el-button type="primary">
            <el-icon class="elicon">
              <component :is="'Search'"></component> </el-icon
            >搜索</el-button
          >
          <el-button>
            <el-icon> <component :is="'RefreshLeft'"></component> </el-icon
            >重置</el-button
          >
        </div>
      </template>
    </wForm>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import wForm from "../form/form.vue";
import { RefreshLeft, Search } from "@element-plus/icons-vue";
export default defineComponent({
  name: "user",
  props: ["searchFormConfig"],
  components: {
    wForm,
    RefreshLeft,
    Search,
  },
  setup() {
    const formData = ref({
      name: "",
      password: "",
      sport: "",
      createTime: "",
    });
    return {
      formData,
    };
  },
});
</script>

<style lang="less" scoped>
.user {
  background-color: #fff;
}
.header {
  text-align: center;
  padding: 30px 0 20px;
  font-size: 20px;
}
.footer {
  padding: 20px 30px 30px 0;
  .el-button {
    float: right;
    margin-left: 20px;
    .el-icon {
      margin-right: 3px;
    }
  }
  &::after {
    content: "";
    clear: both;
    display: block;
  }
}
</style>
