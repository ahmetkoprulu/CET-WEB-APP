import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/UserModule'
import BootstrapVue from "bootstrap-vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend
} from "vee-validate";
import {
  min,
  required,
  email
} from "vee-validate/dist/rules";
extend("required", required);
extend("min", min);
extend("email", email);
import VueSweetalert2 from "vue-sweetalert2";
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

Vue.use(VueSidebarMenu)

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2, {
  includeCss: false
});
Vue.use(Vuex)

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

export default new Vuex.Store({
  modules:{
    user: UserModule
  }
})