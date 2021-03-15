<script>
import { throttle } from "throttle-debounce";
export default {
  name: "Gotop",
  data() {
    return {
      isshow: false,
      tempEle: null,
      ele: null,
    };
  },
  props: {
    monitor: {
      type: String,
      default: "",
    },
    showHeight: {
      type: [String, Number],
      default: "50",
    },
    bottom: {
      type: [String, Number],
      default: "",
    },
    right: {
      type: [String, Number],
      default: "",
    },
    gotop: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    _bottom() {
      return `${this.bottom}px`;
    },
    _right() {
      return `${this.right}px`;
    },
  },
  watch: {},
  mounted() {
    this.eleMonitor();
  },
  beforeDestroy() {
    this.tempEle.removeEventListener("scroll", this.show);
  },
  methods: {
    eleMonitor() {
      this.tempEle = document;
      this.ele = document.documentElement;
      if (this.monitor) {
        this.ele = document.querySelector(this.monitor);
        if (!this.ele) {
          throw new Error(`${this.monitor} is not existed!`);
        }
        this.tempEle = this.ele;
      }
      this.tempEle.addEventListener("scroll", throttle(500, this.show));
    },
    show() {
      this.isshow = this.ele.scrollTop >= this.showHeight;
    },
    handleClick(e) {
      if (this.gotop) {
        this.goTop();
      }
      this.$emit("click", e);
    },
    goTop() {
      const animation =
        window.requestAnimationFrame || ((func) => setTimeout(func, 500));
      const Func = () => {
        let _top = this.ele.scrollTop;
        if (_top > 0) {
          this.ele.scrollTop = _top - 50;
          animation(Func);
        } else {
          cancelAnimationFrame(animation) || clearTimeout(animation);
        }
      };
      animation(Func);
    },
  },
  render() {
    const { $slots, _bottom, _right, handleClick, isshow } = this;
    const _style = {
      right: _right,
      bottom: _bottom,
    };
    const gotopEle = (
      <transition name="texttip-opacity">
        {isshow && (
          <div
            class={["min-gotop", { "min-gotop-default": !$slots.default }]}
            style={_style}
            onClick={handleClick}
          >
            {$slots.default ? $slots.default : <i class="min-icon-top"></i>}
          </div>
        )}
      </transition>
    );
    return gotopEle;
  },
};
</script>
