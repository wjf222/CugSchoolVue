<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false" v-if="isLogin">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" v-bind:meType="loginName"></login-form>
          <div class="text-center p-t-136">
            <a
              class="txt2"
              @click="doSign"
              target="_blank"
              style="text-decoration:underline;"
            >还没有账号？立即注册</a>
          </div>
        </div>
      </Card>
      <Card icon="log-in" title="欢迎注册" :bordered="false" v-if="!isLogin">
        <div class="form-con">
          <login-form @on-success-valid="handleSignSubmit" v-bind:meType="signNanme"></login-form>
          <div class="text-center p-t-136">
            <a
              class="txt2"
              @click="doSign"
              target="_blank"
              style="text-decoration:underline;"
            >已有帐号？立刻登录</a>
          </div>
        </div>
      </Card>
    </div>
    <div class="text-center p-t-136">
      <a
        class="txt2"
        href="http://www.beian.miit.gov.cn/"
        target="_blank"
        style="text-decoration:underline;"
      >鄂ICP备20004325号</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import LoginForm from "_c/login-form";
import { mapActions } from "vuex";
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      isLogin: true,
      loginName: "登录",
      signNanme: "注册"
    };
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo", "handleSign"]),
    handleSubmit({ userName, password, Captcha, uuid }) {
      this.handleLogin({ userName, password, Captcha, uuid }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    },
    handleSignSubmit({ userName, password }) {
      this.handleSign({ userName, password }).then(res => {
        if (res.data == true) {
          this.isLogin = !this.isLogin;
        } else {
          alert("注册成功");
        }
      });
    },
    doSign() {
      this.isLogin = !this.isLogin;
    }
  }
};
</script>

<style>
</style>
