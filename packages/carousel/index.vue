<!-- 堆叠式轮播 -->
<template>
  <div class="min-carousel" :style="paddingStyle">
    <div class="min-carousel-box" ref="carouselBox" :style="boxStytle">
      <slot></slot>
    </div>
    <div @click="pre" class="min-carousel-pre">
      <slot v-if="slotControl" name="pre"></slot>
      <div v-else>《</div>
    </div>
    <div @click="next" class="min-carousel-next">
      <slot v-if="slotControl" name="next"></slot>
      <div v-else>》</div>
    </div>
    <div class="min-carousel-point" v-if="showIndicator">
      <div
        v-for="(v, id) in total"
        :key="`point-${v}-${id}`"
        :style="{
          'background-color': active === id ? activeColor : defaultColor,
        }"
        :class="[
          'min-carousel-point-item',
          {
            'carousel-point-line': indicator === 1,
            'carousel-point-number': indicator === 2,
          },
        ]"
      >
        {{ indicator === 2 ? v : "" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MinCarousel",
  props: {
    // 当前索引元素相邻两边倾斜角度
    rotate: {
      type: [Number],
      default: 30,
    },
    // 根容器padding
    padding: {
      type: [Array],
      default: () => {
        return [20, 30];
      },
    },
    // 动画时间
    timer: {
      type: [Number],
      default: 0.5,
    },
    // 是否循环播放
    loop: {
      type: [Boolean],
      default: true,
    },
    // 是否自动播放
    autoPlay: {
      type: [Boolean],
      default: true,
    },
    // 自动播放时间间隔
    interval: {
      type: [Number],
      default: 5000,
    },
    // 是否显示底部索引指示器
    showIndicator: {
      type: [Boolean],
      default: true,
    },
    // 指示器类型 1:横线 2:数字
    indicator: {
      type: [Number],
      default: 1,
    },
    // 指示器当前索引颜色
    activeColor: {
      type: [String],
      default: "#007CFF",
    },
    // 指示器其他默认颜色
    defaultColor: {
      type: [String],
      default: "#C2F1FF",
    },
    // 是否显示左右控制图标
    control: {
      type: [Boolean],
      default: true,
    },
  },
  data() {
    return {
      active: 1,
      left: 0,
      width: 500, // children width
      total: 0, // children length
      time: null,
      slotControl: false,
    };
  },

  computed: {
    boxStytle() {
      return {
        width: `${parseInt(this.width * 3 - (this.width / 3) * 3) +
          this.width * 0.1}px`,
        transition: `transform ${this.timer}s ease-in`,
      };
    },
    paddingStyle() {
      return {
        padding: `${this.padding[0]}px ${this.padding[1]}px`,
      };
    },
  },

  mounted() {
    this.total = this.$children.length;
    this.width = this.$children[0].width;
    if (this.autoPlay) {
      if (this.loop) {
        this.time = setInterval(() => {
          this.next();
        }, this.interval);
      }
    }
    if (this.control) {
      if (this.$slots.pre || this.$slots.next) {
        this.slotControl = true;
      } else {
        this.slotControl = false;
      }
    }
  },

  methods: {
    pre() {
      if (this.active <= 0) {
        if (this.loop) {
          this.active = this.total;
          this.left = (this.active - 1) * this.width;
        } else {
          return;
        }
      }
      this.left -= this.width;
      this.active -= 1;
    },
    next() {
      if (this.active === this.total - 1) {
        if (this.loop) {
          this.active = 0;
        } else {
          return;
        }
      }
      this.left = this.active * this.width;
      this.active += 1;
    },
  },
};
</script>

<style scoped>
.min-carousel {
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
}
.min-carousel-box {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  perspective: 1000px;
  overflow: hidden;
  position: relative;
}

.min-carousel-pre {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.min-carousel-next {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.min-carousel-pre:hover,
.min-carousel-next:hover {
  cursor: pointer;
}
.min-carousel-point {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
.min-carousel-point-item {
  width: 20px;
  text-align: center;
  margin: 0 2px;
}
.carousel-point-line {
  height: 4px;
  border-radius: 4px;
}
.carousel-point-number {
  border-radius: 50%;
  color: #fff;
}
</style>
