<!-- 数字翻牌器 

    // 第一种类型 singleNumber = "9,654"
    <div class="single-num-box">
      <div v-for="(v, idx) in singleNumber" :key="v">
        <MinNumberScroll
          v-if="v !== ','"
          class="single-num"
          :singleResult="v"
          :singleDuration="idx + 1"
        ></MinNumberScroll>
        <div v-else class="single-dot">,</div>
      </div>
    </div>

    // 第二种类型 tempNumber: "4873",
    <div class="single-num-box">
      <MinNumberScroll :scrollType="2" :result="tempNumber"></MinNumberScroll>
    </div> -->
<template>
  <div class="min-numscroll">
    <div v-if="scrollType === 2" class="min-numscroll-box" :style="columnGap">
      <div
        class="min-numscroll-column"
        v-for="(it, i) in result"
        :key="`column-${i}`"
        :style="scrollStyle"
        ref="numscroll"
      >
        <div
          :class="['min-numscroll-item', customClass]"
          v-for="(v, idx) in list"
          :key="`number-${idx}${v}`"
        >
          <span :style="filterStyle">
            {{ v }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="scrollType === 1"
      class="min-single-box"
      :style="{ height: `${this.offsetH}px` }"
    >
      <div
        :class="['min-single-numscroll', customClass]"
        v-for="(v, idx) in list"
        :key="`single-number-${idx * Math.random()}`"
        ref="singleNum"
        :style="singleStyle"
      >
        <span :style="filterStyle">
          {{ v }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MinNumberScroll",
  props: {
    result: {
      type: String,
      default: "10000",
    },
    circle: {
      type: Number,
      default: 3,
    },
    speed: {
      type: Number,
      default: 10,
    },
    step: {
      type: Number,
      default: 3,
    },
    customClass: {
      type: String,
      default: "",
    },
    gap: {
      type: Number,
      default: 10,
    },
    singleDuration: {
      type: Number,
      default: 3,
    },
    singleResult: {
      type: [Number, String],
      default: 0,
    },
    scrollType: {
      type: Number,
      default: 1, // 1:单个数字滚动, 2:多个一起滚动
    },
  },
  data() {
    return {
      list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      offsetH: 0, // 滚动高度
      top: 0,
      timer: null,
      flag: false,
      refs: [],
      idx: 0,
      isCustom: false,
      tempNumber: "",
      filter: true,

      time: 0,
      isAnimation: false,
    };
  },

  computed: {
    scrollStyle() {
      return {
        height: `${this.offsetH}px`,
        transform: `translate3d(0,-${this.top}px,0)`,
      };
    },
    columnGap() {
      return {
        "grid-gap": `${this.gap}px`,
      };
    },
    filterStyle() {
      return {
        filter: `${this.filter ? "blur(1px)" : ""}`,
      };
    },
    singleStyle() {
      return {
        transform: `translate3d(0,-${this.top}px,0)`,
      };
    },
  },

  watch: {
    result: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$nextTick(() => {
            this.scrollType === 2 ? this.init() : this.singleInit();
          });
        }
      },
      immediate: true,
    },
  },
  mounted() {},

  methods: {
    init() {
      this.offsetH = document.querySelector(".min-numscroll-item").offsetHeight;
      this.startMove();
    },

    startMove() {
      this.timer = requestAnimationFrame(() => {
        if (this.idx < this.circle) {
          if (this.top < this.offsetH * 9) {
            this.top += this.speed;
            this.startMove();
          } else {
            this.idx++;
            this.top = 0;
            this.startMove();
          }
        } else {
          if (this.top >= this.offsetH * 9) {
            this.confirmResult();
            this.filter = false;
            cancelAnimationFrame(this.timer);
          } else {
            this.top += this.step;
            this.startMove();
          }
        }
      });
    },
    confirmResult() {
      this.refs = this.$refs.numscroll;
      this.result.split("").forEach((v, i) => {
        this.refs[i].style.transform = `translate3d(0,-${v *
          this.offsetH}px,0)`;
      });
    },

    singleInit() {
      this.offsetH = document.querySelector(
        ".min-single-numscroll"
      ).offsetHeight;
      this.time = new Date().getTime();
      this.startSingleMove();
    },
    startSingleMove() {
      this.timer = requestAnimationFrame(() => {
        if (new Date().getTime() < this.time + this.singleDuration * 1000) {
          if (this.top < this.offsetH * 9) {
            this.top += this.speed;
            this.startSingleMove();
          } else {
            this.top = 0;
            this.startSingleMove();
          }
        } else {
          this.filter = false;
          this.top = this.singleResult * this.offsetH;
        }
      });
    },
  },
};
</script>

<style scoped>
.min-numscroll-box {
  display: flex;
  overflow: hidden;
}

.min-numscroll-item {
  font-size: 16px;
}
.custom-class {
  color: red;
}
.min-filter {
  filter: blur(1px);
}

.min-single-box {
  overflow: hidden;
}
.min-single-numscroll {
  padding: 10px 14px;
}
</style>
