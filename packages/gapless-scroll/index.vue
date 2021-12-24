<!-- 无缝滚动 / 轮播 @Jian -->
<template>
  <div ref="scrollWrap" class="min-gapless-wrap" :style="wrapStyle">
    <!-- 左右控制器 -->
    <template v-if="showControls && !isVertical">
      <div class="scroll-controls left-controls" @click="handleLeftClick">
        <slot name="left"></slot>
      </div>
      <div class="scroll-controls right-controls" @click="handleRightClick">
        <slot name="right"></slot>
      </div>
    </template>
    <!-- 上下控制器 -->
    <template v-if="showControls && isVertical">
      <div class="scroll-controls up-controls" @click="handleUpClick">
        <slot name="up"></slot>
      </div>
      <div class="scroll-controls down-controls" @click="handleDownClick">
        <slot name="down"></slot>
      </div>
    </template>

    <div v-if="list.length > 0" ref="visualArea" class="scroll-content-box">
      <div
        ref="scrollContent"
        :class="{ 'gapless-scroll-content': !isVertical }"
        :style="posStyle"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
      >
        <div ref="scrollItem" :style="slotStyle">
          <slot></slot>
        </div>
        <div v-if="isGapless" :style="slotStyle" v-html="copyScrollHtml"></div>
      </div>
    </div>
    <!-- 无内容时 -->
    <div v-else class="scroll-empty">
      <img
        v-show="mergeOptions['emptyImg']"
        :src="mergeOptions['emptyImg']"
        :style="{ width: mergeOptions['emptyWidth'] }"
      />
      <p>{{ mergeOptions["emptyText"] }}</p>
    </div>
  </div>
</template>

<script>
const DIRECTION = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};
import _ from "lodash";
export default {
  name: "GaplessScroll",
  props: {
    // 外容器宽度
    width: {
      type: Number,
      default: 200,
    },
    // 外容器高度
    height: {
      type: Number,
      default: 220,
    },
    // 数据列表
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    // 配置
    options: Object,
  },
  data() {
    return {
      /* 默认配置 */
      initOptions: {
        // 0:无缝滚动(用于无点击事件) 1: 触底滚动(到达最后一个会返回顶部，用于点击事件滚动)
        scrollType: 0,
        // 滚动方向 up:向上滚动 down:向下 left:向左 right:向右
        direction: DIRECTION.UP,
        // 滚动速度 数字越大越快
        speed: 1,
        // 符合滚动条件后是否自动滚动
        autoPlay: true,
        // 鼠标悬停是否停止滚动
        hoverStop: true,
        // 单次滚动(轮播)距离(仅在interval不为0生效)
        step: 0,
        // 轮播停留间隔 0为自动滚动
        interval: 0,
        // 带间隔的轮播(interval不为0)是否显示(左右/上下)控制器
        controls: false,
        // 自定义控制器时，两边控制器宽(左右滚动时)或高(上下滚动时)总和
        // 即为外层容器width/height需补充的padding
        controlsPadding: [0, 0],
        // 单次轮播动画时间(仅在点击(左右/上下)控制器时生效,0无动画)
        animateTime: 0.4,
        // 无内容时显示的图src
        emptyImg: "",
        // 无内容时显示的文字
        emptyText: "暂无数据",
        // 无数据时图片显示大小
        emptyWidth: "30%",
        //  解决水平无缝时margin间隔问题
        marginBias: 0,
      },
      /* 相关ref */
      scrollWrap: null,
      scrollContent: null,
      visualAre: null,
      copyScrollHtml: null,
      /* 当前滚动偏移量x,y */
      x: 0,
      y: 0,
      /* 实际内容宽高 */
      realW: 0,
      realH: 0,
      /* 实际可视区域宽高 */
      realVisualW: 0,
      realVisualH: 0,
      // 间隔动画时间
      transitionTime: 0,
      // 鼠标是否悬浮滚动区域中
      isHover: false,
      animateTimer: null,
      timer: null,
      /* 是否符合无缝条件(滚动,轮播) */
      isGapless: false,
      // 临时偏移量(x/y)
      offset: 0,
    };
  },
  computed: {
    // 合并配置
    mergeOptions() {
      return _.assign({}, this.initOptions, this.options);
    },

    wrapStyle() {
      const { width, height, mergeOptions } = this;
      return {
        width: `${width}px`,
        height: `${height}px`,
        padding: `${mergeOptions.controlsPadding[0]}px ${mergeOptions.controlsPadding[1]}px`,
      };
    },
    posStyle() {
      const { x, y, transitionTime } = this;
      return {
        transform: `translate(${-x}px,${-y}px)`,
        transition: `all ${transitionTime}s ease-in`,
      };
    },
    isVertical() {
      const { direction } = this.mergeOptions;
      return direction === DIRECTION.UP || direction === DIRECTION.DOWN;
    },
    slotStyle() {
      return this.isVertical ? { overflow: "hidden" } : { display: "flex" };
    },
    // 是否显示控制器
    showControls() {
      const { controls, interval } = this.mergeOptions;
      return controls && interval && this.list.length;
    },
  },
  watch: {
    list: {
      handler(val, old) {
        if (!_.isEqual(val, old)) {
          this.$nextTick(() => {
            this.reset();
            this.init();
          });
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.$once("hook:beforeDestroy", () => {
      this.reset();
    });
  },

  methods: {
    // 是否满足垂直/水平滚动条件
    vScroll() {
      const wrap = this.$refs.scrollWrap;
      const item = this.$refs.scrollItem;
      return item
        ? item.offsetHeight > wrap.offsetHeight &&
            item.offsetWidth <= wrap.offsetWidth
        : false;
    },
    hScroll() {
      const wrap = this.$refs.scrollWrap;
      const item = this.$refs.scrollItem;
      const { marginBias } = this.mergeOptions;
      return item
        ? item.offsetHeight <= wrap.offsetHeight &&
            item.scrollWidth > wrap.offsetWidth + marginBias
        : false;
    },
    // 是否符合滚动条件
    isScroll() {
      return this.vScroll() || this.hScroll();
    },
    // 重置状态
    reset() {
      const { scrollType } = this.mergeOptions;
      this.cancelScroll();
      this.x = 0;
      this.y = 0;
      this.isGapless = scrollType === 0 && this.isScroll();
      this.copyScrollHtml = null;
    },
    cancelScroll() {
      const { animateTimer, timer } = this;
      cancelAnimationFrame(animateTimer);
      clearTimeout(timer);
    },

    // 开始滚动
    startScroll() {
      this.cancelScroll();
      if (this.isHover) return;
      this.resetReal();
      this.animateTimer = requestAnimationFrame(() => {
        const { direction, speed, interval, step, scrollType } =
          this.mergeOptions;
        const { x, y, realH, realVisualH, realW, realVisualW } = this;
        this.transitionTime = 0;
        // 垂直滚动
        if (this.vScroll()) {
          // 向上
          if (direction === DIRECTION.UP) {
            if (scrollType === 1) {
              if (y > realH - realVisualH) this.y = 0;
              else this.y += speed;
            } else {
              this.y += speed;
              if (y >= realH / 2) this.y = 0;
            }
          } else if (direction === DIRECTION.DOWN) {
            //   向下
            if (scrollType === 1) {
              if (y < 0) this.y = realH - realVisualH;
              else this.y -= speed;
            } else {
              this.y -= speed;
              if (y <= realH / 2 - realVisualH) this.y = realH - realVisualH;
            }
          }
        } else if (this.hScroll()) {
          // 水平滚动
          // 向左
          if (direction === DIRECTION.LEFT) {
            if (scrollType === 1) {
              if (x > realW - realVisualW) this.x = 0;
              else this.x += speed;
            } else {
              this.x += speed;
              if (x >= realW / 2) this.x = 0;
            }
          } else if (direction === DIRECTION.RIGHT) {
            // 向右
            if (scrollType === 1) {
              if (x < 0) this.x = realW - realVisualW;
              else this.x -= speed;
            } else {
              this.x -= speed;
              if (x <= realW / 2 - realVisualW) this.x = realW - realVisualW;
            }
          }
        }

        if (this.timer) clearTimeout(this.timer);
        // 滚动间隔
        if (interval) {
          if (this.vScroll()) this.offset = this.y;
          else if (this.hScroll()) this.offset = this.x;
          if (this.offset % step === 0) {
            this.$emit("activeIndex", this.offset / step);
            this.timer = setTimeout(() => {
              this.startScroll();
            }, interval);
          } else {
            this.startScroll();
          }
        } else {
          this.startScroll();
        }
      });
    },
    mouseEnter() {
      const { hoverStop, autoPlay } = this.mergeOptions;
      if (hoverStop && autoPlay && this.isScroll()) {
        this.isHover = true;
        this.cancelScroll();
      }
    },
    mouseLeave() {
      const { hoverStop, autoPlay } = this.mergeOptions;
      if (hoverStop && autoPlay && this.isScroll()) {
        this.isHover = false;
        this.startScroll();
      }
    },
    /* 间隔轮播点击事件 上下左右 */
    handleLeftClick() {
      const { animateTime, step } = this.mergeOptions;
      this.transitionTime = animateTime;
      if (this.x <= 0) {
        this.transitionTime = 0;
        this.x = this.realW - this.realVisualW;
      } else this.x -= step;
    },
    handleRightClick() {
      const { animateTime, step } = this.mergeOptions;
      this.transitionTime = animateTime;
      if (this.x >= this.realW - this.realVisualW) {
        this.transitionTime = 0;
        this.x = 0;
      } else this.x += step;
    },

    handleUpClick() {
      const { animateTime, step } = this.mergeOptions;
      this.transitionTime = animateTime;
      if (this.y <= 0) {
        this.transitionTime = 0;
        this.y = this.realH - this.realVisualH;
      } else this.y -= step;
    },
    handleDownClick() {
      const { animateTime, step } = this.mergeOptions;
      this.transitionTime = animateTime;
      if (this.y >= this.realH - this.realVisualH) {
        this.transitionTime = 0;
        this.y = 0;
      } else this.y += step;
    },

    resetReal() {
      const content = this.$refs.scrollContent;
      this.realH = content ? content.offsetHeight : 0;
      this.realW = content ? content.scrollWidth : 0;
    },

    init() {
      const content = this.$refs.scrollContent;
      const visual = this.$refs.visualArea;
      this.realH = content ? content.offsetHeight : 0;
      this.realW = content ? content.scrollWidth : 0;
      this.realVisualW = visual ? visual.offsetWidth : 0;
      this.realVisualH = visual ? visual.offsetHeight : 0;
      const { autoPlay, interval } = this.mergeOptions;
      if (autoPlay && this.isScroll()) {
        if (this.isGapless)
          this.copyScrollHtml = this.$refs.scrollItem.innerHTML;
        this.startScroll();
      } else {
        /* console.log(this.isGapless)
        if (this.isGapless) {
          this.copyScrollHtml = this.$refs.scrollItem.innerHTML
          this.cancelScroll()
        } */
        this.cancelScroll();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
