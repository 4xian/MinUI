<!-- 弹幕组件
font-size
color
font-weight
speed
position
 -->
<template>
  <div>
    <div class="min-barrage">
      <div ref="barrage">
        <slot></slot>
      </div>
      <div
        class="min-barrage-box"
        :style="{ width: `${prevWidth}px`, left: `${slotWidth}px` }"
      >
        <div
          :class="['min-barrage-preitem']"
          v-for="(v, idx) in preList"
          :key="`barrage-pre${idx}`"
          :style="boxStyle"
          @click="emitClickItem(v)"
        >
          <div
            :style="{
              color: v['color'],
              fontSize: `${v['fontSize']}px`,
              marginLeft: `${v['left']}px`,
            }"
          >
            {{ v.msg }}
          </div>
        </div>
      </div>
      <div
        class="min-barrage-box"
        ref="barrageNext"
        :style="{ width: `${nextWidth}px`, left: `${slotWidth}px` }"
      >
        <div
          :class="['min-barrage-nextitem']"
          v-for="(v, idx) in nextList"
          :key="`barrage-next${idx}`"
          :style="nextBoxStyle"
          @click="emitClickItem(v)"
        >
          <div
            :style="{
              color: v['color'],
              fontSize: `${v['fontSize']}px`,
              marginLeft: `${v['left']}px`,
            }"
          >
            {{ v.msg }}
          </div>
        </div>
      </div>
      <!-- 固定位置弹幕 -->
      <div class="min-barrage-constant-box">
        <!-- 顶部弹幕 -->
        <div class="barrage-item-top">
          <div
            v-for="(it, idx) in tempTopList"
            :key="`barrage-top${idx}`"
            class="min-barrage-hover"
            @click="emitClickItem(it)"
            :style="{
              color: it['color'],
              fontSize: `${it['fontSize']}px`,
            }"
          >
            {{ it.msg }}
          </div>
        </div>

        <!-- 底部弹幕 -->
        <div class="barrage-item-bottom">
          <div
            v-for="(it, idx) in tempBottomList"
            :key="`barrage-bottom${idx}`"
            class="min-barrage-hover"
            @click="emitClickItem(it)"
            :style="{
              color: it['color'],
              fontSize: `${it['fontSize']}px`,
            }"
          >
            {{ it.msg }}
          </div>
        </div>

        <!-- 任意弹幕 -->
        <!-- <div
          v-for="(it, idx) in randomList"
          :key="`barrage-random${idx}`"
          :style="handleRandomStyle(it)"
        >
          {{ it.msg }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MinBarrage",
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    speed: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
      n_left: 0,
      n_top: 0,
      reqAnimate: null,
      idx: 1,
      nextList: [], // 滚动弹幕第一屏列表
      preList: [], // 滚动弹幕第二屏列表
      allNextWidth: 0, // 第二屏 弹幕条数*每个弹幕宽度
      allPrevWidth: 0, // 第一屏 弹幕条数*每个弹幕宽度
      prevWidth: 0, // 第一屏 容器宽度
      nextWidth: 0, // 第二屏 容器宽度
      slotWidth: 0, // slot内容的宽度
      topList: [], //顶部弹幕总列表
      bottomList: [], //底部弹幕总列表
      randomList: [], //任意弹幕总列表
      topId: 1,
      bottomId: 1,
      bottomTimer: null, // 底部展示定时器
      topTimer: null, // 顶部展示定时器
      tempBottomList: [], // 临时展示底部弹幕列表
      tempTopList: [], // // 临时展示顶部弹幕列表
    };
  },

  watch: {
    list: {
      handler(newVal, oldVal = []) {
        if (newVal.length !== oldVal.length) {
          this.$nextTick(() => {
            this.init();
          });
        }
      },
    },
  },
  computed: {
    boxStyle() {
      return {
        // left: `${this.slotWidth}px`,
        // width: `${this.prevWidth}px`,
        transform: `translate3d(${-this.left}px,${this.top}px,0)`,
      };
    },
    nextBoxStyle() {
      return {
        // left: `${this.slotWidth}px`,
        // width: `${this.nextWidth}px`,
        transform: `translate3d(${-this.n_left}px,${this.n_top}px,0)`,
      };
    },
  },

  mounted() {},

  methods: {
    // 0:正常; 1:上; 2:下; 3:中间; 4: 任意位置
    handleBarrageStyle(p) {
      switch (p) {
        case 1:
          return {
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
          };
        case 2:
          return {
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
          };
        case 3:
          return {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          };
        case 4:
          let _height = this.$refs.barrage.clientHeight,
            _width = this.$refs.barrage.clientWidth,
            // max = _height > _width ? _height : _width,
            // min = _height > _width ? _width : _height,
            left = Math.round(Math.random() * (_width - 10)),
            y = Math.round(Math.random() * (_width - 10)),
            top = Math.round(Math.random() * (_height - 10));
          return {
            transform: `translate3d(${left}px,${top}px,${y}px)`,
          };
      }
    },
    handleRandomStyle(it) {
      let _height = this.$refs.barrage.clientHeight,
        _width = this.$refs.barrage.clientWidth,
        left = Math.round(Math.random() * (_width - 10)),
        // y = Math.round(Math.random() * (_width - 10)),
        top = Math.round(Math.random() * (_height - 10));
      return {
        color: it["color"],
        fontSize: `${it["fontSize"]}px`,
        transform: `translate3d(${left}px,${top}px,0)`,
      };
    },
    init() {
      // 处理固定弹幕
      //   this.handleData();
      //   this.handleConstantData();

      // 处理滚动弹幕
      this.$nextTick(() => {
        this.allPrevWidth = Array.from(
          document.querySelectorAll(".min-barrage-preitem")
        ).reduce((all, next) => {
          return (all += next.offsetWidth);
        }, 0);
        this.prevWidth = Math.floor(this.allPrevWidth / (this.count - 0.8));
        this.allNextWidth = Array.from(
          document.querySelectorAll(".min-barrage-nextitem")
        ).reduce((all, next) => {
          return (all += next.offsetWidth);
        }, 0);
        this.nextWidth = Math.floor(this.allNextWidth / (this.count - 0.8));
        // this.startMove();
      });
    },
    handleData() {
      let id = Math.floor(this.list.length / 2);
      this.preList = this.list.slice(0, id);
      this.nextList = this.list.slice(id);
      this.topList = this.list.filter((v) => {
        return v.position === 1;
      });
      this.bottomList = this.list.filter((v) => {
        return v.position === 2;
      });
      this.randomList = this.list.filter((v) => {
        return v.position === 4;
      });
      this.slotWidth = this.$refs.barrage.clientWidth;
    },
    handleConstantData() {
      this.topTimer = setInterval(() => {
        if (this.topId >= this.topList.length) {
          clearInterval(this.topTimer);
          this.tempTopList = [];
        }
        let endId = this.topId + Math.floor(Math.random() * 4);
        this.tempTopList = this.topList.slice(this.topId, endId);
        this.topId = endId;
      }, 3000);
      this.bottomTimer = setInterval(() => {
        if (this.bottomId >= this.bottomList.length) {
          clearInterval(this.bottomTimer);
          this.tempBottomList = [];
        }
        let endId = this.bottomId + Math.floor(Math.random() * 4);
        this.tempBottomList = this.bottomList.slice(this.bottomId, endId);
        this.bottomId = endId;
      }, 3000);
    },
    startMove() {
      this.reqAnimate = requestAnimationFrame(() => {
        if (this.left < this.prevWidth && this.n_left === 0) {
          this.left += this.speed;
          //   console.log("第一屏开始");
          this.startMove();
        } else if (
          this.left >= this.prevWidth &&
          this.left < this.prevWidth + this.slotWidth
        ) {
          this.left += this.speed;
          this.n_left += this.speed;
          //   console.log("第二屏开始");
          this.startMove();
        } else if (this.left >= this.prevWidth + this.slotWidth) {
          this.left = 0;
          this.n_left += this.speed;
          //   console.log("第一屏结束，二屏继续");
          this.startMove();
        } else if (this.n_left < this.nextWidth && this.left === 0) {
          this.n_left += this.speed;
          //   console.log("第一屏等待，二屏继续"); //1次
          this.startMove();
        } else if (
          this.n_left >= this.nextWidth &&
          this.n_left < this.nextWidth + this.slotWidth
        ) {
          this.left += this.speed;
          this.n_left += this.speed;
          //   console.log("第二屏继续，一屏开始");
          this.startMove();
        } else if (this.n_left >= this.nextWidth + this.slotWidth) {
          this.n_left = 0;
          this.left += this.speed;
          //   console.log("第二屏结束，一屏继续"); //1次
          this.startMove();
        }
        //   cancelAnimationFrame(this.reqAnimate);
      });
    },
    emitClickItem(v) {
      // console.log(v);
      this.$emit("clickItem", v);
    },
  },
};
</script>

<style scoped>
.min-barrage {
  position: relative;
  width: min-content;
  overflow: hidden;
}
.min-barrage-box {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  z-index: 10;
  /* overflow: hidden; */
}
.min-barrage-constant-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.min-barrage-constant {
  position: absolute;
  left: 0;
  height: min-content;
}
.min-barrage-preitem,
.min-barrage-nextitem {
  width: fit-content;
  height: fit-content;
  color: #fff;
  /* position: absolute; */
}
.min-barrage-preitem > div:hover,
.min-barrage-nextitem > div:hover,
.min-barrage-hover:hover {
  cursor: pointer;
}
.barrage-item-top {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.barrage-item-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.barrage-item-bottom {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.barrage-item-random {
  position: absolute;
  /* bottom: 0; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
}
</style>
