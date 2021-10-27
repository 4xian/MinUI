<!--  -->
<template>
  <div class="min-waterfall">
    <div class="min-waterfall-contain" :style="boxStyle" ref="waterBox">
      <div
        class="min-waterfall-item"
        v-for="(v, i) in waterData"
        :key="`${v.id}-${i}`"
        :style="handleItemStyle(v, i)"
        @click="handleClick(v, i)"
      >
        <div><slot :name="handleHeaderSlot(i)"></slot></div>
        <img :src="customSrc ? v[customSrc] : v.src" />
        <div><slot :name="handleFooterSlot(i)"></slot></div>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from "throttle-debounce";
export default {
  name: "MinWaterfall",
  props: {
    waterData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    width: {
      type: Number,
      default: 100,
    },
    rowGap: {
      type: Number,
      default: 15,
    },
    colGap: {
      type: Number,
      default: 15,
    },
    customSrc: {
      type: String,
      default: "",
    },
    distance: {
      type: Number,
      default: 50,
    },
    root: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      boxStyle: {},
      num: 0, // 每行子类item个数
      rowMax: {}, // 每行最大高度集合
      boxHeight: [], // 所有子类item高度
      tempBoxHeight: [], // 每行子类item高度集合
      allBoxHeight: [], // 所有子类item高度偏移量集合
    };
  },
  computed: {},
  watch: {
    waterData: {
      handler(newVal, oldVal = []) {
        if (newVal.length !== oldVal.length) {
          this.$nextTick(() => {
            this.resizeLayout();
          });
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.$nextTick(() => {
      const isRoot = this.root
        ? window
        : this.$refs.waterBox.parentNode.parentNode;
      //   console.log(this.$refs.waterBox.parentNode.parentNode);
      isRoot.addEventListener("resize", throttle(500, this.resizeLayout));
      const scroll = throttle(500, this.handleScroll);
      isRoot.addEventListener("scroll", scroll);
      setTimeout(() => {
        this.resizeLayout();
      }, 0);
    });
  },

  methods: {
    handleScroll() {
      //   const ele = e.target.documentElement;
      console.log(11);
      const ele = this.root ? document.documentElement : this.$refs.waterBox;
      if (
        ele.scrollHeight - ele.clientHeight - ele.scrollTop <=
        this.distance
      ) {
        this.$emit("scrollBottom");
      }
      //   console.log(ele.scrollTop);
      //   console.log(ele.clientHeight);
      //   console.log(ele.scrollHeight);
    },
    // 重置样式
    resizeLayout() {
      this.rowMax = {};
      this.boxHeight = [];
      this.tempBoxHeight = [];
      this.allBoxHeight = [];
      this.handleLayout();
      this.handleStyle();
    },
    // 处理单个item样式
    handleItemStyle(v, i) {
      let temp =
        this.rowMax[
          parseInt(i / this.num) >= 0 ? parseInt(i / this.num) - 1 : 0
        ] -
          this.boxHeight[i - this.num] +
          this.allBoxHeight[i - this.num] || 0;
      this.allBoxHeight[i] = temp;
      return {
        transform: `translate(${0}px,${-temp}px)`,
        // transition: `transform 0.5s ease-in-out`,
      };
    },
    // 处理高度集合
    handleStyle() {
      let arr = document.querySelectorAll(".min-waterfall-item");
      this.boxHeight = Array.from(arr).map((v) => {
        return v.offsetHeight;
      });
      let id = 0;
      for (let i = 0; i < Math.ceil(this.boxHeight.length / this.num); i++) {
        this.tempBoxHeight.push(this.boxHeight.slice(id, id + this.num));
        id += this.num;
      }
      this.tempBoxHeight.forEach((v, i) => {
        this.rowMax[i] = Math.max.apply(null, v);
      });
    },

    // 处理每行布局
    handleLayout() {
      let boxWidth = this.$refs.waterBox.offsetWidth;
      let num = parseInt(boxWidth / this.width);
      this.num =
        this.width * num + (num - 1) * this.rowGap > boxWidth ? num - 1 : num;
      this.boxStyle = {
        "grid-gap": `${this.rowGap}px ${this.colGap}px`,
        "grid-template-columns": `repeat(${this.num},${this.width}px)`,
      };
    },

    handleClick(item, index) {
      this.$emit("click", { ...item, index: index });
    },
    handleFooterSlot(i) {
      return `footerSlot${i}`;
    },
    handleHeaderSlot(i) {
      return `headerSlot${i}`;
    },
  },
};
</script>

<style scoped>
.min-waterfall {
  height: 100%;
  height: 100%;
}
.min-waterfall-contain {
  display: grid;
  justify-content: center;
  overflow-x: hidden;
}
.min-waterfall-item {
  border: 1px solid red;
  height: max-content;
  transition: transform 0.5s ease-in-out;
  transition-delay: 0.1s;

  /* animation: waterfall 0.8s ease-in 0.5s; */
}
.min-waterfall-item:hover {
  cursor: pointer;
}
.min-waterfall-item img {
  width: 100%;
  display: block;
  border: none;
}
/* @keyframes waterfall {
  0% {
    transform: scale(0.3);
  }
  100% {
    transform: scale(1);
  }
} */
</style>
