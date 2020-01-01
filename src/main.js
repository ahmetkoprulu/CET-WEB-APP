import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app')