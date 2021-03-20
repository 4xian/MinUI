<template>
  <div id="app">
    <!-- <div class="test-btn">
      <min-button size="0.5" text="green">按钮</min-button>
      <min-button simple="gray">Button</min-button>
      <min-button type="blue">默认按钮</min-button>
      <min-button>默认按钮</min-button>
      <min-button type="yellow">上一页</min-button>
      <min-button type="red">下一页</min-button>
      <min-button type="green">默认按钮</min-button>
      <min-button type="blue">
        <i class="min-icon-top"></i>
      </min-button>
      <min-button type="red" size="2" @click="testBtn" disabled
        >Apple</min-button
      >
    </div>

    <div class="test-tag">
      <min-tag text="red">
        默认标签
      </min-tag>
      <min-tag text="blue">
        默认标签
      </min-tag>
      <min-tag simple="info">
        默认标签
      </min-tag>
      <min-tag simple="default" underline>
        默认标签
      </min-tag>
      <min-tag simple="green">
        默认标签
      </min-tag>
      <min-tag simple="yellow">
        默认标签
      </min-tag>
      <min-tag simple="red">
        默认标签
      </min-tag>
      <min-tag>
        默认标签
      </min-tag>
      <min-tag type="blue">
        默认标签
      </min-tag>
      <min-tag type="red">
        默认标签
      </min-tag>
      <min-tag type="info">
        默认标签
      </min-tag>
      <min-tag type="yellow" close @close="iconClose">
        默认标签
      </min-tag>
      <min-tag type="green" @close="iconClose">
        默认标签
      </min-tag>
    </div>

    <div class="test-tag">
      <min-link underline href="http://www.baidu.com">
        默认连接
      </min-link>
      <min-link disabled>
        默认连接
      </min-link>
      <min-link color="red" bold size="1.5" @click="testLink">
        默认连接
        <template slot="img">
          <img src="./assets/logo.png" width="20" height="20" />
        </template>
      </min-link>
    </div>

    <div class="test-tag">
      <min-mark content="9">
        <min-button>默认按钮</min-button>
      </min-mark>
      <min-mark :content="66" :max="50">
        <min-button type="blue">默认按钮</min-button>
      </min-mark>
      <min-mark content="new" bgColor="orange">
        <min-button type="red">默认按钮</min-button>
      </min-mark>
      <min-mark dot :visible="false">
        <min-button type="yellow">默认按钮</min-button>
      </min-mark>
    </div>
    <div class="test-tag">
      <min-text-tip position="left" :animation="false">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue">默认按钮默认按钮</min-button>
      </min-text-tip>
      <min-text-tip position="top" trigger="click" bgColor="orange">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue">默认按钮默认按钮</min-button>
      </min-text-tip>
      <min-text-tip position="bottom">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue" @click="showToast">默认按钮默认按钮</min-button>
      </min-text-tip>
      <min-text-tip position="right">
        <div slot="content">我是一个提示<br />我是一个提示我是一个提示</div>
        <min-button type="blue" size="1.5" @click="modal = true"
          >默认按钮默认按钮</min-button
        >
      </min-text-tip>
    </div>

    <div class="test-line">
      <min-line position="left">
        start
      </min-line>
      <min-line color="red">
        center
      </min-line>
      <min-line color="red"> </min-line>
      <min-line position="right" color="blue">
        end
      </min-line>
      <min-line direction="vertical" color="blue" position="top"> </min-line>
      <span>这是部分内容</span>
      <min-line direction="vertical" color="red" position="center"> </min-line>
      <span>这是部分内容</span>
      <min-line direction="vertical" color="orange" position="bottom">
      </min-line>
    </div> -->

    <div>
      <min-modal :visible.sync="modal" @open="open" @close="close">
        <!-- <div slot="header">
          这是标题这是标题
        </div> -->
        <div>
          <input placeholder="输入内容" />
          <!-- <min-modal :visible.sync="modal2">
            内嵌弹框
            <div slot="footer">
              <min-button type="yellow" @click="close1">上一页</min-button>
              <min-button type="red">下一页</min-button>
            </div>
          </min-modal> -->
          What follows is just some placeholder text for this modal dialog.
          Sipping on Rosé, Silver Lake sun, coming up all lazy. It’s in the palm
          of your hand now baby. So we hit the boulevard. So make a wish, I'll
          make it like your birthday everyday. Do you ever feel already buried
          deep six feet under? It's time to bring out the big balloons. You
          could've been the greatest. Passport stamps, she's cosmopolitan. Your
          kiss is cosmic, every move is magic. We're living the life. We're
          doing it right. Open up your heart. I was tryna hit it and quit it.
          Her love is like a drug. Always leaves a trail of stardust. The girl's
          a freak, she drive a jeep in Laguna Beach. Fine, fresh, fierce, we got
          it on lock. All my girls vintage Chanel baby. Before
        </div>
        <!-- <div slot="footer">
          <min-button type="yellow" @click="close">上一页</min-button>
          <min-button type="red">下一页</min-button>
        </div> -->
      </min-modal>
    </div>

    <div style="margin-bottom:50px">
      What follows is just some placeholder text for this modal dialog. Sipping
      on Rosé, Silver Lake sun, coming up all lazy. It’s in the palm of your
      hand now baby. So we hit the boulevard. So make a wish, I'll make it like
      your birthday everyday. Do you ever feel already buried deep six feet
      under? It's time to bring out the big balloons. You could've been the
      greatest. Passport stamps, she's cosmopolitan. Your
      <br />
      <min-icon name="right" />
      <min-icon name="code" iconfont size="20" />
      <i class="min-icon-success"></i>
    </div>

    <div>
      <!-- <min-toast>消息提示框</min-toast> -->
    </div>
    <min-gotop @click="gotop"></min-gotop>

    <div class="scroll-img">
      图片展示
      <!-- <min-img
        src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
      >
        <slot slot="fail">图片加载失败!</slot>
      </min-img> -->
    </div>

    <div>
      无限数据滚动
      <!-- <ul
        class="infinite-list"
        v-scroll-load="load"
        scroll-load-disabled="disabled"
        style="overflow:auto"
      >
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </ul> -->
    </div>

    <div>
      全屏加载中...
      <!-- <min-loading></min-loading> -->
    </div>

    <div>
      <min-gapless-scroll :options="options">
        <div class="scroll-box">
          <span class="scroll-test"
            >开始开始ceshisdhfshfslhgsilhf不代发费a结束结束</span
          >
          <div class="scroll-img">
            <min-img
              src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
              width="100"
              height="100"
            >
            </min-img>
          </div>

          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容1</span>
          <span class="scroll-test">此为滚动内容2222222</span>
        </div>
      </min-gapless-scroll>
    </div>
  </div>
</template>

<script>
/* import MinButton from "../packages/Button/src/button";
import MinTag from "../packages/Tag/src/tag";
import MinLink from "../packages/Link/src/link";
import MinMark from "../packages/Mark/src/mark";
import MinTextTip from "../packages/TextTip/src/textTip";
import MinLine from "../packages/Line/src/line"; */
import MinModal from "../packages/Modal/src/modal";
import MinIcon from "../packages/Icon/src/icon";
// import MinToast from "../packages/Toast/src/toast";
import MinGotop from "../packages/Gotop/src/gotop";
import MinImg from "../packages/Img/src/img";
// import MinLoading from "../packages/Loading/src/loading";
import MinGaplessScroll from "../packages/GaplessScroll/src/gapless-scroll";

export default {
  name: "App",
  data() {
    return {
      modal: false,
      modal2: true,
      loading: true,
      imgList: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
      count: 5,
      options: {
        direction: "down",
        // speed: 1,
        hoverStop: true,
      },
    };
  },
  components: {
    /* MinButton,
    MinTag,
    MinLink,
    MinMark,
    MinTextTip,
    MinLine, */
    MinModal,
    MinIcon,
    // MinToast,
    MinGotop,
    MinImg,
    // MinLoading,
    MinGaplessScroll,
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    },
  },
  mounted() {
    // this.load();
  },
  methods: {
    testBtn(e) {
      console.log(e);
    },
    iconClose(e) {
      console.log(e);
    },
    testLink(e) {
      console.log(e);
    },
    open() {},
    beforeClose(func) {
      func();
    },
    close() {
      this.modal = false;
    },
    close1() {
      this.modal2 = false;
    },
    showToast() {
      this.$toast.success("测试内容");
    },
    gotop() {
      this.$toast.success("点击了回到顶部");
    },
    failImg(e) {
      console.log("加载图片错误!", e);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 1000);
    },
  },
};
</script>

<style>
#app {
  font-family: "Apple";
  /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #2c3e50;
  margin-top: 60px;
  letter-spacing: 1px;
  /* line-height: 1.5; */
  font-weight: 500;
}
.test-btn,
.test-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  width: 100%;
  /* height: 100px; */
}
.test-line {
  height: 100px;
  margin: 10px 0;
  width: 100%;
}
.test-modal {
  width: 800px;
  height: 200px;
}

.infinite-list {
  width: 200px;
  height: 200px;
}
.infinite-list-item {
  margin: 5px 0;
  background: red;
}

.loading {
  width: 300px;
  height: 300px;
  text-align: center;
  border: 1px solid orange;
}

.scroll-box {
  /* width: 600px; */
}
.scroll-test {
  line-height: 50px;
  display: block;
  margin: 10px 0;
  border: 1px solid orange;
  /* text-align: left; */
  white-space: nowrap;
  /* width: auto; */
}
.scroll-img {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>
