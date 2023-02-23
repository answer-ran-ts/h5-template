<template>
  <div class="content">
    <van-button type="info" @click="loginApp" text="登录" />
  </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: "formLogin",
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions([
      'Login',
    ]),
    loginApp() {
      if (this.token) {
        return
      }
      console.log("表单登录");
      const params = {
        name: '',
        password: ''
      }
      this.Login(params).then(res => {
        console.log("token：" + res.data);
        if (res.status !== 0) {
          alert("用户登录失败")
          return
        }
        console.log("登陆成功，正在跳转至首页...");
        this.$router.push('./')
      })
    }
  }
};
</script>
  
<style>
.content {
  font-size: .15rem;
}
</style>