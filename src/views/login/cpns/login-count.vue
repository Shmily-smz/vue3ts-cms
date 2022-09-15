<template>
  <div class="loginCount">
    <el-form :model="ruleForm" label-width="60px" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="ruleForm.name"> </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" show-password> </el-input>
      </el-form-item>
      <div class="rember-mima">
        <el-checkbox v-model="isKeepmima">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-btn" @click="handleLoginClick"
        >登录</el-button
      >
      <p>您也可以使用 <span> 微信登录 </span> | <span> QQ登录</span></p>
      <p>没有账号？ 去<span>联系管理员</span></p>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm } from "element-plus";
import localStorageFn from "../../../utils/localStorage";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const ruleForm = reactive({
      name: localStorageFn.getItem("name") ?? "",
      password: localStorageFn.getItem("password") ?? "",
    });
    //这个叫组件类型
    const formRef = ref<InstanceType<typeof ElForm>>();
    const rules = {
      name: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
        {
          min: 3,
          max: 13,
          message: "Length should be 3 to 5",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input your password",
          trigger: "blur",
        },
        {
          min: 3,
          max: 13,
          message: "Length should be 3 to 5",
          trigger: "blur",
        },
      ],
    };
    const isKeepmima = ref(true);
    const handleLoginClick = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepmima.value == true) {
            localStorageFn.setItem("name", ruleForm.name);
            localStorageFn.setItem("password", ruleForm.password);
          } else {
            localStorageFn.removeItem("name");
            localStorageFn.removeItem("password");
          }
          store.dispatch("login/loginCountAction", ruleForm);
        }
      });
    };
    return { ruleForm, rules, isKeepmima, formRef, handleLoginClick };
  },
});
</script>

<style lang="less" scoped>
.loginCount {
  margin-top: 10px;
  .rember-mima {
    justify-content: space-between;
    display: flex;
  }
  .login-btn {
    width: 380px;
    height: 40px;
    background: #0b2fb5;
    border-radius: 8px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    line-height: 14px;
    cursor: pointer;
    border: none;
    outline: none;
    margin-bottom: 5px;
    margin-top: 40px;
  }
  p {
    margin-top: 15px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 14px;
  }
  span {
    color: #0b2fb5;
    cursor: pointer;
  }
}
</style>
