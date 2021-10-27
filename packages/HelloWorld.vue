<template>
  <div class="box">
    <!-- 虚拟列表 -->
    <!-- <div
      class="hello"
      id="scrollTest"
      v-infinite-scroll="{
        options: { delay: 300, distance: 100, immediate: true },
        callback: loadMore,
      }"
    >
      <div class="hello-test" v-for="v in arr" :key="`${v}keys`">
        {{ v }}
      </div>
    </div> -->
    <!-- 骨架屏 -->
    <!-- <div class="skeleton">
      <min-skeleton :show="showEle" :rows="10">
        <template slot="template">
          <min-skeleton-item
            type="image"
            style="width:300px;height:300px"
          ></min-skeleton-item>

          <min-skeleton-item
            style="margin-top:15px;margin-bottom:15px"
          ></min-skeleton-item>
          <min-skeleton-item style="width:25%"></min-skeleton-item>
          <min-skeleton-item
            style="margin-top:15px;margin-bottom:15px"
          ></min-skeleton-item>
          <min-skeleton-item
            type="image"
            style="width:100px;height:100px"
          ></min-skeleton-item>

          <min-skeleton-item style="width:50%"></min-skeleton-item>
        </template>
      </min-skeleton>
    </div> -->
    <!-- 瀑布流 -->
    <!-- <div class="waterfall" ref="water">
      <min-waterfall
        :waterData="waterData"
        :width="240"
        @click="clickItem"
        @scrollBottom="scrollBottomFunc"
        customSrc="cover"
      >
        <template v-for="(v, i) in waterData" v-slot:[`headerSlot${i}`]
          ><div :key="`${v.id}-${i}`" class="waterItem">
            {{ i }}
            头部slot
          </div>
        </template>
        <template v-for="(v, i) in waterData" v-slot:[`footerSlot${i}`]
          ><div :key="`${v.id}-${i}`" class="waterItem">
            尾部slot
          </div>
        </template>
      </min-waterfall> 
    </div>-->

    <!-- 弹幕 -->
    <!-- <div>
      <min-barrage
        :list="barrageList"
        :count="3"
        @clickItem="handleClickBarrage"
      >
        <div class="barrage"></div>
      </min-barrage>
    </div> -->

    <!-- 数字翻牌器 -->
    <!-- <div class="single-num-box">
      <div v-for="(v, idx) in singleNumber" :key="v">
        <MinNumberScroll
          v-if="v !== ','"
          class="single-num"
          :singleResult="v"
          :singleDuration="idx + 1"
        ></MinNumberScroll>
        <div v-else class="single-dot">,</div>
      </div>
    </div> -->
    <!-- <div class="single-num-box">
      <MinNumberScroll :scrollType="2" :result="tempNumber"></MinNumberScroll>
    </div> -->

    <!-- 手画天气icon -->
    <!-- <div class="weather">
      <div class="weather-item-sun">
        <div class="weather-sun"></div>
      </div>
      <div class="weather-item">
        <div class="weather-cloud"></div>
      </div>
      <div class="weather-item">
        <div class="weather-rain"></div>
      </div>
      <div class="weather-item">
        <div class="weather-snow"></div>
      </div>
      <div class="weather-item weather-item-light">
        <div class="weather-light"></div>
      </div>
    </div> -->

    <!-- css 3d webpack logo-->
    <!-- <div class="d-box">
      <div :class="v" v-for="v in classList" :key="v"></div>
    </div> -->

    <!-- 堆叠式轮播 -->
    <!-- <div class="spin">
      <min-carousel :loop="false">
        <template slot="pre">
          <div>左</div>
        </template>
        <template slot="next">
          <div>右</div>
        </template>
        <min-carousel-item
          :curIndex="idx"
          v-for="(v, idx) in swipperList"
          :key="idx"
          :width="300"
        >
          <div class="min-carousel-img" :style="{ background: v.bg }">
            {{ v.text }}
          </div>
          <div class="min-carousel-text">{{ v.text }}</div>
        </min-carousel-item>
      </min-carousel>
    </div> -->

    <!-- 滑动验证码 -->
    <!-- <div class="verify">
      <min-drag-verify
        @start="verifyStart"
        @refresh="verifyFresh"
        @success="verifySuccess"
        @fail="verifyFail"
        slideBg="#1991fa"
      ></min-drag-verify>
    </div> -->

    <!-- 弹框 -->
    <!-- <div class="modal">
      <div class="modal-item">
        <MinModal :visible.sync="showModal">
          <div class="modal-class">哈哈</div>
        </MinModal>
      </div>
    </div>
    <button class="modal-btn" @click="showModal = true">出现</button> -->
  </div>
</template>

<script>
// import MinSkeleton from "./skeleton/index.vue";
// import MinSkeletonItem from "./skeleton/item.vue";
// import MinWaterfall from "./waterfall/index.vue";
// import { getPolicy } from "../api/index";
// import MinBarrage from "../components/barrage/index.vue";
// import MinNumberScroll from "../components/numberScroll/index.vue";
// import { barrageList } from "../utils/data";
// import MinCarousel from "../components/carousel/index.vue";
// import MinCarouselItem from "../components/carousel/carousel-item.vue";
// import MinDragVerify from "../components/drag-verify/dragVerify.vue";
// import MinModal from "../components/modal/index.vue";
export default {
  name: "HelloWorld",
  components: {
    // MinSkeleton,
    // MinSkeletonItem,
    // MinWaterfall,
    // MinBarrage,
    // MinNumberScroll,
    // MinCarousel,
    // MinCarouselItem,
    // MinDragVerify,
    // MinModal,
  },
  data: () => {
    return {
      arr: [],
      num: 11,
      showEle: true,
      waterData: [],
      tempArr: [
        {
          id: 1,
          cover:
            "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/1.jpg",
          text: "这是内容",
        },
        {
          id: 2,
          cover:
            "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/5.jpg",
          text: "这是内容",
        },
        {
          id: 3,
          cover:
            "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/4.jpg",
          text: "这是内容",
        },
        {
          id: 4,
          cover:
            "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/6.jpg",
          text: "这是内容",
        },
        {
          id: 5,
          cover:
            "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/8.jpg",
          text: "这是内容",
        },
      ],
      barrageList: [],
      tempNumber: "4873",
      singleNumber: "9654",
      classList: ["top", "bottom", "left", "right", "front", "back"],
      swipperList: [
        {
          id: 1,
          text: "1",
          //   img: require("../../assets/mayi.jpeg"),
          bg: "blue",
        },
        {
          id: 2,
          text: "12",
          //   img: require("../../assets/mayi1.jpeg"),
          bg: "green",
        },
        {
          id: 3,
          text: "123",
          //   img: require("../../assets/mayi2.jpeg"),
          bg: "red",
        },
        {
          id: 12,
          text: "142",
          //   img: require("../../assets/mayi3.jpg"),
          bg: "black",
        },
        {
          id: 1,
          text: "1",
          //   img: require("../../assets/mayi.jpeg"),
          bg: "blue",
        },
        {
          id: 2,
          text: "12",
          //   img: require("../../assets/mayi1.jpeg"),
          bg: "green",
        },
        {
          id: 3,
          text: "123",
          //   img: require("../../assets/mayi2.jpeg"),
          bg: "red",
        },
        {
          id: 12,
          text: "142",
          //   img: require("../../assets/mayi3.jpg"),
          bg: "black",
        },
      ],
      dragSrc: require("../assets/mayi1.jpeg"),
      showModal: false,
    };
  },
  created() {
    // this.handleData();
  },
  mounted() {
    // this.setData();
    // this.singleNumber = this.formatStr("9654", 3);
    // console.log(this.singleNumber);
    setTimeout(() => {
      //   this.barrageList = barrageList;
      //   this.tempNumber = "2928";
      this.showModal = true;
    }, 2000);
    // this.$refs.water.addEventListener("scroll", (e) => {
    //   console.log(e);
    // });
  },
  methods: {
    loadMore() {
      for (let i = 0; i < 10; i++) {
        this.arr.push(i + Math.random() * 1000);
      }
    },
    setData() {
      setTimeout(() => {
        const temp = [];
        for (let i = 0; i < 10; i++) {
          temp.push(i);
        }
        this.arr = temp;
      }, 0);
    },
    clickItem(e) {
      console.log(e);
    },
    handleData() {
      Promise.all(
        [1, 4, 3].map((v) => {
          return getPolicy({
            // comId: "3944142638547968",
            comId: "4283656520221696",
            type: v,
            isEnable: 0,
          });
        })
      )
        .then((res) => {
          //   console.log(res);
          this.waterData = [
            ...res[0].data,
            ...res[1].data,
            ...res[2].data,
            ...this.tempArr,
          ];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadMoreImage() {
      this.waterData = [...this.waterData, ...this.tempArr, ...this.tempArr];
    },
    scrollBottomFunc() {
      console.log("滚动到触发区域");
    },
    handleClickBarrage(v) {
      console.log(v);
    },
    formatStr(v, num) {
      return v.replace(
        new RegExp(`\\d{1,${num}}(?=(\\d{${num}})+$)`, "g"),
        (i) => i + ","
      );
    },
    handleIndex(id) {
      console.log(id);
    },
    verifySuccess() {
      console.log("sucess");
    },
    verifyFail() {
      console.log("fail");
    },
    verifyStart() {
      console.log("开始验证");
    },
    verifyFresh() {
      //   this.dragSrc = require("../assets/mayi1.jpeg");
    },
  },
};
</script>
<style scoped>
.hello {
  /* border: 1px solid red; */
  height: 400px;
  width: 300px;
  overflow: auto;
}
.hello-test {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
  background-color: indianred;
  text-align: center;
}
.box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.skeleton {
  height: 500px;
  width: 800px;
  /* border: 1px solid red; */
}
.waterfall {
  width: 800px;
  height: 900px;
  /* width: 100%;
  height: 100%; */
  overflow-y: auto;
}
.waterItem {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid green;
  text-align: center;
}
.barrage {
  width: 800px;
  height: 500px;
  border: 1px solid red;
  background: black;
}
.single-num-box {
  display: flex;
}
.single-num {
  /* padding: 4px; */
  border-radius: 10px;
  font-size: 30px;
  margin: 0 10px;
  color: #fff;
  background-color: black;
  position: relative;
}
.single-num::before {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 2px;
  background-color: gray;
  content: "";
}
.single-dot {
  font-size: 60px;
  color: black;
}
.weather {
  display: flex;
}
.weather-item,
.weather-item-sun {
  width: 100px;
  height: 100px;
  margin: 0 20px;
  background-color: #23b7e5;
  border-radius: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}
.weather-sun {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f6d963;
  z-index: 4;
  position: relative;
  box-shadow: 0 0 30px #ff0;
}
.weather-item-sun::before {
  position: absolute;
  content: "";
  bottom: 32%;
  width: 0;
  height: 0;
  border-bottom: 50px solid #ffeb3b;
  border-top: 30px solid transparent;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  z-index: 1;
  animation: scale-sun 3s infinite;
}
.weather-item-sun::after {
  position: absolute;
  content: "";
  top: 32%;
  width: 0;
  height: 0;
  border-top: 50px solid #ffeb3b;
  border-bottom: 30px solid transparent;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  z-index: 1;
  animation: scale-sun 3s infinite;
}
@-webkit-keyframes scale-sun {
  0% {
    transform: scale(0.9);
    opacity: 0.6;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.6;
  }
}

.weather-cloud::before,
.weather-rain::before,
.weather-snow::before,
.weather-light::before {
  position: absolute;
  content: "";
  top: 30%;
  left: 20%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: #fff 12px -8px 0 2px, #fff 30px -8px 0 2px, #fff 40px 0 0 1px,
    #fff 14px 5px 0 1px, #fff 24px 3px 0 1px, #ccc 15px -14px 0 1px,
    #ccc 30px -14px 0 1px, #ccc 40px -8px 0 1px;
}
.weather-cloud::before {
  animation: translate-cloud 2s linear infinite;
}
@-webkit-keyframes translate-cloud {
  0% {
    transform: translateY(20%);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(20%);
  }
}
.weather-rain::after {
  position: absolute;
  content: "";
  top: 70%;
  left: 25%;
  width: 2px;
  height: 8px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: #fff 10px -2px 0 0, #fff 0 -14px 0 0, #fff 10px -16px 0 0,
    #fff 20px -12px 0 0, #fff 20px 0 0 0, #fff 30px -2px 0 0,
    #fff 30px -14px 0 0, #fff 40px -4px 0 0, #fff 40px -17px 0 0,
    #fff 50px -16px 0 0, #fff 50px -2px 0 0;
  animation: rotate-rain 2s linear infinite;
  opacity: 0.6;
}
@-webkit-keyframes rotate-rain {
  0% {
    transform: rotate(10deg);
    transform: translateY(-10px);
  }
  50% {
    transform: rotate(0deg);
    transform: translateY(0);
    opacity: 0.8;
  }
  100% {
    transform: rotate(10deg);
    transform: translateY(10px);
    opacity: 0;
  }
}
.weather-snow::after {
  position: absolute;
  content: "";
  top: 70%;
  left: 25%;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: #fff 10px -2px 0 0, #fff 0 -12px 0 0, #fff 10px -12px 0 0,
    #fff 20px -10px 0 0, #fff 20px 0 0 0, #fff 30px -2px 0 0,
    #fff 30px -12px 0 0, #fff 40px -4px 0 0, #fff 40px -15px 0 0,
    #fff 50px -12px 0 0, #fff 50px -2px 0 0;
  animation: translate-snow 2s linear infinite;
  opacity: 0.6;
}
@-webkit-keyframes translate-snow {
  0% {
    transform: translateY(-15px);
  }
  50% {
    transform: translateY(0);
    opacity: 0.8;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}

.weather-item-light::before {
  position: absolute;
  left: 42%;
  top: 48%;
  content: "";
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 15px solid blueviolet;
  border-left: 10px solid transparent;
  border-right: 0px solid transparent;
  transform: rotate(6deg);
  animation: opacity-light 2s linear infinite;
}
.weather-item-light::after {
  position: absolute;
  left: 47%;
  bottom: 6%;
  content: "";
  width: 0;
  height: 0;
  border-bottom: 10px solid transparent;
  border-top: 15px solid blueviolet;
  border-left: 0px solid transparent;
  border-right: 10px solid transparent;
  transform: rotate(10deg);
  animation: opacity-light 2s linear infinite;
}

@-webkit-keyframes opacity-light {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

/* 3d webpack logo */
.d-box {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transform-origin: 50px 50px;
}

.spin {
  /* width: 600px;
  height: 500px;
  border: 1px solid red; */
}
.min-carousel-img {
  width: 300px;
  height: 200px;
  border: 1px solid blue;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 20px;
  color: #fff;
}
.min-carousel-text {
  line-height: 50px;
  color: red;
  font-size: 20px;
  border: 1px solid yellowgreen;
  border-radius: 20px;
}
.modal {
  width: 200px;
  height: 300px;
}
.modal-item {
  width: 200px;
  height: 300px;
  background: gray;
  position: absolute;
}
.modal-class {
  margin-top: 50px;
  padding: 20px;
  background: black;
  color: #fff;
}
.modal-btn {
  background: #fff;
  color: black;
}
</style>

<style>
.number-scroll-style {
  color: #fff;
  background-color: darkcyan;
  padding: 10px 14px;
  /* border-radius: 6px; */
}
.single-style {
  /* background-color: darkcyan; */
  padding: 10px 14px;
}
</style>
