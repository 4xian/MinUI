<script>
// import "@/assets/utils/requestAnimationFrame";
// import { copyObject } from "../../../src/utils/copy-object";
import "./index.scss";
import _ from "lodash";
export default {
  name: "GaplessScroll",
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
      _animationTime: 0,
      initOptions: {
        direction: "up", // 滚动方向 up down left right
        speed: 1, // 滚动速度 越大越快
        hoverStop: false, // 鼠标悬浮是否暂停滚动
        interval: null, // 手动间隔滚动时间 0为自动滚动
        step: 140, // 每次手动滚动距离
        // 轮播配置
        autoScroll: true, // 自动轮播
        controlIcon: false, // 轮播左右按钮
        animationTime: 0, // 手动点击左右时动画时长
        isShowCopy: false,
      },
      isShowCopy: false,
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
    marginBias: {
      type: [Number],
      default: 0,
    },
    // true为左右按钮点击,false为无缝滚动
    isClick: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 自定义选项
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
    emptySrc: String,
    emptyText: {
      type: String,
      default: "",
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
        transition: `all ${this._animationTime}s ease-in`,
        // overflow: "hidden",
      };
    },
    handleOptions() {
      return _.assign({}, this.initOptions, this.options);
    },
    // isVerticalScroll() {
    //     let tempContent = this.$refs.scrollContent,
    //         tempWarp = this.$refs.warp;
    //     return (
    //         tempContent.offsetHeight > tempWarp.offsetHeight &&
    //         tempContent.offsetWidth <= tempWarp.offsetWidth
    //     );
    // },
    // isHorizontalScroll() {
    //     let tempContent = this.$refs.scrollContent,
    //         tempWarp = this.$refs.warp;

    //     return (
    //         tempContent.scrollWidth >
    //             tempWarp.offsetWidth + this.marginBias &&
    //         tempContent.offsetHeight <= tempWarp.offsetHeight
    //     );
    // },
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
  watch: {
    list: {
      handler(newVal, old = []) {
        if (newVal.length !== old.length && newVal.length > 0) {
          this.cancelMove();
          this.offsetX = 0;
          this.offsetY = 0;
          this.isShowCopy = false;
          this.$nextTick(() => {
            this.isShowCopy =
              this.isVerticalScroll() || this.isHorizontalScroll();
            this.init();
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeCreate() {
    this.reqAnimationTimer = null;
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.h = this.$refs.scrollContent.offsetHeight;
    //   this.w = this.$refs.scrollContent.scrollWidth;
    // });
    this.$once("hook:beforeDestory", () => {
      this.cancelMove();
      clearTimeout(this.timer);
    });
  },
  //   beforeDestroy() {},
  methods: {
    isVerticalScroll() {
      let tempContent = this.$refs.scrollContent,
        tempWarp = this.$refs.warp;
      // console.log(tempContent.offsetHeight, tempWarp.offsetHeight);
      return (
        tempContent.offsetHeight > tempWarp.offsetHeight &&
        tempContent.offsetWidth <= tempWarp.offsetWidth
      );
    },
    isHorizontalScroll() {
      let tempContent = this.$refs.scrollContent,
        tempWarp = this.$refs.warp;

      return (
        tempContent.scrollWidth > tempWarp.offsetWidth + this.marginBias &&
        tempContent.offsetHeight <= tempWarp.offsetHeight
      );
    },
    init() {
      this.h = this.$refs.scrollContent.offsetHeight;
      this.w = this.$refs.scrollContent.scrollWidth;
      if (this.handleOptions.autoScroll) {
        // console.log(this.isVerticalScroll, this.isHorizontalScroll);
        if (this.isVerticalScroll() || this.isHorizontalScroll()) {
          this.startMove();
        } else {
          this.cancelMove();
        }
      } else {
        this.cancelMove();
      }
    },
    startMove() {
      this.cancelMove();
      if (this.hover) return;
      this.reqAnimationTimer = requestAnimationFrame(() => {
        this._animationTime = 0;
        let { direction, speed, interval, step } = this.handleOptions;
        const h = this.h;
        const w = this.w;
        // 垂直滚动
        if (this.isVerticalScroll()) {
          if (direction === "up") {
            if (this.offsetY >= h) {
              this.offsetY = 0;
            } else {
              this.offsetY += speed;
            }
          } else if (direction === "down") {
            if (this.offsetY < h - this.height) {
              this.offsetY = h * 2 - this.height;
            }
            this.offsetY -= speed;
          }
        }
        // console.log(1);
        // 水平滚动
        if (this.isHorizontalScroll()) {
          if (direction === "left") {
            if (this.offsetX > w) {
              this.offsetX = 0;
            } else {
              this.offsetX += speed;
            }
          } else if (direction === "right") {
            if (this.offsetX < w - this.width) {
              this.offsetX = w * 2 - this.width;
            } else {
              this.offsetX -= speed;
            }
          }
        }
        // this.idx += 1;
        if (this.timer) clearTimeout(this.timer);
        if (interval) {
          if (this.isVerticalScroll()) {
            this.idx = this.offsetY;
          } else if (this.isHorizontalScroll()) {
            this.idx = this.offsetX;
          }

          if (this.idx % step === 0) {
            // console.log(this.idx / step);
            this.$emit("activeIndex", this.idx / step);
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
        if (this.handleOptions.autoScroll && this.isShowCopy) {
          this.hover = true;
          this.cancelMove();
          clearTimeout(this.timer);
        }
      }
    },
    handleLeave() {
      if (this.handleOptions.hoverStop) {
        if (this.handleOptions.autoScroll && this.isShowCopy) {
          this.hover = false;
          this.startMove();
        }
      }
    },
    leftIConClick() {
      this.h = this.$refs.scrollContent.offsetHeight;
      this.w = this.$refs.scrollContent.scrollWidth;
      if (this.handleOptions.autoScroll) return;
      if (this.isHorizontalScroll()) {
        this._animationTime = this.handleOptions.animationTime || 0;
        if (Math.abs(this.offsetX) < this.handleOptions.step) {
          this.offsetX = this.w - this.width - this.marginBias;
          //   this.offsetX = 0; // 到最左边不操作
        } else {
          this.offsetX -= this.handleOptions.step;
        }
      }
    },
    rightIConClick() {
      this.h = this.$refs.scrollContent.offsetHeight;
      this.w = this.$refs.scrollContent.scrollWidth;
      if (this.handleOptions.autoScroll) return;
      if (this.isHorizontalScroll()) {
        this._animationTime = this.handleOptions.animationTime || 0;
        // this.w - this.width - this.handleOptions.step
        // this.w / 2
        if (
          Math.abs(this.offsetX) >
          this.w - this.width - this.handleOptions.step + this.marginBias
          //   this.width - this.handleOptions.step + this.marginBias
        ) {
          //   this.offsetX = -this.handleOptions.step;
          this.offsetX = 0; //回到原点
          // 到最右边不操作 全注释
        } else {
          this.offsetX += this.handleOptions.step;
        }
      }
    },
    upIConClick() {
      if (this.handleOptions.autoScroll) return;
      if (this.isVerticalScroll()) {
        this._animationTime = this.handleOptions.animationTime || 0;
        if (Math.abs(this.offsetY) < this.handleOptions.step) {
          this.offsetY = this.h - this.height + this.handleOptions.step;
        }
        this.offsetY -= this.handleOptions.step;
      }
    },
    downIConClick() {
      if (this.handleOptions.autoScroll) return;
      if (this.isVerticalScroll()) {
        this._animationTime = this.handleOptions.animationTime || 0;
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
      $refs,
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
      marginBias,
      list,
      emptyText,
      emptySrc,
      isClick,
      isShowCopy,
    } = this;
    let icon;
    if (isHorizontal) {
      icon = (
        <div v-show={handleOptions.controlIcon}>
          {/* <i
            class="min-icon-arrow-left min-gapless min-gapless-lefticon"
            onClick={leftIConClick}
          >
            {">"}
          </i> */}
          <div
            class="min-icon-arrow-left min-gapless min-gapless-lefticon"
            onClick={leftIConClick}
          >
            {$slots.leftIcon}
          </div>
          <div
            class="min-icon-arrow-right min-gapless min-gapless-righticon"
            onClick={rightIConClick}
          >
            {$slots.rightIcon}
          </div>
          {/* <i
            class="min-icon-arrow-right min-gapless min-gapless-righticon"
            onClick={rightIConClick}
          ></i> */}
        </div>
      );
    }
    if (isVertical) {
      icon = (
        <div v-show={handleOptions.controlIcon}>
          <i
            class="min-icon-arrow-up min-gapless min-gapless-upicon"
            onClick={upIConClick}
          ></i>
          <i
            class="min-icon-arrow-down min-gapless min-gapless-downicon"
            onClick={downIConClick}
          ></i>
        </div>
      );
    }
    const scrollEle = (
      <div class="min-gapless-warp" ref="warp" style={WarpStyle}>
        <div v-show={list.length > 0} style={{ height: "100%" }}>
          {icon}
          <div
            ref="scrollContent"
            style={contentStyle}
            onmouseover={handleEnter}
            class={{ "min-gapless-scroll": isHorizontal }}
            onmouseout={handleLeave}
          >
            <div
              ref="scrollList"
              style={[
                isVertical
                  ? { overflow: "hidden" }
                  : {
                      display: "flex",
                      "flex-direction": "row",
                    },
              ]}
            >
              {$slots.default}
            </div>
            {!isClick && isShowCopy && (
              <div
                style={[
                  isVertical
                    ? { overflow: "hidden" }
                    : {
                        display: "flex",
                        "flex-direction": "row",
                      },
                ]}
                domPropsInnerHTML={$refs.scrollList.innerHTML}
              ></div>
            )}
          </div>
        </div>
        {list.length === 0 && (
          <div class="empty-content">
            <img src={emptySrc} />
            <p>{emptyText}</p>
          </div>
        )}
      </div>
    );
    return scrollEle;
  },
};
</script>
