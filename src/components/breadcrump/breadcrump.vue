<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in branch" :key="item.name">{{
      item.name
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
interface IBreadcrumb {
  name: string;
  path?: string;
}

import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    branch: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => {
        return [];
      },
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #ffffff !important;
}
</style>
