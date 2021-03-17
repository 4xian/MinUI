import Vue from 'vue'
import App from './App.vue'
import '../styles/index.css'
import MinToast from "../packages/Toast/index";
import ScrollLoad from '../packages/ScrollLoad/index';

import Loading from '../packages/Loading/index';


Vue.config.productionTip = false;
Vue.prototype.$toast = MinToast;

Vue.use(ScrollLoad);
Vue.use(Loading);

new Vue({
  render: h => h(App),
}).$mount('#app')