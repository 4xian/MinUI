import Vue from 'vue';
import toast from './toast.vue';
import {
    isProperty
} from '../../../src/utils/vdom';

let childConstructor = Vue.extend(toast),
    instance,
    // instanceArr = [],
    index = 1;


const Toast = function (options = {}) {
    if (Vue.prototype.$isServer) return;
    if (typeof options === 'string') {
        options = {
            toast: options
        };
    }
    let id = 'toast_' + index++;
    instance = new childConstructor({
        data: options
    });
    instance.id = id;
    if (isProperty(instance.toast)) {
        instance.$slots.default = [instance.toast];
        instance.$slots.title = [instance.title];
        instance.title = null;
        instance.toast = null;
    }
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;
    return instance;

}

const typeArr = ['white', 'primary', 'info', 'success', 'warning', 'error', 'fail'];
typeArr.forEach(type => {
    Toast[type] = options => {
        if (typeof options === 'string') {
            options = {
                toast: options
            };
        }
        options.type = type;
        return Toast(options);
    }
})

export default Toast;