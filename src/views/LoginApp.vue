<template>
    <div class="content">
      <div class="echarts">
        <EchartsBar :seriesData="seriesData" :extraOption="extraOption" />
      </div>
      <van-button loading type="info" loading-text="加载中..." />
    </div>
  </template>
  
  <script>
  import EchartsBar from "@/components/echarts_bar/index.vue";
  export default {
    name:"loginApp",
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
  };
  </script>
  
  <style>
  .content {
    font-size: .15rem;
  }
  
  .echarts {
    height: 1.25rem;
  }
  </style>