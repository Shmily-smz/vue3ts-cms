<template>
  <div class="user">
    <Search :searchFormConfig="searchFormConfig"></Search>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Search from "@/components/search/search.vue";
import { searchFormConfig } from "./config/searchConfig";
export default defineComponent({
  name: "user",
  components: {
    Search,
  },
  setup() {
    console.log(searchFormConfig);

    return { searchFormConfig };
  },
});
</script>

<style lang="less" scoped></style>
