<script>
// import MinIcon from "../../Icon/src/icon";
export default {
  name: "MinToast",
  components: {
    // MinIcon,
  },
  data() {
    return {
      visible: false,
      toast: "默认提示默认提示默认提",
      type: "primary",
      className: "",
      showClose: true,
      center: false,
      duration: 3000,
      icon: "",
      isclose: false,
      timer: null,
      position: "top",
      title: "",
    };
  },
  computed: {},
  watch: {
    isclose(val) {
      if (val) {
        this.visible = false;
      }
    },
  },
  mounted() {
    this.openDuration();
    document.addEventListener("keydown", this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydown);
  },
  methods: {
    openDuration() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.isclose) this.close();
        }, this.duration);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    close() {
      this.isclose = true;
    },
    keydown(e) {
      if (e.keyCode === 27) {
        if (!this.isclose) this.close();
      }
    },
    handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  render() {
    const {
      visible,
      center,
      icon,
      position,
      showClose,
      type,
      className,
      close,
      title,
      toast,
    } = this;
    const toastEle = (
      <transition name="texttip-opacity" after-leave="handleAfterLeave">
        {visible && (
          <div
            class={[
              "min-toast",
              className,
              `position-${position}`,
              `min-toast-${type}`,
              { "is-center": center },
            ]}
          >
            {title && <div class="min-toast-title">{title}</div>}
            <div class="min-toast-content">
              {icon ? (
                <i class={[icon, "has-margin-right"]}></i>
              ) : (
                <i class={[`min-icon-${type}`, "has-margin-right"]}></i>
              )}
              {toast}
              {showClose && (
                <i
                  class={[
                    "min-icon-close",
                    title ? "min-toast-title-close" : "min-toast-close",
                  ]}
                  onClick={close}
                ></i>
              )}
            </div>
          </div>
        )}
      </transition>
    );

    return toastEle;
  },
};
</script>
