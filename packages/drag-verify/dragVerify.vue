<!-- 滑动/旋转/滑块/点选验证 -->
<template>
  <div class="drag-verify">
    <template v-if="type !== 3">
      <div class="drag-verify-item">
        <img
          class="drag-verify-image"
          :style="imageStyle"
          ref="dragImg"
          :src="imageSrc"
          alt=""
        />
        <template v-if="type === 4">
          <div class="click-verify">
            <div
              class="click-verify-item"
              :style="handleTextStyle(v)"
              v-for="(v, idx) in displayText"
              :key="`${v}-${idx}`"
            >
              <div
                class="click-verify-text"
                :style="textRotateStyle"
                @click="handleTextClick(v, idx)"
              >
                {{ v.text }}
              </div>
            </div>
            <template v-if="clickTipNum.length">
              <div
                class="click-verify-num"
                :style="handleTipNum(n)"
                v-for="(n, id) in clickTipNum"
                :key="n.left"
              >
                {{ id + 1 }}
              </div>
            </template>
          </div>
        </template>
        <template v-if="type === 1">
          <div
            class="drag-empty-clip"
            :style="clipEmptyStyle"
            v-show="emptyLoad"
          ></div>
          <div class="drag-clip" :style="clipStyle"></div>
        </template>
        <div class="drag-tip-success" v-if="showSuccess && sText">
          {{ sText }}
        </div>
        <div class="drag-tip-fail" v-if="showFail && fText">
          {{ fText }}
        </div>
        <div
          class="drag-verify-refresh"
          title="点击刷新验证码"
          v-if="showRefresh"
          @click="handleRefresh"
        >
          <svg
            t="1631769418053"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2154"
            width="30"
            height="30"
            :fill="refreshColor"
          >
            <path
              d="M509.167 230.4A281.6 281.6 0 1 0 793.6 512a280.303 280.303 0 0 0-65.673-180.77 25.6 25.6 0 0 1 39.254-32.905A331.503 331.503 0 0 1 844.8 512c0 183.808-148.992 332.8-332.8 332.8S179.2 695.808 179.2 512c0-177.493 138.923-322.492 313.924-332.288l-45.056-45.056a25.6 25.6 0 1 1 36.182-36.215l96.563 96.529a25.6 25.6 0 0 1 0 36.215l-96.563 96.53a25.6 25.6 0 1 1-36.182-36.182l61.099-61.099z"
              p-id="2155"
            ></path>
          </svg>
        </div>
      </div>
    </template>
    <template v-if="type !== 4">
      <div
        class="drag-area"
        :style="dragStyle"
        @mousemove="dragStart"
        @mouseup="dragLeave"
        @mouseleave="dragLeave"
        @touchmove="dragStart"
        @touchend="dragLeave"
      >
        <div
          :class="['drag-area-progress', { backAnimate: isBack }]"
          :style="progressStyle"
        >
          {{ isSuccess ? s_text : "" }}
        </div>
        <div class="drag-area-text">
          <span ref="dragText">
            {{ isSuccess ? "" : dragText }}
          </span>
        </div>
        <div
          :class="['drag-area-action', { backAnimate: isBack }]"
          :style="actionStyle"
          @mousedown="dragInit"
          @touchstart="dragInit"
        ></div>
      </div>
    </template>
    <template v-if="type === 4">
      <div class="click-tip" :style="dragStyle" v-show="!s_text">
        <span class="highlight" ref="highlight">
          <span>请依次点击</span>
          <span class="click-tip-target" v-for="v in targetText" :key="v"
            >“{{ v }}”</span
          >
        </span>
      </div>
      <div
        v-if="s_text"
        :style="clickStatusStyle"
        :class="[
          clickStatus && s_text ? 'click-tip-success' : 'click-tip-fail',
        ]"
      >
        {{ s_text }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "MinDragVerify",
  props: {
    // 验证类型 1:拼图 2:旋转 3:只有滑块 4:按顺序选字
    type: {
      type: Number,
      default: 1,
    },
    // 图片宽度
    width: {
      type: [Number, String],
      default: 300,
    },
    // 图片高度
    height: {
      type: [Number, String],
      default: 200,
    },
    // 图片曲率
    radius: {
      type: [Number],
      default: 5,
    },
    // 图片路径
    src: {
      type: [String],
      default: "",
    },
    // 剪切区域宽度
    clipWidth: {
      type: [Number, String],
      default: 60,
    },
    // 剪切区域高度
    clipHeight: {
      type: [Number, String],
      default: 40,
    },
    // 剪切区域曲率
    clipRadius: {
      type: [Number],
      default: 0,
    },
    // 是否显示成功提示
    showSuccess: {
      type: Boolean,
      default: true,
    },
    // 是否显示失败提示
    showFail: {
      type: Boolean,
      default: true,
    },
    // 验证成功文字
    successText: {
      type: String,
      default: "",
    },
    // 验证失败文字
    failText: {
      type: String,
      default: "验证失败，请重新开始",
    },
    // 拖拽区域高度,宽度默认图片宽度
    dragHeight: {
      type: [Number, String],
      default: 40,
    },
    // 拖拽区域默认背景色
    dragBg: {
      type: String,
      default: "rgb(238, 238, 238)",
    },
    // 拖拽区域左侧进度背景色
    progressBg: {
      type: String,
      default: "rgb(118, 198, 29)",
    },

    // 滑动区域默认显示文字
    dragText: {
      type: String,
      default: "向右滑动使图形完整",
    },
    // 滑块宽度，高度跟随拖拽区域
    slideWidth: {
      type: [String, Number],
      default: 40,
    },
    // 滑块背景色
    slideBg: {
      type: String,
      default: "rgb(255,255,255)",
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: 14,
    },
    // 成功偏移量
    offset: {
      type: [Number],
      default: 5,
    },
    // 是否显示右上角刷新图标
    showRefresh: {
      type: [Boolean],
      default: true,
    },
    // 是否显示剪切图片边框点点
    showDot: {
      type: Boolean,
      default: false,
    },
    // 底部成功提示文字
    bottomSuccessText: {
      type: String,
      default: "",
    },
    // 底部失败提示文字
    bottomFailText: {
      type: String,
      default: "",
    },
    // 右上角刷新按钮颜色
    refreshColor: {
      type: String,
      default: "#333",
    },
    /* 选字配置 */
    // 文字数组
    textData: {
      type: Array,
      default: () => [],
      //   validator: (val) => {
      //     return val.length >= 3;
      //   },
    },
    // 目标文字个数，需<=文字数组长度
    textNum: {
      type: Number,
      default: 3,
    },
    // 展示文字大小
    clickFontSize: {
      type: Number,
      default: 36,
    },
  },
  data() {
    return {
      emptyLoad: false,
      clipW: 0, // 空白区域宽度
      clipH: 0, //空白区域高度
      clipTop: 0, // 剪切区域距离顶部位置
      clipLeft: 0, // 剪切区域距离左边位置
      sText: "", // 成功提示
      fText: "", // 失败提示
      isPress: false, // 是否长按
      startX: 0,
      isSuccess: false, // 验证是否成功
      s_text: "",
      startTime: "",
      endTtime: "",
      speed: 90,
      tempTip: "验证通过，超过90%用户",
      initDeg: 0, // 初始旋转角度
      rotate: 0, //当前旋转角度
      isBack: false,
      allText: [
        "你",
        "是",
        "唯",
        "一",
        "个",
        "我",
        "奔",
        "赴",
        "千",
        "里",
        "跨",
        "越",
        "山",
        "河",
        "都",
        "想",
        "见",
        "的",
        "人",
        "如",
        "果",
        "说",
        "林",
        "忆",
        "莲",
        "李",
        "宗",
        "盛",
        "灵",
        "魂",
        "那",
        "便",
        "信",
        "仰",
        "追",
        "求",
        "在",
        "笔",
        "下",
        "总",
        "会",
        "不",
        "经",
        "意",
        "提",
        "起",
        "天",
        "对",
        "前",
        "世",
        "五",
        "百",
        "次",
        "回",
        "眸",
        "才",
        "换",
        "来",
        "今",
        "生",
        "擦",
        "肩",
        "而",
        "过",
        "认",
        "识",
        "小",
        "定",
        "几",
        "所",
        "以",
        "感",
        "谢",
        "缘",
        "分",
        "或",
        "许",
        "这",
        "句",
        "话",
        "仅",
        "也",
        "有",
        "其",
        "他",
        "种",
        "很",
        "奇",
        "妙",
        "东",
        "西",
        "但",
        "仍",
        "然",
        "珍",
        "惜",
        "份",
        "与",
        "相",
        "遇",
      ], // 所有文字，未自定义则从中选取
      displayText: [], // 图片上显示的文字集合
      targetText: [], // 目标文字集合
      clickTipNum: [], // 点击出现序号提示框集合
      currId: 0, // 当前点击次数
      clickStatus: false,
    };
  },

  computed: {
    imageSrc() {
      return this.src || `https://picsum.photos/${this.width}/${this.height}`;
    },
    imageStyle() {
      const { width, height, radius, type } = this;
      if (type === 2) {
        return {
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: "50%",
          transform: `rotateZ(${this.rotate}deg)`,
        };
      } else {
        return {
          width: `${width}px`,
          height: `${height}px`,
          "border-top-right-radius": `${radius}px`,
          "border-top-left-radius": `${radius}px`,
        };
      }
    },
    clipEmptyStyle() {
      if (this.type === 1) {
        const { clipWidth, clipHeight, clipRadius, width, height } = this;
        this.clipH = this.random(
          (height - clipHeight) * 0.4,
          (height - clipHeight) * 0.9
        );
        this.clipW = this.random(
          (width - clipWidth) * 0.4,
          (width - clipWidth) * 0.9
        );
        this.clipTop = this.clipH;
        return {
          width: `${clipWidth}px`,
          height: `${clipHeight}px`,
          borderRadius: `${clipRadius}px`,
          top: `${this.clipH}px`,
          left: `${this.clipW}px`,
        };
      }
    },
    clipStyle() {
      if (this.type === 1) {
        const {
          width,
          clipTop,
          clipLeft,
          clipH,
          clipW,
          clipHeight,
          clipWidth,
          showDot,
          imageSrc,
          slideWidth,
        } = this;
        let _tempLeft =
          clipLeft - slideWidth / 2 > 0 ? clipLeft - slideWidth / 2 : 0;
        return {
          width: `${clipWidth}px`,
          height: `${clipHeight}px`,
          // borderRadius: `${clipRadius}px`,
          background: `url(${imageSrc}) ${-clipW}px  ${-clipH}px/${width}px `,
          top: `${clipTop}px`,
          left: `${_tempLeft}px`,
          border: showDot ? `1px dotted hsla(0, 0%, 100%, 0.4)` : "",
        };
      }
    },
    dragStyle() {
      const { width, dragHeight, dragBg, radius, fontSize } = this;
      return {
        width: `${width}px`,
        height: `${dragHeight}px`,
        lineHeight: `${dragHeight}px`,
        background: `${dragBg}`,
        "border-bottom-right-radius": `${radius}px`,
        "border-bottom-left-radius": `${radius}px`,
        fontSize: `${fontSize}px`,
      };
    },
    actionStyle() {
      const { slideWidth, slideBg, clipLeft } = this;
      let _tempLeft =
        clipLeft - slideWidth / 2 > 0 ? clipLeft - slideWidth / 2 : 0;
      return {
        width: `${slideWidth}px`,
        left: `${_tempLeft}px`,
        background: `${slideBg}`,
      };
    },
    progressStyle() {
      const { clipLeft, progressBg } = this;
      return {
        width: `${clipLeft}px`,
        background: `${progressBg}`,
      };
    },
    clickStatusStyle() {
      const { width, dragHeight } = this;
      return {
        width: `${width}px`,
        height: `${dragHeight}px`,
        lineHeight: `${dragHeight}px`,
      };
    },
  },

  watch: {
    src: {
      handler(val, old) {
        if (val !== old) {
          this.handleRefresh();
        }
      },
      immediate: false,
    },
    // textData: {
    //   handler(val, old) {
    //     if (val !== old) {
    //         this.handleRefresh();
    //     }
    //   },
    //   immediate: false,
    // },
  },

  mounted() {
    if (this.type !== 4) {
      const textEle = this.$refs.dragText,
        width = this.width / 2 + "px";
      textEle.style.setProperty("--textWidth", width);
    }
    if (this.type === 1) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.emptyLoad = true;
        }, 500);
      });
    }

    if (this.type === 2) {
      this.initDeg = this.random(60, 300);
      this.rotate = this.initDeg;
    }
    if (this.type === 4) {
      this.initTextData();
      this.$nextTick(() => {
        const textEle = this.$refs.highlight,
          width = this.width / 2 + "px";
        textEle.style.setProperty("--lightWidth", width);
      });
    }
  },

  methods: {
    random(min = 1, max = 255) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // 初始化
    dragInit(e) {
      if (!this.isSuccess) {
        this.$emit("start");
        this.startX = e.pageX || e.touches[0].pageX;
        this.refresh();
        this.isPress = true;
        this.startTime = new Date().getTime();
      }
    },
    dragStart(e) {
      if (!this.isSuccess && this.isPress) {
        const { type, initDeg } = this;
        this.clipLeft = (e.pageX || e.touches[0].pageX) - this.startX;
        if (type === 2) {
          this.rotate = initDeg - this.clipLeft;
        }
      }
    },
    dragLeave() {
      if (!this.isSuccess && this.isPress) {
        this.isPress = false;
        if (this.type === 2) {
          this.verifySpin();
        } else if (this.type === 1) {
          this.verify();
        } else {
          this.verifySlide();
        }
      }
    },
    // 1验证拼图是否成功
    verify() {
      const { clipLeft, offset, slideWidth, clipW } = this;
      if (Math.abs(clipLeft - clipW - slideWidth / 2) <= offset) {
        this.endTtime = new Date().getTime();
        this.speed =
          (
            1 -
            Math.pow(
              Number((this.endTtime - this.startTime) / 1000).toFixed(2),
              2
            ) *
              0.02
          ).toFixed(2) * 100;
        this.isSuccess = true;
        this.sText =
          this.successText ||
          `验证通过，超过${this.speed > 0 ? this.speed : 1}%用户`;
        this.clipLeft = clipW + slideWidth / 2;
        this.$emit("success");
      } else {
        this.$emit("fail");
        this.fText = this.failText;
        this.isBack = true;
        this.clipLeft = 0;
        this.isSuccess = false;
      }
    },
    // 2验证旋转
    verifySpin() {
      const { rotate, offset, slideWidth, clipW } = this;
      if (Math.abs(rotate) <= offset) {
        this.endTtime = new Date().getTime();
        this.speed =
          (
            1 -
            Math.pow(
              Number((this.endTtime - this.startTime) / 1000).toFixed(2),
              2
            ) *
              0.02
          ).toFixed(2) * 100;
        this.isSuccess = true;
        this.sText =
          this.successText ||
          `验证通过，超过${this.speed > 0 ? this.speed : 1}%用户`;
        this.rotate = 0;
        this.$emit("success");
      } else {
        this.$emit("fail");
        this.fText = this.failText;
        this.isBack = true;
        this.clipLeft = 0;
        this.isSuccess = false;
        this.rotate = this.initDeg;
      }
    },
    // 3验证滑块
    verifySlide() {
      const { clipLeft, offset, slideWidth, width } = this;
      if (clipLeft + slideWidth / 2 >= width) {
        this.clipLeft = width - slideWidth / 2;
        this.isSuccess = true;
        this.$emit("success");
        this.s_text = this.bottomSuccessText || "验证成功";
      } else {
        this.$emit("fail");
        this.isBack = true;
        this.clipLeft = 0;
        this.isSuccess = false;
      }
    },
    // 重置
    refresh() {
      this.clipLeft = 0;
      this.fText = "";
      this.sText = "";
      this.isSuccess = false;
      this.isPress = false;
      this.isBack = false;
    },
    // 刷新
    handleRefresh() {
      this.$emit("refresh");
      const { clipWidth, clipHeight, width, height } = this;
      if (this.type !== 4) {
        if (this.type === 2) {
          this.initDeg = this.random(60, 300);
          this.rotate = this.initDeg;
          this.refresh();
        } else {
          this.clipH = this.random(
            (height - clipHeight) * 0.25,
            (height - clipHeight) * 0.9
          );
          this.clipW = this.random(
            (width - clipWidth) * 0.25,
            (width - clipWidth) * 0.9
          );
          this.refresh();
        }
      } else {
        this.initTextData();
      }
    },

    /* 文字点选 */
    // 随机打乱数组
    randomArray(arr) {
      for (let idx = 0; idx < arr.length; idx++) {
        const index = Math.round(Math.random() * (arr.length - 1 - idx)) + idx;
        [arr[idx], arr[index]] = [arr[index], arr[idx]];
      }
      return arr;
    },
    // 初始化文字数据
    initTextData() {
      const { textNum, height, width } = this;
      this.displayText = [];
      this.clickTipNum = [];
      this.currId = 0;
      this.clickStatus = false;
      this.s_text = "";
      if (this.textData.length >= textNum) {
        this.displayText = [...this.textData];
      } else {
        let idx = 0;
        for (let i = 0; i <= textNum + idx; i++) {
          let text = this.allText[this.random(0, 99)];
          let flag = this.displayText.some((v) => {
            return text === v;
          });
          if (flag) {
            idx += 1;
          } else {
            this.displayText = [...this.displayText, text];
          }
        }
      }
      let temp = [...this.displayText];
      this.targetText = this.randomArray(temp).slice(1);
      for (let id = 0; id < this.displayText.length; id++) {
        let start =
            20 + (id - 1 >= 0 ? this.displayText[id - 1].left + width / 6 : 0),
          end =
            id - 1 >= 0 ? this.displayText[id - 1].left + width / 6 : width / 6,
          _left = this.random(start, end),
          _top = this.random(height * 0.25, height * 0.55),
          color = `rgb(${this.random(0, 255)},${this.random(
            0,
            255
          )},${this.random(0, 255)})`,
          rotate = this.random(0, 90);
        this.displayText[id] = {
          text: this.displayText[id],
          top: _top,
          left: _left,
          color: color,
          rotate: rotate,
        };
      }
    },

    // 处理文字样式
    handleTextStyle(v) {
      const { clickFontSize } = this;
      this.textRotateStyle = {
        transform: `rotateZ(${v.rotate}deg)`,
      };
      return {
        color: v.color,
        fontSize: `${clickFontSize}px`,
        left: `${v.left}px`,
        top: `${v.top}px`,
      };
    },

    handleTextClick(v) {
      if (this.currId < this.textNum) {
        this.currId++;
        this.clickTipNum.push({
          left: v.left + 10,
          top: v.top - 15,
          text: v.text,
        });
        if (this.currId === this.textNum) this.checkText();
      }
    },
    handleTipNum(v) {
      return {
        top: `${v.top}px`,
        left: `${v.left}px`,
      };
    },
    // 开始校验文字顺序
    checkText() {
      const { clickTipNum, targetText } = this;
      let res = targetText.every((v, id) => {
        return v === clickTipNum[id].text;
      });
      if (res) {
        this.$emit("success");
        this.clickStatus = true;
        this.s_text = this.bottomSuccessText || "✔ 验证成功";
      } else {
        this.$emit("fail");
        this.clickStatus = false;
        this.s_text = this.bottomFailText || "✖ 验证失败，请右上角刷新重试";
        // this.handleRefresh();
      }
    },
  },
};
</script>

<style scoped>
:root {
  /* --textWidth: "10px"; */
  --lightWidth: "100px";
}
.drag-verify {
  user-select: none;
}
.drag-verify-item {
  overflow: hidden;
  position: relative;
}
.drag-verify-image {
  vertical-align: middle;
}
.drag-empty-clip {
  position: absolute;
  background: hsla(0, 0%, 100%, 0.8);
}
.drag-clip {
  position: absolute;
  z-index: 5;
}
.drag-tip-success,
.drag-tip-fail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  overflow: hidden;
  padding: 2px 10px;
  font-size: 12px;
  text-align: center;
}
.drag-tip-success {
  background: hsla(0, 0%, 100%, 0.6);
  color: green;
}
.drag-tip-fail {
  background: rgba(0, 0, 0, 0.6);
  color: #ff0;
}
.drag-area {
  position: relative;
  z-index: 99;
  overflow: hidden;
}
.drag-area-text {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  color: #333;
  text-align: center;
  overflow: hidden;
  user-select: none;
}
.drag-area-text span {
  position: relative;
}
.drag-area-text span::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 20px;
  height: 100%;
  background: #fff;
  filter: blur(5px);
  animation: slideLight 3s infinite ease;
}

.drag-area-action,
.drag-area-progress {
  position: absolute;
  top: 0;
  height: 100%;
}
.drag-area-action:hover {
  cursor: move;
}
.drag-area-action::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: "»";
  font-size: 24px;
  color: #333;
}
.drag-area-progress {
  color: #fff;
  overflow: hidden;
  text-align: center;
  /* transition: left 0.5s ease; */
}
.drag-verify-refresh {
  position: absolute;
  right: 5px;
  top: 5px;
  color: #333;
  z-index: 5;
}
.drag-verify-refresh:hover {
  cursor: pointer;
  animation: refresh 1s ease;
}
.drag-verify-refresh svg {
  width: 30px;
  height: 30px;
}
.backAnimate {
  transition: all 0.5s;
}
.click-verify {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
.click-verify-item {
  position: absolute;
  font-weight: bold;
}
.click-verify-text:hover {
  cursor: pointer;
}

.click-tip {
  width: 100%;
  overflow: hidden;
  color: #333;
  text-align: center;
}
.highlight {
  position: relative;
}
.highlight::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 100%;
  content: "";
  background: #fff;
  filter: blur(5px);
  animation: highlights 3s infinite ease;
}
.click-tip-target {
  font-weight: bold;
  color: black;
  margin: 0 5px;
}
.click-verify-num {
  position: absolute;
  font-size: 20px;
  background: cornflowerblue;
  border-radius: 50%;
  color: #fff;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 14px;
}
.click-tip-success {
  background: rgb(82, 204, 186);
  color: #fff;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.click-tip-fail {
  background: #f53f3f;
  color: #fff;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
@keyframes refresh {
  0% {
    transform: scale(0.8) rotate(360deg);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slideLight {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(var(--textWidth), 0);
  }
}
@keyframes highlights {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(var(--lightWidth), 0);
  }
}
</style>
