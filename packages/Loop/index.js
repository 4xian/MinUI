import MinLoop from './src/loop';

/* istanbul ignore next */
MinLoop.install = function (Vue) {
    Vue.component(MinLoop.name, MinLoop);
};

export default MinLoop;