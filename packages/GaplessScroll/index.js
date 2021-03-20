import MinGaplessScroll from './src/gapless-scroll';

MinGaplessScroll.install = function (Vue) {
    Vue.component(MinGaplessScroll.name, MinGaplessScroll);
};

export default MinGaplessScroll;