import MinTag from './src/tag.vue';

MinTag.install = function (Vue) {
    Vue.component(MinTag.name, MinTag);
};

export default MinTag;