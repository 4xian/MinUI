<script>
/*
    弹框:
    props:{
    }
*/
export default {
  name: "MinModal",
  data() {
    return {
      status: false,
    };
  },
  props: {
    mask: {
      type: Boolean,
      default: true,
    },
    clickMaskClose: {
      type: Boolean,
      default: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    beforeClose: Function,
    className: {
      type: [String, Array],
      default: "",
    },
    contentClass: {
      type: [String, Array],
      default: "",
    },
    rootName: {
      type: [String, Array],
      default: "",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "",
    },
    top: {
      type: String,
      default: "",
    },
    showClose: {
      type: Boolean,
      default: true,
    },
    textCenter: {
      type: Boolean,
      default: true,
    },
    animation: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  watch: {
    visible: {
      handler(val) {
        if (val) {
          this.$emit("open");
        }
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    handleClickMaskClose() {
      if (this.clickMaskClose) {
        if (typeof this.beforeClose === "function") {
          this.beforeClose(this.closeModal);
        } else {
          this.closeModal();
        }
      }
    },
    closeModal() {
      this.$emit("update:visible", false);
      this.$emit("close");
    },
  },
  render() {
    const {
      mask,
      visible,
      $slots,
      handleClickMaskClose,
      className,
      rootName,
      contentClass,
      fullscreen,
      width,
      top,
      showClose,
      textCenter,
    } = this;
    const modalStyle = {
      width: width ? width : "",
      "margin-top": top ? "top" : "",
    };
    const modalEle = (
      <div>
        {visible && (
          <div
            class={[{ "min-modal-mask": mask }]}
            onClick={handleClickMaskClose}
          ></div>
        )}
        <transition name="modal-transition">
          {visible && (
            <div class={["min-modal-common", rootName]}>
              <div
                class={[
                  "min-modal",
                  className,
                  { "is-fullscreen": fullscreen },
                ]}
                style={modalStyle}
              >
                {/* showClose && (
                <icon
                  class="min-modal-header-close min-icon-close"
                  onClick={handleClickMaskClose}
                ></icon>
              ) */}
                {$slots.header ? (
                  <div
                    class={[
                      "min-modal-header",
                      { "is-text-center": textCenter },
                    ]}
                  >
                    {$slots.header}
                  </div>
                ) : (
                  ""
                )}
                <div
                  class={[
                    "min-modal-content",
                    contentClass,
                    { "is-text-center": textCenter },
                  ]}
                >
                  {$slots.default}
                </div>
                {$slots.footer ? (
                  <div
                    class={[
                      "min-modal-footer",
                      { "is-text-center": textCenter },
                    ]}
                  >
                    {$slots.footer}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </transition>
      </div>
    );
    return modalEle;
  },
};
</script>
<style scoped lang="less">
@import "./index.less";
</style>
