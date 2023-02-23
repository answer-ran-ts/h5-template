import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible';
import Vant from 'vant';
import 'vant/lib/index.css';
import { VueAxios } from '@/utils/request'
import * as tool from '@/utils'
import req from '@/api/request/index.js'
import '@/libs/rem'
Vue.use(Vant);
Vue.use(VueAxios)
Vue.config.productionTip = false
Vue.prototype.$req = req
Vue.prototype.$tool = tool

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
