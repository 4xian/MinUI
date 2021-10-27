<!-- 轮播 -->
<template>
  <div
    ref="carouselItem"
    :class="['min-carousel-item']"
    :style="handleStyle(curIndex)"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "MinCarouselItem",
  props: {
    width: {
      type: [String, Number],
      default: 300,
    },
    // 当前索引
    curIndex: {
      type: [Number],
      default: 1,
    },
  },
  data() {
    return {
      parent: this.$parent,
    };
  },
  computed: {
    left() {
      return this.$parent.left;
    },
    active() {
      return this.$parent.active;
    },
    rotate() {
      return this.$parent.rotate;
    },
    itemStyle() {
      return {
        transform: `translate3d(${-this.left}px,0,${-parseInt(
          this.width / 3
        )}px) scale(0.1)`,
      };
    },
    activeStyle() {
      return {
        transform: `translate3d(${-this.left}px,0,0)`,
        zIndex: 10,
        margin: `0 -${parseInt(this.width / 3)}px`,
      };
    },
    leftStyle() {
      return {
        transform: `translate3d(${-this.left}px,0,${-parseInt(
          this.width / 1.5
        )}px) rotateY(${this.rotate}deg)`,
      };
    },
    rightStyle() {
      return {
        transform: `translate3d(${-this.left}px,0,${-parseInt(
          this.width / 1.5
        )}px) rotateY(-${this.rotate}deg)`,
      };
    },
  },
  watch: {
    active: {
      handler(newVal, old) {
        if (newVal !== old) {
          this.$emit("activeIdx", newVal);
        }
      },
      //   immediate: true,
    },
  },

  methods: {
    handleStyle(id) {
      switch (id) {
        case this.active:
          return this.activeStyle;
        case this.active + 1:
          return this.leftStyle;
        case this.active - 1:
          return this.rightStyle;
        default:
          return this.itemStyle;
      }
    },
  },
};
</script>

<style scoped>
.min-carousel-item {
  z-index: 5;
  background: transparent;
  transform: translate3d(0, 0, -100px);
  transition: transform 0.5s ease-in;
}
.min-carousel-item:nth-child(1) {
  margin-left: -40px;
}
</style>
