import listview from '../listview'
import Vue from 'vue'
import { post,get } from '../axios/config'
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#listview',
  render: h => h(listview)
})