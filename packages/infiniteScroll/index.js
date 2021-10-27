import {
    throttle
} from "throttle-debounce";
const defaultOptions = {
    delay: {
        type: Number,
        default: 300
    },
    distance: {
        type: Number,
        default: 80
    },
    immediate: {
        type: Boolean,
        default: true
    },
    root: {
        type: Boolean,
        default: false
    }
}
const mergeOpts = (opts) => {
    return Object.entries(defaultOptions).reduce((obj, [v, opt]) => {
        const {
            type,
            default: defaultVal
        } = opt
        switch (type) {
            case Number:
                obj[v] = Number(opts[v]) || defaultVal
                break;
            case Boolean:
                obj[v] = opts[v] === 'false' ? false : Boolean(opts[v])
        }
        return obj
    }, {})
}

const handleScroll = (ele, scrollEle, vm, distance, cb) => {
    const isEle = ele.documentElement ? scrollEle.documentElement : ele
    if (
        isEle.scrollHeight - isEle.clientHeight - isEle.scrollTop <=
        distance
    ) {
        const {
            observer
        } = ele[KEY];
        if (Object.prototype.toString.call(cb) === '[object Function]') {
            cb.call(vm);
        } else if (observer) {
            observer.disconnect()
            this[KEY].observer = null
        }
    }
}

const KEY = 'infiniteScroll'

export default {
    name: 'InfiniteScroll',
    inserted(el, binding, vNode) {
        const opts = binding.value.options
        const func = binding.value.callback
        const vm = vNode.context
        const {
            delay,
            distance,
            immediate,
            root
        } = mergeOpts(opts)
        const ele = root ? document : el
        const scroll = throttle(delay, handleScroll.bind(ele, ele, undefined, vm, distance, func))
        ele[KEY] = {
            ele,
            vm,
            scroll
        }
        if (ele) {
            ele.addEventListener('scroll',
                (e) => throttle(delay, handleScroll.call(ele, ele, e.target, vm, distance, func))
            )
            if (!root) {
                if (immediate) {
                    const observer = ele[KEY].observer = new MutationObserver(scroll)
                    observer.observe(ele, {
                        childList: true,
                        subtree: true
                    })
                    scroll()
                }
            }
        }
    },
    unbind(el, binding) {
        const opts = binding.value.options
        const {
            root
        } = mergeOpts(opts)
        const ele = root ? document : el
        if (ele) {
            ele.removeEventListener('scroll', ele[KEY][scroll])
        }
    }

}