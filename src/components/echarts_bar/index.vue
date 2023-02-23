<!--
 * @Description:
 * @Date: 2022-04-11 16:08:17
 * @LastEditors: ranqi
 * @LastEditTime: 2022-09-05 11:16:38
-->
<template>
  <div v-if="isSeriesEmpty" style="color: #777">暂无数据</div>
  <chart-bar v-else v-bind="$props" />
</template>

<script>
import { isEmpty } from 'lodash'
import ChartBar from './EchartsBar.vue'
export default {
  name: 'EchartBar',
  props: ChartBar.props,
  components: {
    ChartBar
  },
  computed: {
    isSeriesEmpty() {
      return isEmpty(this.seriesData)
    }
  },
}
</script>
