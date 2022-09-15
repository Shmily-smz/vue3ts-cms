<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form label-width="100px">
      <el-row>
        <template v-for="(item, index) in formItems" :key="index">
          <!-- :span="8" -->
          <el-col v-bind="colLayout">
            <template v-if="item.type == 'input' || item.type == 'password'">
              <el-form-item :label="item.label" :rules="item.rules">
                <el-input
                  :placeholder="item.Placeholder"
                  :show-password="item.type == 'password'"
                  v-model="formData[`${item.field}`]"
                ></el-input>
              </el-form-item>
            </template>
            <template v-else-if="item.type == 'select'">
              <el-form-item :label="item.label">
                <el-select
                  :placeholder="item.Placeholder"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="item2 in item.option"
                    :key="item2.id"
                    :value="item2.title"
                    >{{ item2.title }}</el-option
                  >
                </el-select>
              </el-form-item>
            </template>

            <template v-else-if="item.type == 'datePicker'">
              <el-form-item :label="item.label">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                </el-date-picker>
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, ref } from "vue";

type IFormType = "input" | "password" | "select" | "datePicker";
interface IFormItem {
  field: string;
  type: IFormType;
  label: string;
  rules?: any[];
  Placeholder: string;
  //针对select
  option?: any[];
  //针对特殊属性
  otherOptions?: any;
}

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => {
        return [];
      },
    },
    colLayout: {
      type: Object,
      default: {
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6,
        xs: 24,
      },
    },
    modelValue: {
      type: Object,
      require: true,
    },
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const formData = ref({
      ...props.modelValue,
    });
    console.log(props.formItems);

    watch(
      formData,
      (newValue) => {
        emit("update:modelValue", newValue);
      },
      {
        deep: true,
      }
    );
    return { formData };
  },
});
</script>

<style lang="less" scoped>
.el-form-item {
  padding: 15px 30px 15px;
  margin-bottom: 0px !important;
}
</style>
