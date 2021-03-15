import Gotop from './src/gotop.vue';

/* istanbul ignore next */
Gotop.install = function (Vue) {
    Vue.component(Gotop.name, Gotop);
};

export default Gotop;