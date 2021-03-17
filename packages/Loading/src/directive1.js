import Vue from 'vue';
import Loading from './loading.vue';
import {
    addClass,
    removeClass,
    getStyle
} from '../../../src/utils/dom';
// import  from ''

const LoadingConstructor = Vue.extend(Loading);
const _directive = {};
_directive.install = Vue => {
    if (Vue.prototype.isServer) return;

    const handleLoading = (el, binding) => {
        if (binding.value) {
            Vue.nextTick(() => {
                if (binding.modifiers.fullscreen) {
                    el.originalPosition = getStyle(document.body, 'position');
                    el.originalOverflow = getStyle(document.body, 'overflow');
                    // el.loadingStyle.zIndex = 2001;

                    addClass(el.loading, 'is-loading-fullscreen');
                    insertDom(document.body, el, binding);
                } else {
                    removeClass(el.loading, 'is-loading-fullscreen');

                    if (binding.modifiers.body) {
                        el.originalPosition = getStyle(document.body, 'position');

                        ['top', 'left'].forEach(property => {
                            const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
                            el.loadingStyle[property] = el.getBoundingClientRect()[property] +
                                document.body[scroll] +
                                document.documentElement[scroll] -
                                parseInt(getStyle(document.body, `margin-${ property }`), 10) +
                                'px';
                        });
                        ['height', 'width'].forEach(property => {
                            el.loadingStyle[property] = el.getBoundingClientRect()[property] + 'px';
                        });

                        insertDom(document.body, el, binding);
                    } else {
                        el.originalPosition = getStyle(el, 'position');
                        insertDom(el, el, binding);
                    }
                }
            })
        } else {
            el.domVisible = false;
            const target = binding.modifiers.fullscreen || binding.modifiers.body ? document.body : el;
            removeClass(target, 'min-loading-parent');
            el.instance.visible = false;
            el.instance.hiding = true;
        }
    };

    const insertDom = (parent, el) => {
        if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility' !== 'hidden')) {
            Object.keys(el.loadingStyle).forEach(item => {
                el.loading.style[item] = el.loadingStyle[item];
            });

            if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
                addClass(parent, 'min-loading-parent');
            }
            el.domVisible = true;
            parent.appendChild(el.loading);
            Vue.nextTick(() => {
                if (!el.instance.hiding) {
                    el.instance.isshow = true;
                }
            })
            el.domInserted = true;
        } else if (el.domVisible && el.instance.hiding === true) {
            el.instance.isshow = true;
            el.instance.hiding = false;
        }
    }
    Vue.directive('loading', {
        bind: function (el, binding, vnode) {
            const _tip = el.getAttribute('min-loading-tip'),
                _icon = el.getAttribute('min-loading-icon'),
                _background = el.getAttribute('min-loading-background'),
                _className = el.getAttribute('min-loading-className'),
                _color = el.getAttribute('min-loading-color'),
                vm = vnode.context;

            const loading = new LoadingConstructor({
                el: document.createComment('div'),
                data: {
                    tip: vm && vm[_tip] || _tip,
                    icon: vm && vm[_icon] || _icon,
                    background: vm && vm[_background] || _background,
                    className: vm && vm[_className] || _className,
                    fullscreen: !!binding.modifiers.fullscreen,
                    color: vm && vm[_color] || _color
                }
            });
            el.instance = loading;
            el.loading = loading.$el;
            el.loadingStyle = {};
            binding.value && handleLoading(el, binding);

        },

        update: function (el, binding) {
            el.instance.handleTip(el.getAttribute('min-loading-tip'));
            if (binding.oldValue !== binding.value) handleLoading(el, binding);
        },

        unbind: function (el, binding) {
            if (el.domInserted) {
                el.loading && el.loading.parentNode && el.loading.parentNode.removeChild(el.loading);
                handleLoading(el, {
                    value: false,
                    modifiers: binding.modifiers
                });
            }
            el.instance && el.instance.$destroy();
        }
    })
}



export default _directive;