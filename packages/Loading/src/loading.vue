<script>
export default {
  data() {
    return {
      isshow: false,
      fullscreen: true,
      className: "",
      background: null,
      icon: "min-icon-loading",
      tip: "",
      color: "#fff",
    };
  },
  methods: {
    handleTip(tip) {
      this.tip = tip;
    },
  },
  render() {
    const {
      isshow,
      fullscreen,
      className,
      background,
      icon,
      tip,
      color,
    } = this;
    const loadEle = (
      <transition name="texttip-opacity">
        <div
          v-show={isshow}
          style={{ backgroundColor: background || "" }}
          class={[
            "min-loading-mask",
            className,
            { "is-loading-fullscreen": fullscreen },
          ]}
        >
          <div class="min-loading-icon">
            {icon ? (
              <i class={icon} style={{ color: color }}></i>
            ) : (
              <svg class="spinner" viewBox="25 25 50 50">
                <circle
                  style={{ stroke: color }}
                  class="path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                />
              </svg>
            )}
            {tip && <p style={{ color: color }}>{tip}</p>}
          </div>
        </div>
      </transition>
    );

    return loadEle;
  },
};
</script>
