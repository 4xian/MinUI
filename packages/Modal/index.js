import MinModal from './src/modal.vue';

MinModal.install = function (Vue) {
    Vue.component(MinModal.name, MinModal);
};

export default MinModal;