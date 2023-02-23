<template>
  <div class="content">
    <div class="echarts">
      <EchartsBar :seriesData="seriesData" :extraOption="extraOption" />
    </div>
    <van-button type="info" text="退出登录" @click="exit" />
  </div>
</template>

<script>
import EchartsBar from "@/components/echarts_bar/index.vue";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      seriesData: {
        datax: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datay: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      extraOption: {
        title: {
          text: '测试标题',
        },
      }
    };
  },
  components: {
    EchartsBar
  },
  methods: {
    ...mapActions(['Logout']),
    exit() {
      this.Logout().then(() => {
        this.$router.push('/login')
      })
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  font-size: .15rem;
  display: flex;
  flex-direction: column;

  .van-button {
    margin: 10px 0;
    text-align: center;
  }
}

.echarts {
  height: 1.25rem;
}
</style>