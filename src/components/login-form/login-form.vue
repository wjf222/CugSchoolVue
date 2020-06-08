<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <i-Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-Input>
    </FormItem>
    <FormItem prop="password">
      <i-Input type="password" v-model="form.password" :maxlength="16" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </i-Input>
    </FormItem>
    <slot name="catpch">
      <FormItem prop="password" style="text-align:center">
        <img :src="CaptchaUrl" @click="refresh" />
      </FormItem>
    </slot>
    <FormItem prop="userName">
      <i-Input v-model="form.Captcha" placeholder="请输入验证码">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </i-Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>{{meType}}</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "LoginForm",
  props: {
    meType: String,
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    },
    emailRules:{
      type: Array,
      default: () => {
        return  [
          { required: true, message: "邮箱格式不正确", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      }
    }
  },
  data() {
    return {
      form: {
        userName: "super_admin",
        password: "",
        Captcha: ""
      },
      CaptchaUrl: "http://39.99.203.80:8080/captcha.jpg?uuid=130",
      uuid: "130"
    };
  },
  created() {
    this.refresh();
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        email:this.emailRules,
      };
    },
    imgUrl() {
      return this.CaptchaUrl + this.uuid;
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-valid", {
            userName: this.form.userName,
            password: this.form.password,
            Captcha: this.form.Captcha,
            uuid: this.uuid
          });
        }
      });
    },
    refresh() {
      const t = Math.floor(Math.random() * 1000 + 1);
      this.uuid = t;
      this.CaptchaUrl = "http://39.99.203.80:8080/captcha.jpg?uuid=" + t;
    }
  }
};
</script>
