<style lang="less">
  @import './login.less';
</style>

<template>
    <div class="login">
      <div class="login-con">
        <Card icon="log-in" title="欢迎登录" :bordered="false">
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
          <div class="text-center p-t-136">
				<a class="txt2" href="http://www.beian.miit.gov.cn/" target="_blank" style="text-decoration:underline;">
				  鄂ICP备20004325号
				</a>
		</div>
    </div>
</template>

<script type="text/ecmascript-6">
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
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
      console.log('sign');
      this.$router.push({
            name: 'sign'
      })
    }
  }
}
</script>

<style>

</style>
