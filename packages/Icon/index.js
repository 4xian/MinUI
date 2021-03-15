import MinIcon from './src/icon.vue';

/* istanbul ignore next */
MinIcon.install = function (Vue) {
    Vue.component(MinIcon.name, MinIcon);
};

export default MinIcon;