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
          <login-form @on-success-valid="handleSignSubmit" v-bind:meType="signNanme">
            <FormItem slot="catpch">
              <Row>
                <i-col span="18">
                  <i-input type="email" v-model="userEmail" :maxlength="20" placeholder="邮箱">
                    <span slot="prepend">
                      <Icon :size="14" type="ios-filing"></Icon>
                    </span>
                  </i-input>
                </i-col>
                <i-col span="1">
                  <i-button
                    type="primary"
                    :disabled="DisableEmail"
                    @click="sendEmailSubmit"
                  >{{vurifyValue}}</i-button>
                </i-col>
              </Row>
            </FormItem>
          </login-form>
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
      signNanme: "注册",
      DisableEmail: false,
      verifyCode: Number,
      userEmail: "@",
      vurifyValue: "验证码",
      endTime: 60
    };
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo", "handleSign", "sendEmail"]),
    handleSubmit({ userName, password, Captcha, uuid }) {
      if (password.indexOf(" ") != -1) {
        this.$message({
          type: "error",
          message: "密码中有空格!",
          showClose: true
        });
        return;
      }
      this.handleLogin({ userName, password, Captcha, uuid }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    },
    handleSignSubmit({ userName, password }) {
      if (password.indexOf(" ") != -1) {
        this.$message({
          type: "error",
          message: "密码中有空格!",
          showClose: true
        });
        return;
      }
      if (password.length < 6) {
        this.$message({
          type: "error",
          message: "密码过短!",
          showClose: true
        });
        return;
      }
      this.handleSign({
        email: this.userEmail,
        userName,
        password: password,
        verifyCode: this.verifyCode
      }).then(res => {
        if (res.data == true) {
          this.isLogin = !this.isLogin;
        } else {
          this.$message({
            type: "error",
            message: "注册失败!",
            showClose: true
          });
        }
      });
    },
    doSign() {
      this.isLogin = !this.isLogin;
    },
    sendEmailSubmit() {
      this.DisableEmail = true;
      let time = setInterval(() => {
        this.vurifyValue = this.endTime;
        this.endTime--;
        if (this.endTime == 0) {
          this.DisableEmail = false;
          this.endTime = 60;
          this.vurifyValue = "验证码";
          clearInterval(time);
        }
      }, 1000);

      const code = Math.floor(Math.random() * 10000 + 1000);
      this.verifyCode = code;
      this.sendEmail({ reciver: this.userEmail, verifyCode: code })
        .then(res => {
          this.$message({
            type: "success",
            message: "验证码以发送!",
            showClose: true
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: "发送失败!，请检查邮箱格式",
            showClose: true
          });
        });
    }
  }
};
</script>

<style>
</style>
