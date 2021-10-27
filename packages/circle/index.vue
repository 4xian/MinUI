<!-- 圆环进度条 -->
<template>
  <div class="circle">
    <svg
      class="circle-box"
      :width="width"
      :height="width"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        :r="circleRadius"
        :cy="width / 2"
        :cx="width / 2"
        :stroke-width="radius - 1"
        :stroke="defaultColor"
        :fill="fillColor"
      />
      <circle
        class="circle-active"
        :r="circleRadius"
        :cy="width / 2"
        :cx="width / 2"
        :stroke="activeColor"
        :stroke-width="radius"
        :stroke-linecap="isRound ? 'round' : 'square'"
        :stroke-dasharray="circleWidth"
        fill="none"
        :stroke-dashoffset="offsetStyle"
      />
      <template v-if="showTip">
        <text
          class="circle-text"
          :x="v.x"
          :y="v.y"
          :fill="tipColor"
          v-for="v in percentList"
          :key="v.percent"
          :style="{ fontSize: `${tipSize}px` }"
        >
          {{ v.percent }}
        </text>
      </template>
      <text
        :class="['circle-text', { 'circle-text-animate': textAnimate }]"
        :x="circleRadius"
        :y="-width / 2"
        :fill="textColor"
        :style="textStyle"
      >
        <!-- <tspan :x="circleRadius" :y="-width / 2">{{ text }}</tspan> -->
        <!-- <tspan :x="circleRadius" :y="-width / 2 + textSize * 1.5"> -->
        <tspan :x="circleRadius - 10" :y="-width / 2 + 10">
          {{ progress }}%
        </tspan>
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Min-Circle",
  props: {
    // 圆的宽度/高度
    width: {
      type: [Number],
      default: 200,
    },
    // 圆的环形宽度
    radius: {
      type: [Number],
      default: 10,
    },
    // 动画速度
    speed: {
      type: [Number],
      default: 10,
    },
    // 填充方向
    direction: {
      type: [Number],
      default: 1,
    },
    // 底层环形颜色
    defaultColor: {
      type: [String],
      default: "#fff",
    },
    // 动态环形颜色
    activeColor: {
      type: [String],
      default: "#007CFF",
    },
    // 内部填充颜色
    fillColor: {
      type: [String],
      default: "none",
    },
    // 动态环形两端形状 true:圆形 false:直线
    isRound: {
      type: [Boolean],
      default: true,
    },
    // 是否需要动画
    isAnimation: {
      type: [Boolean],
      default: true,
    },
    // 进度条
    progress: {
      type: [Number],
      default: -0,
    },
    // 文字
    text: {
      type: [String],
      default: "默认",
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: 24,
    },
    // 文字颜色
    textColor: {
      type: [String],
      default: "yellow",
    },
    // 文字是否上下浮动
    textAnimate: {
      type: [Boolean],
      default: true,
    },
    /* 百分比提示 */
    showTip: {
      type: [Boolean],
      default: true,
    },
    // 提示文字颜色
    tipColor: {
      type: [String],
      default: "rgba(255,255,255,0.2)",
    },
    // 提示文字大小
    tipSize: {
      type: [String, Number],
      default: 12,
    },
  },
  data() {
    return {
      animate: null,
      offsetStyle: (this.width - this.radius) * 3.14,
      percentList: [
        {
          id: 1,
          percent: "0%",
          x: (this.width - this.radius) / 2,
          y: -(this.width - this.radius * 2),
        },
        {
          id: 2,
          percent: this.direction === 1 ? "25%" : "75%",
          x: this.width - this.radius * 3 + 10,
          y: -(this.width / 2),
        },
        {
          id: 3,
          percent: "50%",
          x: (this.width - this.radius) / 2,
          y: -(this.radius * 1.5),
        },
        {
          id: 4,
          percent: this.direction === 1 ? "75%" : "25%",
          x: this.radius * 1.5,
          y: -(this.width / 2),
        },
      ],
      circleWidth: (this.width - this.radius) * 3.14,
    };
  },

  computed: {
    circleRadius() {
      return (this.width - this.radius) / 2;
    },
    allWidth() {
      return ((this.width - this.radius) * 3.14 * (100 - this.progress)) / 100;
    },
    textStyle() {
      return {
        fontSize: `${this.textSize}px`,
      };
    },
  },
  watch: {
    progress: {
      handler(newVal, old) {
        if (newVal !== old) {
          if (this.isAnimation) {
            this.offsetStyle = (this.width - this.radius) * 3.14;
            this.handleAnimate();
          } else {
            this.offsetStyle = this.allWidth;
          }
        }
      },
    },
  },

  mounted() {},
  beforeDestroy() {
    cancelAnimationFrame(this.animate);
  },

  methods: {
    handleAnimate() {
      this.animate = requestAnimationFrame(() => {
        if (this.direction === 1) {
          if (this.offsetStyle <= this.allWidth + this.speed) {
            cancelAnimationFrame(this.animate);
          } else {
            this.offsetStyle = (this.offsetStyle - this.speed).toFixed(1);
            this.handleAnimate();
          }
        } else {
          if (this.offsetStyle >= this.circleWidth * 2 - this.allWidth) {
            cancelAnimationFrame(this.animate);
          } else {
            this.offsetStyle = (Number(this.offsetStyle) + this.speed).toFixed(
              1
            );
            this.handleAnimate();
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.circle svg {
  transform: rotate(-90deg);
}
.circle-text {
  transform: rotate(90deg);
}
.circle-text-animate {
  animation: text-rotate 4s linear infinite;
}
.circle-text-active {
  transition: all ease-in-out;
}

@keyframes text-rotate {
  0% {
    transform: rotate(90deg) translateY(0px);
  }
  25% {
    transform: rotate(90deg) translateY(-10px);
  }
  50% {
    transform: rotate(90deg) translateY(0);
  }
  75% {
    transform: rotate(90deg) translateY(10px);
  }
  100% {
    transform: rotate(90deg) translateY(0);
  }
}
</style>
