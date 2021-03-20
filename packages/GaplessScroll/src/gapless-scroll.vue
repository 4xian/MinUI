<script>
import "../../../src/utils/reqAnimationFrame ";
import { copyObject } from "../../../src/utils/copy-object";

export default {
  name: "MinLoopScroll",
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      delay: 500,
      hover: false,
      timer: null,
      idx: 0,
      initOptions: {
        direction: "up",
        speed: 1,
        hoverStop: false,
        interval: null,
        step: 100,
      },
    };
  },
  props: {
    width: {
      type: [String, Number],
      default: 200,
    },
    height: {
      type: [String, Number],
      default: 300,
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    WarpStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      };
    },
    contentStyle() {
      // let tempWidth = this.$refs.scrollContent.scrollWidth;
      return {
        transform: `translate(${-this.offsetX}px,${-this.offsetY}px)`,
        transition: `all ${this.ease}`,
        // overflow: "hidden",
      };
    },

    handleOptions() {
      return copyObject({}, this.initOptions, this.options);
    },

    isVerticalScroll() {
      let tempContent = this.$refs.scrollContent,
        tempWarp = this.$refs.warp;
      return (
        tempContent.offsetHeight > tempWarp.offsetHeight &&
        tempContent.offsetWidth <= tempWarp.offsetWidth
      );
    },
    isHorizontalScroll() {
      let tempContent = this.$refs.scrollContent,
        tempWarp = this.$refs.warp;
      return (
        tempContent.scrollWidth > tempWarp.offsetWidth &&
        tempContent.offsetHeight <= tempWarp.offsetHeight
      );
    },
  },
  watch: {},
  beforeCreate() {
    this.ease = "ease-in";
    this.reqAnimationTimer = null;
  },
  mounted() {
    this.init();
    console.log(this.handleOptions);
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.startMove();
      });
    },
    startMove() {
      this.cancelMove();
      if (this.hover) return;
      this.reqAnimationTimer = requestAnimationFrame(() => {
        let { direction, speed, interval, step } = this.handleOptions;
        const h = this.$refs.scrollContent.offsetHeight;
        const w = this.$refs.scrollContent.scrollWidth;
        // 垂直滚动
        if (this.isVerticalScroll) {
          if (direction === "up") {
            if (h - this.height - this.offsetY < 3) {
              this.offsetY = -15;
            } else {
              this.offsetY += speed;
            }
          } else if (direction === "down") {
            if (this.offsetY < 0) {
              // console.log("向下结束");
              this.offsetY = h - this.height + 15;
            }
            this.offsetY -= speed;
          }
        }
        // 水平滚动
        if (this.isHorizontalScroll) {
          if (direction === "left") {
            if (w - this.width - this.offsetX < -10) {
              this.offsetX = -15;
              // console.log("向左结束");
            } else {
              this.offsetX += speed;
            }
          } else if (direction === "right") {
            // console.log(this.offsetX);
            if (this.offsetX < -10) {
              // console.log("向右结束");
              this.offsetX = w - this.width + 15;
            } else {
              this.offsetX -= speed;
            }
          }
        }
        this.idx += 1;
        if (this.timer) clearTimeout(this.timer);
        if (interval) {
          if (this.idx % step === 0) {
            this.timer = setTimeout(() => {
              this.startMove();
            }, interval);
          } else {
            this.startMove();
          }
        } else {
          this.startMove();
        }
      });
    },
    cancelMove() {
      cancelAnimationFrame(this.reqAnimationTimer || "");
      clearTimeout(this.reqAnimationTimer);
    },
    handleEnter() {
      if (this.handleOptions.hoverStop) {
        this.hover = true;
        this.cancelMove();
      }
    },
    handleLeave() {
      if (this.handleOptions.hoverStop) {
        this.hover = false;
        this.startMove();
      }
    },
  },
  render() {
    const { $slots, WarpStyle, contentStyle, handleEnter, handleLeave } = this;
    const scrollEle = (
      <div class="min-gapless-warp" ref="warp" style={WarpStyle}>
        <div
          ref="scrollContent"
          style={contentStyle}
          onmouseover={handleEnter}
          onmouseout={handleLeave}
        >
          {$slots.default}
        </div>
      </div>
    );
    return scrollEle;
  },
};
</script>
