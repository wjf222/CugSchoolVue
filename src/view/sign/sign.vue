<style lang="less">
  @import './sign.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎注册" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          
          <div class="text-center p-t-136">
					  <a class="txt2" @click="doSign" target="_blank" style="text-decoration:underline;">
							还没有账号？立即注册
					  </a>
				  </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import SignForm from '_c/sign-form'
import { mapActions } from 'vuex'
export default {
  components: {
    SignForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    },
    doSign(){
      this.$router.push({
            name: 'sign'
      })
    }
  }
}
</script>

<style>

</style>
