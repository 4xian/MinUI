import Vue from 'vue'
import App from './App.vue'
import '../styles/index.css'
import MinToast from "../packages/Toast/index";

Vue.config.productionTip = false;
Vue.prototype.$toast = MinToast;

new Vue({
  render: h => h(App),
}).$mount('#app')