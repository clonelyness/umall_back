<template>
  <div class="login">
    <div class="box">
      <h2 class="center">登录</h2>
      <div class="line">
        <el-input
          placeholder="请输入账号"
          v-model="form.username"
          clearable
        ></el-input>
      </div>
      <div class="line">
        <el-input
          placeholder="请输入密码"
          v-model="form.password"
          clearable
          show-password
        ></el-input>
      </div>
      <div class="center line">
        <el-button type="primary" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "../../utils/request";
import { successAlert, warningAlert } from "../../utils/alert";

export default {
  props: [],
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo:'userInfo'
    }),
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:'changeUserInfoAction'
    }),

    login() {
      reqLogin(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("登陆成功");

          // 存res.data.list供后续使用(状态层和本地都存)
          this.changeUserInfoAction(res.data.list)
           

          //跳转
          this.$router.push('/')

        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.box {
  width: 400px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 20px;
}
.center {
  text-align: center;
}
.line {
  margin-top: 10px;
  width: 400px;
}
</style>