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
      h: 0, // 实际内容高度
      w: 0, // 实际内容宽度
      initOptions: {
        direction: "up", // 滚动方向 up down left right
        speed: 1, // 滚动速度 越大越快
        hoverStop: false, // 鼠标悬浮是否暂停滚动
        interval: null, // 手动间隔滚动时间 0为自动滚动
        step: 140, // 每次手动滚动距离
        // 轮播配置
        autoScroll: true, // 自动轮播
        controlIcon: false, // 轮播左右按钮
      },
    };
  },
  props: {
    // 外层容器宽度
    width: {
      type: [String, Number],
      default: 200,
    },
    // 外层容器高度
    height: {
      type: [String, Number],
      default: 300,
    },
    // 是否为图片轮播
    carousel: {
      type: Boolean,
      default: false,
    },
    // 自定义选项
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
      return {
        transform: `translate(${-this.offsetX}px,${-this.offsetY}px)`,
        transition: `all ease-in`,
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
        tempContent.offsetHeight / 2 > tempWarp.offsetHeight &&
        tempContent.offsetWidth / 2 <= tempWarp.offsetWidth
      );
    },
    isHorizontalScroll() {
      let tempContent = this.$refs.scrollContent,
        tempWarp = this.$refs.warp;
      // if (this.carousel) return true;
      return (
        tempContent.scrollWidth / 2 > tempWarp.offsetWidth &&
        tempContent.offsetHeight / 2 <= tempWarp.offsetHeight
      );
    },
    isHorizontal() {
      return (
        this.options.direction === "left" || this.options.direction === "right"
      );
    },
    isVertical() {
      return (
        this.options.direction === "up" || this.options.direction === "down"
      );
    },
  },
  watch: {},
  beforeCreate() {
    this.reqAnimationTimer = null;
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.cancelMove();
    clearTimeout(this.timer);
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.h = this.$refs.scrollContent.offsetHeight;
        this.w = this.$refs.scrollContent.scrollWidth;
        // if (this.carousel) {
        // this.handleOptions.hoverStop = false;
        if (this.handleOptions.autoScroll) {
          this.startMove();
        } else {
          this.cancelMove();
        }
        // } else {
        //   this.startMove();
        // }
      });
    },
    startMove() {
      this.cancelMove();
      if (this.hover) return;
      this.reqAnimationTimer = requestAnimationFrame(() => {
        let { direction, speed, interval, step } = this.handleOptions;
        const h = this.h;
        const w = this.w;
        // 垂直滚动
        if (this.isVerticalScroll) {
          if (direction === "up") {
            if (this.offsetY > h / 2) {
              this.offsetY = 0;
            } else {
              this.offsetY += speed;
            }
          } else if (direction === "down") {
            if (this.offsetY < h / 2 - this.height) {
              this.offsetY = h - this.height;
            }
            this.offsetY -= speed;
          }
        }
        // console.log(1);
        // 水平滚动
        if (this.isHorizontalScroll) {
          if (direction === "left") {
            if (this.offsetX > w / 2) {
              this.offsetX = 0;
            } else {
              this.offsetX += speed;
            }
          } else if (direction === "right") {
            if (this.offsetX < w / 2 - this.width) {
              this.offsetX = w - this.width;
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
        clearTimeout(this.timer);
      }
    },
    handleLeave() {
      if (this.handleOptions.hoverStop) {
        if (this.handleOptions.autoScroll) {
          this.hover = false;
          this.startMove();
        }
      }
    },

    leftIConClick() {
      if (this.handleOptions.autoScroll) return;
      if (this.isHorizontalScroll) {
        if (Math.abs(this.offsetX) < this.handleOptions.step) {
          this.offsetX = this.w - this.width + this.handleOptions.step;
        }
        this.offsetX -= this.handleOptions.step;
      }
    },
    rightIConClick() {
      if (this.handleOptions.autoScroll) return;
      if (this.isHorizontalScroll) {
        if (Math.abs(this.offsetX) >= this.w - this.width) {
          this.offsetX = -this.handleOptions.step;
        }
        this.offsetX += this.handleOptions.step;
      }
    },
    upIConClick() {
      if (this.handleOptions.autoScroll) return;
      if (this.isVerticalScroll) {
        if (Math.abs(this.offsetY) < this.handleOptions.step) {
          this.offsetY = this.h - this.height + this.handleOptions.step;
        }
        this.offsetY -= this.handleOptions.step;
      }
    },
    downIConClick() {
      if (this.handleOptions.autoScroll) return;
      if (this.isVerticalScroll) {
        if (Math.abs(this.offsetY) >= this.h - this.height) {
          this.offsetY = -this.handleOptions.step;
        }
        this.offsetY += this.handleOptions.step;
      }
    },
  },
  render() {
    const {
      $slots,
      WarpStyle,
      contentStyle,
      handleEnter,
      handleLeave,
      isHorizontal,
      isVertical,
      handleOptions,
      rightIConClick,
      leftIConClick,
      upIConClick,
      downIConClick,
    } = this;
    let icon;
    if (isHorizontal) {
      icon = (
        <span v-show={handleOptions.controlIcon}>
          <i
            class="min-icon-arrow-left min-gapless min-gapless-lefticon"
            onClick={leftIConClick}
          ></i>
          <i
            class="min-icon-arrow-right min-gapless min-gapless-righticon"
            onClick={rightIConClick}
          ></i>
        </span>
      );
    }
    if (isVertical) {
      icon = (
        <span v-show={handleOptions.controlIcon}>
          <i
            class="min-icon-arrow-up min-gapless min-gapless-upicon"
            onClick={upIConClick}
          ></i>
          <i
            class="min-icon-arrow-down min-gapless min-gapless-downicon"
            onClick={downIConClick}
          ></i>
        </span>
      );
    }

    const scrollEle = (
      <div class="min-gapless-warp" ref="warp" style={WarpStyle}>
        {icon}
        <div
          ref="scrollContent"
          style={contentStyle}
          onmouseover={handleEnter}
          class={{ "min-gapless-scroll": isHorizontal }}
          onmouseout={handleLeave}
        >
          <div
            style={[
              isVertical
                ? { overflow: "hidden" }
                : { display: "flex", "flex-direction": "row" },
            ]}
          >
            {$slots.default}

            <div>{$slots.default}</div>
          </div>
        </div>
      </div>
    );
    return scrollEle;
  },
};
</script>
