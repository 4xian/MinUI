import MinButton from './src/button.vue';

MinButton.install = function (Vue) {
    Vue.component(MinButton.name, MinButton);
};

export default MinButton;