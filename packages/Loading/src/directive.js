import Vue from 'vue';
import Loading from './loading.vue';
import {
    addClass,
    removeClass,
    getStyle
} from '../../../src/utils/dom';
import {
    PopupManager
} from '../../../src/utils/popup';
import afterLeave from '../../../src/utils/after-leave';
const Mask = Vue.extend(Loading);

const loadingDirective = {};
loadingDirective.install = Vue => {
    if (Vue.prototype.$isServer) return;
    const toggleLoading = (el, binding) => {
        if (binding.value) {
            Vue.nextTick(() => {
                if (binding.modifiers.fullscreen) {
                    el.originalPosition = getStyle(document.body, 'position');
                    el.originalOverflow = getStyle(document.body, 'overflow');
                    el.maskStyle.zIndex = PopupManager.nextZIndex();

                    addClass(el.mask, 'is-loading-fullscreen');
                    insertDom(document.body, el, binding);
                } else {
                    removeClass(el.mask, 'is-loading-fullscreen');

                    if (binding.modifiers.body) {
                        el.originalPosition = getStyle(document.body, 'position');

                        ['top', 'left'].forEach(property => {
                            const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
                            el.maskStyle[property] = el.getBoundingClientRect()[property] +
                                document.body[scroll] +
                                document.documentElement[scroll] -
                                parseInt(getStyle(document.body, `margin-${ property }`), 10) +
                                'px';
                        });
                        ['height', 'width'].forEach(property => {
                            el.maskStyle[property] = el.getBoundingClientRect()[property] + 'px';
                        });

                        insertDom(document.body, el, binding);
                    } else {
                        el.originalPosition = getStyle(el, 'position');
                        insertDom(el, el, binding);
                    }
                }
            });
        } else {
            afterLeave(el.instance, () => {
                if (!el.instance.hiding) return;
                el.domVisible = false;
                const target = binding.modifiers.fullscreen || binding.modifiers.body ?
                    document.body :
                    el;
                removeClass(target, 'min-loading-parent');
                // removeClass(target, 'el-loading-parent--hidden');
                el.instance.hiding = false;
            }, 300, true);
            el.instance.isshow = false;
            el.instance.hiding = true;
        }
    };
    const insertDom = (parent, el) => {
        if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
            Object.keys(el.maskStyle).forEach(property => {
                el.mask.style[property] = el.maskStyle[property];
            });

            if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
                addClass(parent, 'min-loading-parent');
            }
            //   if (binding.modifiers.fullscreen && binding.modifiers.lock) {
            //     addClass(parent, 'el-loading-parent--hidden');
            //   }
            el.domVisible = true;

            parent.appendChild(el.mask);
            Vue.nextTick(() => {
                if (el.instance.hiding) {
                    //   el.instance.$emit('after-leave');
                } else {
                    el.instance.isshow = true;
                }
            });
            el.domInserted = true;
        } else if (el.domVisible && el.instance.hiding === true) {
            el.instance.isshow = true;
            el.instance.hiding = false;
        }
    };

    Vue.directive('loading', {
        bind: function (el, binding, vnode) {
            const _tip = el.getAttribute('min-loading-tip'),
                _icon = el.getAttribute('min-loading-icon'),
                _background = el.getAttribute('min-loading-background'),
                _className = el.getAttribute('min-loading-className'),
                _color = el.getAttribute('min-loading-color'),
                vm = vnode.context;
            const mask = new Mask({
                el: document.createElement('div'),
                data: {
                    tip: vm && _tip || '正在加载中...',
                    icon: vm && _icon || 'min-icon-loading',
                    background: vm && _background || vm[_background],
                    className: vm && _className || vm[_className],
                    fullscreen: !!binding.modifiers.fullscreen,
                    color: vm && _color || '#fff'
                }
            });
            el.instance = mask;
            el.mask = mask.$el;
            el.maskStyle = {};

            binding.value && toggleLoading(el, binding);
        },

        update: function (el, binding) {
            el.instance.handleTip(el.getAttribute('min-loading-tip'));
            if (binding.oldValue !== binding.value) {
                toggleLoading(el, binding);
            }
        },

        unbind: function (el, binding) {
            if (el.domInserted) {
                el.mask &&
                    el.mask.parentNode &&
                    el.mask.parentNode.removeChild(el.mask);
                toggleLoading(el, {
                    value: false,
                    modifiers: binding.modifiers
                });
            }
            el.instance && el.instance.$destroy();
        }
    });
};

export default loadingDirective;