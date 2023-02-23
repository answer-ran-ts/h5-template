
<template>
    <div></div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "authLogin",
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters(['token'])
    },
    created() {
        setTimeout(() => {
            if (!this.token) {
                this.authLogin()
            }
        }, 2000);
    },
    methods: {
        ...mapActions([
            'Login',
        ]),
        authLogin() {
            // 截取地址栏参数作为登录鉴权
            const { userId } = this.$tool.getUrl()
            console.log("userId：" + userId);
            console.log("鉴权登录中");
            this.Login({ userId }).then(res => {
                console.log("token：" + res.data);
                if (res.status !== 0) {
                    alert("用户鉴权失败")
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

