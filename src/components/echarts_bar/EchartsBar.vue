<!--
 * @Description:
 * @Date: 2022-04-11 16:09:15
 * @LastEditors: ranqi
 * @LastEditTime: 2022-04-22 10:05:48
-->
<template>
  <div class="chart"></div>
</template>

<script>
import { merge } from 'lodash'
import * as echarts from 'echarts'
import { BASIC_OPTION } from './default_option'
import ResizeListener from 'element-resize-detector'

export default {
  name: 'ChartBar',
  props: {
    // seriesData中包含了datax,datay
    seriesData: {
      type: Object,
      required: true,
      default: () => {}
    },
    extraOption: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chart: null
    }
  },
  created () {
  },
  watch: {
    seriesData: {
      deep: true,
      handler () {
        this.updateChartView()
      }
    }
  },
  mounted () {
    this.chart = echarts.init(this.$el)
    this.updateChartView()
    window.addEventListener('resize', this.handleWindowResize)
    this.addChartResizeListener()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleWindowResize)
  },
  methods: {
    /**
     *将业务数据加入到基础样式配置中
     *@returns {Object}完整的echart配置
     */
    assembleDataToOption () {
      // 由于echarts版本的迭代，这里的写法也有稍许改变
      return merge(
        {},
        BASIC_OPTION,
        {
          series: [{ data: this.seriesData.datay }]
        },
        {
          xAxis: [{ data: this.seriesData.datax }]
        },
        this.extraOption
      )
    },

    /**
     *对chart元素尺寸进行监听，当发生变化时同步更新echart视图
     */
    addChartResizeListener () {
      const instance = ResizeListener({
        strategy: 'scroll',
        callOnAdd:true
      })

      instance.listenTo(this.$el, () => {
        if (!this.chart) return
        this.chart.resize()
      })
    },

    /**
     *更新echart视图
     */
    updateChartView () {
      if (!this.chart) return
      const fullOption = this.assembleDataToOption()
      this.chart.setOption(fullOption, true)
    },

    /**
     *当窗口缩放时，echart动态调整自身大小
     */
    handleWindowResize () {
      if (!this.chart) return
      this.chart.resize()
    }
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
