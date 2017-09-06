// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuebar from 'vuebar'
import store from './store'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuebar)

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
